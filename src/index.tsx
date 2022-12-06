/* @refresh reload */
import { Router } from '@solidjs/router';
import { render } from 'solid-js/web';


import App from './App';
import './index.scss';
import { ConfigProvider } from './providers/ConfigProvider';

render(
    () => (
        <Router>
            <ConfigProvider>
                <App />
            </ConfigProvider>
        </Router>
    ),
    document.getElementById('root') as HTMLElement
);
