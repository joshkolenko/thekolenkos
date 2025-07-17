import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DUN8phxU.mjs';
import { manifest } from './manifest_duFf8v0S.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/code.astro.mjs');
const _page2 = () => import('./pages/api/submit.astro.mjs');
const _page3 = () => import('./pages/code.astro.mjs');
const _page4 = () => import('./pages/rsvp.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/code.ts", _page1],
    ["src/pages/api/submit.ts", _page2],
    ["src/pages/code.astro", _page3],
    ["src/pages/rsvp.astro", _page4],
    ["src/pages/index.astro", _page5]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "2a199ec8-1dc3-4ad6-b114-3e3f3975519b",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
