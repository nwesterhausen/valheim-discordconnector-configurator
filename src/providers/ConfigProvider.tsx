import { createContextProvider } from '@solid-primitives/context';
import { open } from '@tauri-apps/api/dialog';
import { readTextFile } from '@tauri-apps/api/fs';
import { createEffect, createMemo, createResource, createSignal } from 'solid-js';
import uuid from 'uuid-random';
import { ConfigLocation, getConfigPaths, InsideTauri, savePath } from '../settings';

export interface ConfigFileListing {
    configType: string;
    configFilePath: string;
}

export const [ConfigProvider, useConfigProvider] = createContextProvider(() => {
    // Signal for the currently active provider
    const [activeConfig, setActiveConfig] = createSignal<ConfigLocation>();

    // Create an effect to update the recent list
    createEffect(() => {
        const newConfig = activeConfig();
        if (typeof newConfig !== 'undefined') {
            savePath(newConfig);
        }
    })

    const configContent = createMemo(async () => {
        const configLocation = activeConfig();
        if (typeof configLocation === 'undefined') {
            return {};
        }
        try {
            const fileContent = await readTextFile(configLocation.path);
            const configContent = JSON.parse(fileContent);
            return configContent();
        } catch (err) {
            console.error(err);
            return { error: `Failure to parse "${configLocation.path}"` };
        }
    })

    // Resource for known config values
    const [knownConfigs, { refetch }] = createResource<ConfigLocation[]>(
        async () => {
            return await getConfigPaths();
        },
        {
            initialValue: []
        }
    );

    const openConfigDumpFile = async () => {
        if (InsideTauri) {
            // Open Directory Picker through Tauri
            const selected = await open({
                multiple: true,
                filters: [{
                    name: 'Config Dump File',
                    extensions: ['json']
                }]
            });
            if (Array.isArray(selected)) {
                // user selected multiple files
                if (selected.length) {
                    setActiveConfig({
                        name: "New Config",
                        path: selected[0],
                        uuid: uuid(),
                    });
                }
            } else if (selected === null) {
                // user cancelled the selection
                // do nothing..
            } else {
                // user selected a single file
                setActiveConfig({
                    name: "New Config",
                    path: selected,
                    uuid: uuid(),
                });
            }
        } else {
            //Todo: show a modal with instructions:
            //  "" Load your config from the 'config-dump.json' in the Discord Connector config directory.
            //     This should be in the BepInEx/config/games.nwest.valheim.discordconnector directory.    ""
            //
            //  "" Drag and drop the file here, or click to select the file ""

            // This opens up the file picker
            document.getElementById("configPicker")?.click();
        }
    }

    return {
        activeConfig,
        setActiveConfig,
        configContent,
        knownConfigs,
        refreshKnownConfigs: refetch,
        openConfigDumpFile,
    };
});