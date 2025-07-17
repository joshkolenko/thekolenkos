import { c as createComponent, a as createAstro, b as addAttribute, d as renderHead, e as renderSlot, r as renderTemplate } from './astro/server_BMAaEPJG.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                        */

const playballWoff2 = "/_astro/playball-latin-400-normal.74TYrQKU.woff2";

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description"${addAttribute(description, "content")}><title>${title}</title><link rel="preload" as="font" type="font/woff2"${addAttribute(playballWoff2, "href")} crossorigin="anonymous">${renderHead()}</head> <body class="bg-base-200"> <div class="pb-12"> ${renderSlot($$result, $$slots["default"])} </div> </body></html>`;
}, "/Users/joshkolenko/Development/github/thekolenkos/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
