// Thanks to MDN web docs for some of this code
const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
    "/CMPM121_Final_b/src/", 
    "/CMPM121_Final_b/src/App.tsx", 
    "/CMPM121_Final_b/src/App.css",
    "/CMPM121_Final_b/src/Context.ts",
    "/CMPM121_Final_b/src/index.css",
    "/CMPM121_Final_b/src/index.d.ts",
    "/CMPM121_Final_b/src/assets/Plants/Aloe_VeraLevel0.png",
    "/CMPM121_Final_b/src/assets/Plants/Aloe_VeraLevel1.png",
    "/CMPM121_Final_b/src/assets/Plants/Aloe_VeraLevel2.png",
    "/CMPM121_Final_b/src/assets/Plants/Aloe_VeraLevel3.png",
    "/CMPM121_Final_b/src/assets/Plants/blank.png",
    "/CMPM121_Final_b/src/assets/Plants/FlytrapLevel0.png",
    "/CMPM121_Final_b/src/assets/Plants/FlytrapLevel1.png",
    "/CMPM121_Final_b/src/assets/Plants/FlytrapLevel2.png",
    "/CMPM121_Final_b/src/assets/Plants/FlytrapLevel3.png",
    "/CMPM121_Final_b/src/assets/Plants/WheatLevel0.png",
    "/CMPM121_Final_b/src/assets/Plants/WheatLevel1.png",
    "/CMPM121_Final_b/src/assets/Plants/WheatLevel2.png",
    "/CMPM121_Final_b/src/assets/Plants/WheatLevel3.png",
    "/CMPM121_Final_b/src/assets/player/player-walk-anims.json",
    "/CMPM121_Final_b/src/assets/player/player.png",
    "/CMPM121_Final_b/src/component/GameController.tsx",
    "/CMPM121_Final_b/src/component/PlantableUI.tsx",
    "/CMPM121_Final_b/src/component/PlayerBoxUI.tsx",
    "/CMPM121_Final_b/src/component/PlayerController.tsx",
    "/CMPM121_Final_b/src/component/RenderingEngine.tsx",
    "/CMPM121_Final_b/src/component/SaveNLoad.tsx",
    "/CMPM121_Final_b/src/component/SelectPlantUI.tsx",
    "/CMPM121_Final_b/src/component/UndoRedo.tsx",
    "/CMPM121_Final_b/src/controller/GameManager.ts",
    "/CMPM121_Final_b/src/controller/PlantController",
    "/CMPM121_Final_b/src/prefab/Player.ts",
    "/CMPM121_Final_b/src/styles/Engine.css",
    "/CMPM121_Final_b/src/util/json/scenario.json",
    "/CMPM121_Final_b/src/util/Action.ts",
    "/CMPM121_Final_b/src/util/CommandPipeline.ts",
    "/CMPM121_Final_b/src/util/GameConfig.ts",
    "/CMPM121_Final_b/src/util/PlantDSL.ts",
    "/CMPM121_Final_b/src/util/PlantTypes.ts",
    "/CMPM121_Final_b/src/util/Storage.ts",
    "/CMPM121_Final_b/index.html/"];


// Installing Service Worker
self.addEventListener('install', (e) => {
    // console.log('[Service Worker] Install');
    e.waitUntil((async () => {
      const cache = await caches.open(CACHE_NAME);
    //   console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(urlsToCache);
    })());
  });
  
  // Fetching content using Service Worker
  self.addEventListener('fetch', (e) => {
      // Cache http and https only, skip unsupported chrome-extension:// and file://...
      if (!(
         e.request.url.startsWith('http:') || e.request.url.startsWith('https:')
      )) {
          return; 
      }
  
    e.respondWith((async () => {
      const r = await caches.match(e.request);
    //   console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) return r;
      const response = await fetch(e.request);
      const cache = await caches.open(CACHE_NAME);
    //   console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
  });