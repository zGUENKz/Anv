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
        if(typeof input==='string')return originalFetch(nextUrl,init);
        return originalFetch(new Request(nextUrl,input),init);
      }
    }catch(_){ }
    return originalFetch(input,init);
  };
})();
