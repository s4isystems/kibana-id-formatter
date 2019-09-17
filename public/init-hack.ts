// @ts-ignore
import uiRoutes from 'ui/routes';
import { ngApi } from './field-formatters';

async function setupS4iNGPlugin() {
    try {
        await ngApi.init();
    } catch(error) {
        console.log(error);
    }
}

// @ts-ignore
uiRoutes.afterWork(setupS4iNGPlugin);
