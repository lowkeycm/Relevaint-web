// The pinned vendor engine owns progress. This adapter only loads and mounts it.
export type ScrollcraftApi = { layout: () => void; read: () => void };
declare global { interface Window { ScrollCraft?: { mount: (root: HTMLElement, options?: {lerp:number}) => ScrollcraftApi } } }
let loading: Promise<void> | undefined;
const mounted = new WeakMap<HTMLElement, ScrollcraftApi>();
export async function mountScrollcraft(root: HTMLElement) {
  if (!window.ScrollCraft) {
    loading ??= new Promise<void>((resolve,reject) => {
      const script=document.createElement('script');
      script.src='/vendor/scrollcraft/scrollcraft.js';script.async=true;
      script.onload=()=>resolve();script.onerror=()=>{loading=undefined;script.remove();reject(new Error('Scrollcraft did not load'));};
      document.head.appendChild(script);
    });
    await loading;
  }
  const existing=mounted.get(root);if(existing)return existing;
  if(!window.ScrollCraft)throw new Error('Scrollcraft is unavailable');
  const api=window.ScrollCraft.mount(root,{lerp:1});mounted.set(root,api);return api;
}
