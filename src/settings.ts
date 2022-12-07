import { exists } from '@tauri-apps/api/fs';
import { Store } from 'tauri-plugin-store-api';
import { webCompatStore } from './browser-store';

const SettingsFile = "configuration.dat";
const ConfigPaths = "Config.Paths";

export const InsideTauri = typeof window.__TAURI_METADATA__ !== 'undefined';

const store = UseBestStore();

export interface ConfigLocation {
    name: string;
    path: string;
    uuid: string;
}


function UseBestStore() {
    if (InsideTauri) {
        console.debug("Initializing tauri store");
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
    console.debug("Loading config paths from saved data")
       // Get the stored config path values
       const storedPaths = await store.get<ConfigLocation[]>(ConfigPaths);
       // Guard against null
       if (typeof storedPaths === 'undefined' || storedPaths == null) {
        console.debug(`Unable to find configPaths key (${ConfigPaths}) in ${SettingsFile}. Creating empty value.`);
           await store.set(ConfigPaths, []);
           return [];
       }
       // Guard against unexpected type of value
       if (!Array.isArray(storedPaths)) {
        console.debug(`Configuration paths store is corrupted. (Key ${ConfigPaths} in ${SettingsFile}). Resetting it.`);
           await store.set(ConfigPaths, []);
           return [];
       }
       // Reduce found values to those which have values
       const validPaths = storedPaths.filter(v => v.name && v.path);

       console.debug(`${ConfigPaths} has ${validPaths.length} entries.`);

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
        console.debug(`Unable to find stored path by name "${name}" under key (${ConfigPaths}) in ${SettingsFile}.`);
        return foundPath;
    }
    // Check if we had too many matches and log a warning.
    if (matched.length > 1) {
        console.debug(`Found multiple matches for ${name}, returning the first match.`);
    }
    // Validate the value is a string
    const matchedPath = matched[0].path;
    if (!(typeof matchedPath == 'string')) {
        console.debug(`Expected string, found ${typeof matchedPath} '${matchedPath}'. Returning empty string.`);
        return foundPath;
    }

    // Validate the path exists
    if (!await exists(matchedPath)) {
        console.debug(`Stored path for ${name} doesn't exist. (${matchedPath})`);
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
        console.debug(`Not saving config path, name must be string (was ${typeof configPath.name})`);
        return;
    }
    if (typeof configPath.path !== 'string') {
        console.debug(`Not saving config path, path must be string (was ${typeof configPath.name})`);
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