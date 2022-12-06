import { AiOutlineInfoCircle, AiTwotoneEdit, AiTwotoneEye, AiTwotoneFolderAdd, AiTwotoneFolderOpen, AiTwotoneSetting } from 'solid-icons/ai';
import { Component, For } from "solid-js";
import { useConfigProvider } from '../providers/ConfigProvider';

const AppMenu: Component = () => {
    const configContext = useConfigProvider();

    return (
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item">
                        <AiTwotoneFolderAdd />&nbsp;
                        Open
                    </a>
                    <div class="navbar-item has-dropdown is-hoverable"
                        classList={{
                            'is-hidden': configContext?.knownConfigs.latest.length === 0,
                        }}>
                        <a class="navbar-link">
                            <AiTwotoneFolderOpen />&nbsp;
                            Open Recent
                        </a>

                        <div class="navbar-dropdown">
                            <hr class="dropdown-divider" />
                            <For each={configContext?.knownConfigs.latest} fallback={<div class="menu-item"><em>No recent configs</em></div>}>{(configPath) =>
                                <div class="menu-item"
                                    onClick={() => {
                                        configContext?.setActiveConfig(configPath)
                                    }
                                    }>{configPath.name}</div>
                            }</For>
                        </div>
                    </div>
                    <a class="navbar-item"
                        href="/editor"
                        classList={{
                            'is-hidden': typeof configContext?.activeConfig() === 'undefined'
                        }}>
                        <AiTwotoneEdit />&nbsp;
                        Edit Config
                    </a>
                    <a class="navbar-item"
                        href="/preview"
                        classList={{
                            'is-hidden': typeof configContext?.activeConfig() === 'undefined'
                        }}>
                        <AiTwotoneEye />&nbsp;
                        Preview Messages
                    </a>

                </div>

                <div class="navbar-end">
                    <a class="navbar-item"
                        href="/about">
                        <AiOutlineInfoCircle color="#889" />
                    </a>
                    <a class="navbar-item"
                        href="/settings">
                        <AiTwotoneSetting />&nbsp;
                        Configurator Settings
                    </a>
                </div>
            </div>
        </nav >
    )
}

export default AppMenu;