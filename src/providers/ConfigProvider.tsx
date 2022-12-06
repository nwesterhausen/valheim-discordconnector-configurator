import { createContextProvider } from '@solid-primitives/context';
import { createMemo, createSignal } from 'solid-js';
import { ConfigTypes, FileNameForType } from '../ConfigFileHelper';
import { ConfigLocation } from '../settings';

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

    return {
        activeConfig,
        setActiveConfig,
        configFiles,
    };
});