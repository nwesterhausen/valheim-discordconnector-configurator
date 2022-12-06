import { exists } from '@tauri-apps/api/fs';
import * as log from 'tauri-plugin-log-api';
import { Store } from 'tauri-plugin-store-api';
import { webCompatStore } from './browser-store';

const SettingsFile = "configuration.dat";
const ConfigPaths = "Config.Paths";

const store = UseBestStore();
log.attachConsole();

export interface ConfigLocation {
    name: string;
    path: string;
}

function UseBestStore() {
    if (window.__TAURI_METADATA__) {
        return new Store(SettingsFile);
    }
    // If there is no TAURI_METADATA then we are running in the browser
    return webCompatStore;
}

/**
 * Get all the saved config paths in the store. If the store is discovered to be non-existent or corrupt, it is recreated.
 * @returns List of saved ConfigLocation
 */
export async function getConfigPaths(): Promise<ConfigLocation[]> {
       // Get the stored config path values
       const storedPaths = await store.get<ConfigLocation[]>(ConfigPaths);
       // Guard against null
       if (typeof storedPaths === 'undefined' || storedPaths == null) {
           await log.info(`Unable to find configPaths key (${ConfigPaths}) in ${SettingsFile}. Creating empty value.`);
           await store.set(ConfigPaths, []);
           return [];
       }
       // Guard against unexpected type of value
       if (!Array.isArray(storedPaths)) {
           await log.error(`Configuration paths store is corrupted. (Key ${ConfigPaths} in ${SettingsFile}). Resetting it.`);
           await store.set(ConfigPaths, []);
           return [];
       }
       // Reduce found values to those which have values
       const validPaths = storedPaths.filter(v => v.name && v.path);

       await log.info(`${ConfigPaths} has ${validPaths.length} entries.`);

       return validPaths;
}

/**
 * Get the stored config path by name. This validates the target directory exists.
 * @param name - The defined name of the path to fetch
 * @returns string path to the discord connector config files.
 */
export async function getPath(name: string): Promise<string> {
    const foundPath = "";
    const configPaths = await getConfigPaths();
    const matched = configPaths.filter(v => v.name === name);
 
    if (matched.length === 0) {
        await log.warn(`Unable to find stored path by name "${name}" under key (${ConfigPaths}) in ${SettingsFile}.`);
        return foundPath;
    }
    // Check if we had too many matches and log a warning.
    if (matched.length > 1) {
        await log.warn(`Found multiple matches for ${name}, returning the first match.`);
    }
    // Validate the value is a string
    const matchedPath = matched[0].path;
    if (!(typeof matchedPath == 'string')) {
        await log.error(`Expected string, found ${typeof matchedPath} '${matchedPath}'. Returning empty string.`);
        return foundPath;
    }

    // Validate the path exists
    if (!await exists(matchedPath)) {
        await log.error(`Stored path for ${name} doesn't exist. (${matchedPath})`);
        return foundPath;
    }

    return matchedPath;
}

/**
 * Commit a ConfigLocation to the store. If an invalid configPath is passed into this function, it does nothing and logs an error.
 * @param configPath - The config location to save into the store
 */
export async function savePath(configPath: ConfigLocation): Promise<void> {
    // Validate we have values for both parts
    if (typeof configPath.name !== 'string') {
        log.warn(`Not saving config path, name must be string (was ${typeof configPath.name})`);
        return;
    }
    if (typeof configPath.path !== 'string') {
        log.warn(`Not saving config path, path must be string (was ${typeof configPath.name})`);
        return;
    }

    // Get the list of configPaths
    const pathsList = await getConfigPaths();

    // Put the new config path into the list
    pathsList.push(configPath);

    // Update the value in the store & save
    store.set(ConfigPaths, pathsList);
    store.save();
}