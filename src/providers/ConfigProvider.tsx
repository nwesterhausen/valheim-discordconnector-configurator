import { createContextProvider } from '@solid-primitives/context';
import { createMemo, createResource, createSignal } from 'solid-js';
import { ConfigTypes, FileNameForType } from '../ConfigFileHelper';
import { ConfigLocation, getConfigPaths } from '../settings';

export interface ConfigFileListing {
    configType: string;
    configFilePath: string;
}

export const [ConfigProvider, useConfigProvider] = createContextProvider(() => {
    // Signal for the currently active provider
    const [activeConfig, setActiveConfig] = createSignal<ConfigLocation>();

    // Memo of the current config file paths
    const configFiles = createMemo(() => {
        const files: ConfigFileListing[] = [];

        for (const t of ConfigTypes) {
            if (typeof activeConfig() === 'undefined') {
                files.push({ configType: t, configFilePath: "" });
            } else {
                files.push({ configType: t, configFilePath: `${activeConfig()?.path}${FileNameForType(t)}` });
            }
        }

        return files;
    });

    // Resource for known config values
    const [knownConfigs, { refetch }] = createResource<ConfigLocation[]>(
        async () => {
            return await getConfigPaths();
        },
        {
            initialValue: []
        }
    );

    return {
        activeConfig,
        setActiveConfig,
        configFiles,
        knownConfigs,
        refreshKnownConfigs: refetch,
    };
});