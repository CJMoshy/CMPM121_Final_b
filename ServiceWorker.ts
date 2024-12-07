// Thanks to MDN web docs for some of this code
const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
    "/src/", 
    "/src/App.tsx", 
    "/src/App.css",
    "/src/Context.ts",
    "/src/index.css",
    "/src/index.d.ts",
    // "/assets/Plants/Aloe_VeraLevel0.png",
    // "/assets/Plants/Aloe_VeraLevel1.png",
    // "/assets/Plants/Aloe_VeraLevel2.png",
    // "/assets/Plants/Aloe_VeraLevel3.png",
    // "/assets/Plants/blank.png",
    // "/assets/Plants/FlytrapLevel0.png",
    // "/assets/Plants/FlytrapLevel1.png",
    // "/assets/Plants/FlytrapLevel2.png",
    // "/assets/Plants/FlytrapLevel3.png",
    // "/assets/Plants/WheatLevel0.png",
    // "/assets/Plants/WheatLevel1.png",
    // "/assets/Plants/WheatLevel2.png",
    // "/assets/Plants/WheatLevel3.png",
    // "/assets/player/player-walk-anims.json",
    // "/assets/player/player.png",
    "/src/assets/Plants/Aloe_VeraLevel0.png",
    "/src/assets/Plants/Aloe_VeraLevel1.png",
    "/src/assets/Plants/Aloe_VeraLevel2.png",
    "/src/assets/Plants/Aloe_VeraLevel3.png",
    "/src/assets/Plants/blank.png",
    "/src/assets/Plants/FlytrapLevel0.png",
    "/src/assets/Plants/FlytrapLevel1.png",
    "/src/assets/Plants/FlytrapLevel2.png",
    "/src/assets/Plants/FlytrapLevel3.png",
    "/src/assets/Plants/WheatLevel0.png",
    "/src/assets/Plants/WheatLevel1.png",
    "/src/assets/Plants/WheatLevel2.png",
    "/src/assets/Plants/WheatLevel3.png",
    "/src/assets/player/player-walk-anims.json",
    "/src/assets/player/player.png",
    "/src/component/GameController.tsx",
    "/src/component/PlantableUI.tsx",
    "/src/component/PlayerBoxUI.tsx",
    "/src/component/PlayerController.tsx",
    "/src/component/RenderingEngine.tsx",
    "/src/component/SaveNLoad.tsx",
    "/src/component/SelectPlantUI.tsx",
    "/src/component/UndoRedo.tsx",
    "/src/controller/GameManager.ts",
    "/src/controller/PlantController",
    "/src/prefab/Player.ts",
    "/src/styles/Engine.css",
    "/src/util/json/scenario.json",
    "/src/util/Action.ts",
    "/src/util/CommandPipeline.ts",
    "/src/util/GameConfig.ts",
    "/src/util/PlantDSL.ts",
    "/src/util/PlantTypes.ts",
    "/src/util/Storage.ts",
    "/index.html/"];


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