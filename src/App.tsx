import { Route, Routes } from '@solidjs/router';
import { Component, createSignal } from 'solid-js';
import AppMenu from './components/AppMenu';
import About from './pages/About';
import Editor from './pages/Editor';
import Preview from './pages/Preview';
import Settings from './pages/Settings';
import { ConfigLocation } from './settings';

const App: Component = () => {
  const [activeConfig, setActiveConfig] = createSignal<ConfigLocation>();
  return (
    <>
      <AppMenu />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/editor' element={<Editor />} />
        <Route path='/preview' element={<Preview />} />
      </Routes>
    </>
  );
};

export default App;
