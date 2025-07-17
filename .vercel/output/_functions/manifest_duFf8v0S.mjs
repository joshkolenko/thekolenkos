import 'kleur/colors';
import { g as decodeKey } from './chunks/astro/server_BMAaEPJG.mjs';
import 'clsx';
import 'cookie';
import './chunks/astro-designed-error-pages_BfVVGDyn.mjs';
import 'es-module-lexer';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_C6JDjZb-.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/joshkolenko/Development/github/thekolenkos/","cacheDir":"file:///Users/joshkolenko/Development/github/thekolenkos/node_modules/.astro/","outDir":"file:///Users/joshkolenko/Development/github/thekolenkos/dist/","srcDir":"file:///Users/joshkolenko/Development/github/thekolenkos/src/","publicDir":"file:///Users/joshkolenko/Development/github/thekolenkos/public/","buildClientDir":"file:///Users/joshkolenko/Development/github/thekolenkos/dist/client/","buildServerDir":"file:///Users/joshkolenko/Development/github/thekolenkos/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/code","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/code\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"code","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/code.ts","pathname":"/api/code","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/submit","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/submit\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"submit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/submit.ts","pathname":"/api/submit","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/code.9tdNExMF.css"}],"routeData":{"route":"/code","isIndex":false,"type":"page","pattern":"^\\/code\\/?$","segments":[[{"content":"code","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/code.astro","pathname":"/code","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/code.9tdNExMF.css"}],"routeData":{"route":"/rsvp","isIndex":false,"type":"page","pattern":"^\\/rsvp\\/?$","segments":[[{"content":"rsvp","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rsvp.astro","pathname":"/rsvp","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/code.9tdNExMF.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/joshkolenko/Development/github/thekolenkos/src/pages/code.astro",{"propagation":"none","containsHead":true}],["/Users/joshkolenko/Development/github/thekolenkos/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/joshkolenko/Development/github/thekolenkos/src/pages/rsvp.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:src/pages/api/code@_@ts":"pages/api/code.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/code@_@astro":"pages/code.astro.mjs","\u0000@astro-page:src/pages/rsvp@_@astro":"pages/rsvp.astro.mjs","\u0000@astro-page:src/pages/api/submit@_@ts":"pages/api/submit.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","/Users/joshkolenko/Development/github/thekolenkos/node_modules/@astrojs/react/dist/vnode-children.js":"chunks/vnode-children_Gljd-95D.mjs","/Users/joshkolenko/Development/github/thekolenkos/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BS8kAt7I.mjs","\u0000@astrojs-manifest":"manifest_duFf8v0S.mjs","/Users/joshkolenko/Development/github/thekolenkos/src/components/CodeForm":"_astro/CodeForm.CARPtHtv.js","/Users/joshkolenko/Development/github/thekolenkos/src/components/RsvpForm":"_astro/RsvpForm.CGKfkq_j.js","/Users/joshkolenko/Development/github/thekolenkos/src/components/Countdown":"_astro/Countdown.TFkYB3ST.js","@astrojs/react/client.js":"_astro/client.Ck978YHi.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/champagne.DYehmrRH.svg","/_astro/engagement-4.CeG_QS1J.jpg","/_astro/engagement-1.CP67j5dh.jpg","/_astro/engagement-2.DtisHnWx.jpg","/_astro/engagement-3.CxtnEZmV.jpg","/_astro/playball-latin-400-normal.74TYrQKU.woff2","/_astro/playfair-cyrillic-ext-wght-normal.CPuQUyWY.woff2","/_astro/playfair-latin-ext-wght-normal.CFs30ay9.woff2","/_astro/playfair-latin-wght-normal.DJKiW-92.woff2","/_astro/Phosphor-Light.CGwbSLuF.woff2","/_astro/playfair-vietnamese-wght-normal.CghXedQa.woff2","/_astro/playball-latin-ext-400-normal.hNUWBpln.woff2","/_astro/playfair-cyrillic-wght-normal.vsZ8cdOQ.woff2","/_astro/playball-latin-400-normal.BxxbU3N1.woff","/_astro/playball-vietnamese-400-normal.BMj8ZxVs.woff2","/_astro/Phosphor-Bold.BCak21uZ.woff2","/_astro/Phosphor-Fill.D4CDmGRg.woff2","/_astro/background.D4rjGVJD.jpg","/_astro/playball-vietnamese-400-normal.clIJAs2_.woff","/_astro/playball-latin-ext-400-normal.J9zQcFKG.woff","/_astro/Phosphor-Bold.Bs3tcKfK.woff","/_astro/Phosphor-Light.Ch5YcZ-M.woff","/_astro/Phosphor-Fill.CS2zOYDV.woff","/_astro/Phosphor-Fill.N9gYSHy0.ttf","/_astro/Phosphor-Light.Cmen2P86.ttf","/_astro/Phosphor-Bold.y1cGIEs3.ttf","/_astro/Phosphor-Fill.BofDnXwa.svg","/_astro/Phosphor-Bold.CIyscVBM.svg","/_astro/Phosphor-Light.BTiR1Cbr.svg","/_astro/code.9tdNExMF.css","/favicon.svg","/_astro/CodeForm.CARPtHtv.js","/_astro/Countdown.TFkYB3ST.js","/_astro/FormError.BmCnQf1g.js","/_astro/RsvpForm.CGKfkq_j.js","/_astro/client.Ck978YHi.js","/_astro/index.9MVAkNgL.js","/_astro/jsx-runtime.D_zvdyIk.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"S/iAbDMYWTrxb9qOExygRlfx0CaxfVsySaQi1V9FfkE="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
