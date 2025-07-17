import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, r as renderTemplate } from './astro/server_BMAaEPJG.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$Dock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dock;
  const { active } = Astro2.props;
  const pages = [
    { name: "Home", href: "/", icon: "ph-house" },
    { name: "RSVP", href: "/rsvp", icon: "ph-envelope" }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="dock md:dock-xl bg-neutral text-neutral-content"> ${pages.map((page) => {
    return renderTemplate`<a href="/rsvp"${addAttribute(`dock-item ${active === page.name ? "dock-item-active" : ""}`, "class")}> <i${addAttribute(`ph-fill ${page.icon}`, "class")}></i> <span class="dock-label">${page.name}</span> </a>`;
  })} </div>`;
}, "/Users/joshkolenko/Development/github/thekolenkos/src/components/Dock.astro", void 0);

export { $$Dock as $ };
