/* Anv enhancements — additive UI only */
(function(){
  const MESSAGES = [
    'ขอบคุณที่ทำให้ทุกวันมีความหมายขึ้นนะ ♡',
    'เรื่องราวของเรายังมีอีกหลายหน้าให้เขียนต่อ',
    'วันนี้ก็เป็นอีกหนึ่งวันที่ได้เดินทางไปด้วยกัน',
    'เก็บช่วงเวลาธรรมดา ๆ ไว้ เพราะวันหนึ่งมันจะกลายเป็นความทรงจำ',
    'ค่อย ๆ เดินไปด้วยกันทีละวันนะ ♡',
    'เดือนใหม่กำลังจะกลายเป็นความทรงจำบทใหม่ของเรา'
  ];

  function esc(v){
    return String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }
  function dayDiff(a,b){
    const aa = new Date(a.getFullYear(),a.getMonth(),a.getDate());
    const bb = new Date(b.getFullYear(),b.getMonth(),b.getDate());
    return Math.max(0,Math.round((bb-aa)/86400000));
  }
  function journeyDates(){
    const start = new Date(CONFIG.startDate+'T00:00:00');
    const today = new Date();
    const current = new Date(today.getFullYear(),today.getMonth(),start.getDate());
    if(today < current) current.setMonth(current.getMonth()-1);
    const next = new Date(current.getFullYear(),current.getMonth()+1,start.getDate());
    const elapsed = dayDiff(current,today);
    const total = Math.max(1,dayDiff(current,next));
    return {start,today,current,next,elapsed,total};
  }
  function injectStyle(){
    if(document.getElementById('anvEnhancementStyle')) return;
    const s=document.createElement('style');
    s.id='anvEnhancementStyle';
    s.textContent=`
      .anvExtra{margin:12px auto 0;max-width:450px;text-align:left;background:var(--soft);border-radius:20px;padding:15px 16px;border:1px solid var(--line)}
      .anvExtraHead{display:flex;justify-content:space-between;gap:10px;align-items:center;font-size:12px;color:var(--muted)}
      .anvExtraTitle{font-weight:700;color:var(--pink2);font-size:14px}
      .anvProgress{height:8px;border-radius:999px;background:rgba(200,92,120,.12);overflow:hidden;margin:10px 0 7px}
      .anvProgress>i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--pink),#e79aae);border-radius:inherit;transition:width .7s ease}
      .anvExtraFoot{font-size:11px;color:var(--muted);line-height:1.6}
      .anvDaily{margin:12px auto 0;max-width:450px;padding:14px 16px;border-radius:20px;background:linear-gradient(135deg,var(--soft),transparent);border:1px solid var(--line);text-align:center}
      .anvDaily b{display:block;color:var(--pink2);font-size:12px;margin-bottom:5px}
      .anvDaily span{font-size:13px;line-height:1.7}
      .anvShare{margin-top:9px;width:100%}
    `;
    document.head.appendChild(s);
  }
  function ensureCards(){
    const counter=document.querySelector('.counter');
    if(!counter) return;
    if(!document.getElementById('anvJourney')){
      const journey=document.createElement('div');
      journey.id='anvJourney';
      journey.className='anvExtra';
      journey.innerHTML='<div class="anvExtraHead"><span class="anvExtraTitle">♡ เส้นทางของเรา</span><span id="anvJourneyPct">0%</span></div><div class="anvProgress"><i id="anvJourneyBar"></i></div><div class="anvExtraFoot" id="anvJourneyText">กำลังคำนวณ...</div>';
      counter.insertAdjacentElement('afterend',journey);
    }
    if(!document.getElementById('anvDaily')){
      const daily=document.createElement('div');
      daily.id='anvDaily';
      daily.className='anvDaily';
      const day=Math.floor(Date.now()/86400000);
      daily.innerHTML='<b>ข้อความเล็ก ๆ สำหรับวันนี้</b><span>'+esc(MESSAGES[day%MESSAGES.length])+'</span><button class="secondary anvShare" type="button" id="anvShareBtn">↗ แชร์หน้าเว็บ</button>';
      counter.insertAdjacentElement('afterend',daily);
      const share=daily.querySelector('#anvShareBtn');
      share.addEventListener('click',async()=>{
        const data={title:document.title,text:'Our Anniversary ♡',url:location.href};
        try{
          if(navigator.share) await navigator.share(data);
          else { await navigator.clipboard.writeText(location.href); toast('คัดลอกลิงก์เว็บไซต์แล้ว ♡'); }
        }catch(e){ if(e?.name!=='AbortError') toast('ไม่สามารถแชร์ได้'); }
      });
    }
  }
  function updateJourney(){
    const bar=document.getElementById('anvJourneyBar');
    const pct=document.getElementById('anvJourneyPct');
    const text=document.getElementById('anvJourneyText');
    if(!bar||!pct||!text) return;
    const d=journeyDates();
    const progress=Math.min(100,Math.round((d.elapsed/d.total)*100));
    const months=Math.max(0,(d.current.getFullYear()-d.start.getFullYear())*12 + d.current.getMonth()-d.start.getMonth());
    const days=dayDiff(d.current,d.today);
    bar.style.width=progress+'%';
    pct.textContent=progress+'%';
    text.textContent=`ผ่านมาถึงเดือนที่ ${months+1} แล้ว · ${days} วันในรอบนี้ · ครบรอบถัดไป ${formatThaiDate(d.next)}`;
  }
  function addSwipe(){
    const lb=document.getElementById('lightbox');
    if(!lb||lb.dataset.anvSwipe) return;
    lb.dataset.anvSwipe='1';
    let x=0;
    lb.addEventListener('touchstart',e=>{x=e.changedTouches[0].clientX},{passive:true});
    lb.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-x;if(Math.abs(dx)<55)return;if(dx<0)nextPhoto();else prevPhoto();},{passive:true});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLightbox();closeModal();}if(!lb.classList.contains('show'))return;if(e.key==='ArrowLeft')prevPhoto();if(e.key==='ArrowRight')nextPhoto();});
  }
  function initEnhancements(){injectStyle();ensureCards();updateJourney();addSwipe();}
  setTimeout(initEnhancements,800);
  setInterval(()=>{if(document.getElementById('anvJourney'))updateJourney();},60000);
})();
