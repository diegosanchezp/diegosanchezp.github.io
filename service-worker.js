!function(){"use strict";const e=["client/certifications.d3279881.js","client/Label.24e563fd.js","client/client.49b0e820.js","client/academics.eed1eaca.js","client/index.e51e12e0.js","client/Button.dc9eea05.js","client/index.73dfab12.js","client/client.4402c8c7.js"].concat(["service-worker-index.html","Images/DSMScertificate.png","Images/FDMcertificate.png","Images/FELcertificate.png","Images/ProfilePic.jpg","Images/RWDcertificate.png","Images/TechStack.png","Images/UCVLogo.png","Images/copin-webpage-screenshot.png","Images/drum-machine-screenshot.png","Images/javascript-calculator-screenshot.png","Images/pomodo-timer-screenshot.png","Images/random-quote-machine-screenshot.png","Images/simple-react-markdown-screenshot.png","favicon.png","global.css","logo-192.png","logo-512.png","manifest.json","successkid.jpg"]),t=new Set(e);self.addEventListener("install",t=>{t.waitUntil(caches.open("cache1589910265441").then(t=>t.addAll(e)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const t of e)"cache1589910265441"!==t&&await caches.delete(t);self.clients.claim()}))}),self.addEventListener("fetch",e=>{if("GET"!==e.request.method||e.request.headers.has("range"))return;const s=new URL(e.request.url);s.protocol.startsWith("http")&&(s.hostname===self.location.hostname&&s.port!==self.location.port||(s.host===self.location.host&&t.has(s.pathname)?e.respondWith(caches.match(e.request)):"only-if-cached"!==e.request.cache&&e.respondWith(caches.open("offline1589910265441").then(async t=>{try{const s=await fetch(e.request);return t.put(e.request,s.clone()),s}catch(s){const c=await t.match(e.request);if(c)return c;throw s}}))))})}();
