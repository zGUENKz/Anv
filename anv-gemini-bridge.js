/* Anv Gemini bridge — routes Daily Together AI requests to the Gemini Edge Function */
(function(){
  const GEMINI_ENDPOINT=(typeof CONFIG!=='undefined'&&CONFIG.supabaseUrl)?`${CONFIG.supabaseUrl}/functions/v1/anv-daily-ai-gemini`:'';
  if(!GEMINI_ENDPOINT||window.__anvGeminiBridge)return;
  window.__anvGeminiBridge=true;
  const originalFetch=window.fetch.bind(window);
  window.fetch=function(input,init){
    try{
      const url=typeof input==='string'?input:(input&&input.url)||'';
      if(url.includes('/functions/v1/anv-daily-ai')&&!url.includes('/functions/v1/anv-daily-ai-gemini')){
        const nextUrl=GEMINI_ENDPOINT;
        const sourceInit=init||{};
        const headers=new Headers(sourceInit.headers|| (typeof input!=='string'&&input&&input.headers) || {});
        headers.delete('Authorization');
        const key=typeof CONFIG!=='undefined'?CONFIG.supabaseKey:'';
        if(key)headers.set('apikey',key);
        headers.set('Content-Type','application/json');
        const nextInit={...sourceInit,headers};
        return originalFetch(nextUrl,nextInit);
      }
    }catch(_){ }
    return originalFetch(input,init);
  };
})();
