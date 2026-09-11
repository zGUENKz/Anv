/* Anv final polish — accessibility, modal UX, mobile-friendly keyboard behavior */
(function(){
  function injectStyle(){
    if(document.getElementById('anvPolishStyle'))return;
    const s=document.createElement('style');s.id='anvPolishStyle';s.textContent=`
      body.anvModalLocked{overflow:hidden}
      @media(max-width:460px){
        .modalCard,.anvFeatureCard,.anvDailyCard,.anvBirthdayCard{max-height:88vh}
        .modal,.anvFeatureModal,.anvDailyModal,.anvBirthdayModal{padding:12px}
      }
      @media(prefers-reduced-motion:reduce){
        *,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
      }
    `;document.head.appendChild(s);
  }

  function isVisible(el){return !!el&&el.classList.contains('show')&&getComputedStyle(el).display!=='none'}
  function syncScrollLock(){
    const locked=[
      document.querySelector('.modal.show'),
      document.querySelector('.lightbox.show'),
      document.querySelector('.anvFeatureModal.show'),
      document.querySelector('.anvDailyModal.show'),
      document.querySelector('.anvBirthdayModal.show'),
      document.querySelector('.celebrate.show')
    ].some(isVisible);
    document.body.classList.toggle('anvModalLocked',locked);
  }

  function enhanceButtons(){
    document.querySelectorAll('.closeBtn,.lbClose,.lbPrev,.lbNext,.lbDelete,.anvClose,.anvDailyClose,#anvBirthdayClose').forEach(btn=>{
      if(btn.hasAttribute('aria-label'))return;
      const text=(btn.textContent||'').trim();
      btn.setAttribute('aria-label',text==='×'?'ปิด':text||'ปุ่มควบคุม');
    });
  }

  function init(){
    injectStyle();
    enhanceButtons();
    const observer=new MutationObserver(()=>{enhanceButtons();syncScrollLock()});
    observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});
    document.addEventListener('keydown',e=>{
      if(e.key!=='Escape')return;
      const selectors=['.anvBirthdayModal.show','.anvDailyModal.show','.anvFeatureModal.show','.lightbox.show','.modal.show','.celebrate.show'];
      for(const selector of selectors){
        const el=document.querySelector(selector);
        if(el){el.classList.remove('show');syncScrollLock();return}
      }
    });
    syncScrollLock();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
