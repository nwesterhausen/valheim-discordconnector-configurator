
export const ConfigTypes = [
    "leaderBoards",
    "main",
    "messages",
    "toggles",
    "variables",
];

export const PluginShortName = 'discordconnector';

export function FileNameForType(configType: string): string {
    if (ConfigTypes.indexOf(configType) === -1) {
        //! invalid type
        return "";
    }

    if (configType === "main") {
        return `${PluginShortName}.cfg`;
    }

    return `${PluginShortName}-${configType}.cfg`
}

export function TitleForType(configType: string): string {
    if (ConfigTypes.indexOf(configType) === -1) {
        //! invalid type
        return "";
    }

    // Insert space before uppercase letters
    const title = configType.replace(/([A-Z])/g, ' $1').trim();
    // Capitalize first letter
    const finalTitle = title[0].toUpperCase() + title.slice(1);

    return finalTitle;
}