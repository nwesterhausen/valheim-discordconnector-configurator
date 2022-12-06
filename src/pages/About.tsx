import { Component } from "solid-js";

const About: Component = () => {
    return <>
        <section class='hero'>
            <div class='hero-body'>
                <h1 class='title'>Content To-Do</h1>
            </div>
        </section>
        <section class='section'>
            <h3 class='heading'>App Load:</h3>
            <ul class='list'>
                <li class='list-item'>If no recent config paths available, show a helpful message</li>
                <li class='list-item'>If there are recent config paths, use the most recent one</li>
            </ul>
        </section>
        <section class='section'>
            <h3 class='heading'>Nav Menu</h3>
            <ul class='list'>
                <li class='list-item'>"Edit Pane" editing the config files</li>
                <li class='list-item'>"Preview Pane" seeing a sample output</li>
                <li class='list-item'>"Open (dropdown)" choosing a recent config path OR adding a new one</li>
            </ul>
        </section></>
}

export default About;