import uiRoutes from 'ui/routes';
import { ngApi } from "./field-formatters";

async function setupS4iNGPlugin() {
    await ngApi.init();
}

// @ts-ignore
uiRoutes.afterWork(setupS4iNGPlugin);
