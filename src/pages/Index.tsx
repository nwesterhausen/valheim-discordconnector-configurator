import { Component } from "solid-js";
import BooleanField from "../components/BooleanField";
import SelectField from "../components/SelectField";

const Index: Component = () => {
    return <>
        <section class='hero'>
            <div class='hero-body'>
                <h1 class='title'>Configurator</h1>
                <p>A helpful config editor for the Valheim Discord Connector plugin.</p>
            </div>
        </section>
        <section class='section'>
            <h3 class='heading'>How to Use</h3>
            <ul class='list'>
                <li class='list-item'>
                    <p>
                        Drag and drop (or use the "Open" button in the menu bar and select) the <span class="mono-emphasis">config-dump.json</span> from the "games.nwest.valheim.discordconnector" directory in
                        the "BepInEx/config" directory in your server install location (or Thunderstore profile).
                    </p>
                </li>
                <li class='list-item'>Use the "Editor" pane to edit the file</li>
                <li class='list-item'>Use the "Preview" pane to see a sample of output to Discord</li>
                <li class="list-item">Use the "Export" button to export a set of config files which use your changes</li>
            </ul>
        </section>
        <section class="section">
            <h3 class="heading">Sample Controls</h3>
            <BooleanField label="sample switch (default false)" />
            <BooleanField checked label="sample switch (default true)" />
            <SelectField options={[["Test option 1", "opt1"], ["🫡 Another option", "opt2"]]} label="Choose one of these options" />
        </section>
    </>
}

export default Index;