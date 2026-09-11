/* Anv enhancements — stable UI layer and date/unlock fixes */
(function(){
  const MESSAGES=[
    'ขอบคุณที่ทำให้ทุกวันมีความหมายขึ้นนะ ♡',
    'เรื่องราวของเรายังมีอีกหลายหน้าให้เขียนต่อ',
    'วันนี้ก็เป็นอีกหนึ่งวันที่ได้เดินทางไปด้วยกัน',
    'เก็บช่วงเวลาธรรมดา ๆ ไว้ เพราะวันหนึ่งมันจะกลายเป็นความทรงจำ',
    'ค่อย ๆ เดินไปด้วยกันทีละวันนะ ♡',
    'เดือนใหม่กำลังจะกลายเป็นความทรงจำบทใหม่ของเรา'
  ];
  const MONTH_QUESTIONS=[
    'เดือนนี้ช่วงเวลาไหนที่ทำให้เรามีความสุขที่สุด?','เดือนนี้มีอะไรเล็ก ๆ ที่อีกคนทำแล้วเรารู้สึกดี?',
    'เดือนนี้อยากให้เราไปทำอะไรด้วยกัน?','ถ้าย้อนกลับไปต้นเดือน อยากบอกอะไรกับเรา?',
    'เดือนนี้เราได้เรียนรู้อะไรเกี่ยวกับกันและกัน?','ความทรงจำไหนของเดือนนี้ที่อยากเก็บไว้นาน ๆ?',
    'เดือนนี้มีอะไรที่อยากขอบคุณอีกคน?','ช่วงเวลาไหนของเดือนนี้ที่อยากย้อนกลับไปอีกครั้ง?',
    'เดือนนี้อยากให้เดือนหน้าของเราเป็นแบบไหน?','มีเรื่องธรรมดาเรื่องไหนที่กลายเป็นความทรงจำดี ๆ?',
    'เดือนนี้สิ่งไหนทำให้รู้สึกว่าเราเดินมาด้วยกันจริง ๆ?','ถ้าให้ตั้งชื่อบทของเดือนนี้ จะตั้งว่าอะไร?'
  ];
  const THEMES=[
    ['#c85c78','#a94b65','#fff0f4','#ffeef3'],['#b85f8f','#984c73','#fff0f7','#f8eafa'],
    ['#8b6fb3','#70559a','#f3effb','#eee9fa'],['#6685b5','#506d99','#eef5ff','#e8f0fb'],
    ['#5e9a9a','#477c7c','#edf9f7','#e5f5f2'],['#7e9b63','#607d49','#f1f8ea','#eaf4e2'],
    ['#b58a55','#936d3e','#fff7e9','#f8eddc'],['#b66c58','#965340','#fff1ec','#f9e6df'],
    ['#9b708d','#7e5572','#f9f0f7','#f3e7f0'],['#697c9c','#536581','#eff3fb','#e7edf7'],
    ['#8b8061','#6e643f','#f7f5e9','#efecd9'],['#9b6477','#7f4c60','#fff1f5','#f8e7ed']
  ];
  const esc=v=>String(v??'').replace(/[&<>\'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const dayStart=d=>new Date(d.getFullYear(),d.getMonth(),d.getDate());
  const daysBetween=(a,b)=>Math.max(0,Math.round((dayStart(b)-dayStart(a))/86400000));

  /* Single source of truth for anniversary dates.
     Month 1 starts on 2026-08-05; Month 2 opens on 2026-10-05. */
  function fixedMonthDate(month){
    const start=new Date(CONFIG.startDate+'T00:00:00');
    const target=new Date(start.getFullYear(),start.getMonth()+Number(month),start.getDate());
    return target;
  }
  function fixedUnlockedMonth(){
    const today=dayStart(new Date());
    const start=dayStart(new Date(CONFIG.startDate+'T00:00:00'));
    if(today<start) return 0;
    let n=1;
    while(n<CONFIG.totalMonths && fixedMonthDate(n+1)<=today) n++;
    return n;
  }
  function fixedIsUnlocked(month){
    const m=Number(month);
    if(!Number.isInteger(m)||m<1||m>CONFIG.totalMonths) return false;
    return dayStart(new Date())>=fixedMonthDate(m);
  }
  function fixedUpdateCounter(){
    const start=dayStart(new Date(CONFIG.startDate+'T00:00:00'));
    const today=dayStart(new Date());
    const elapsed=daysBetween(start,today);
    const current=fixedUnlockedMonth();
    const next=current===0?start:(current<CONFIG.totalMonths?fixedMonthDate(current+1):null);
    $('daysTogether').textContent=`${elapsed} วัน`;
    if(next){
      const days=Math.max(0,daysBetween(today,next));
      $('nextAnniv').innerHTML=`ครบรอบถัดไปใน <strong>${days} วัน</strong> · ${formatThaiDate(next)}`;
    }else{
      $('nextAnniv').innerHTML='ครบทุกช่วงเวลาที่ตั้งไว้แล้ว ♡';
    }
  }

  function cloud(){return typeof supabaseClient!=='undefined'&&supabaseClient;}
  function getSetting(key,fallback){try{return typeof settings!=='undefined'&&settings[key]!==undefined?settings[key]:fallback}catch(e){return fallback}}
  async function saveSetting(key,value){
    if(!cloud()){toast('Supabase ยังไม่ได้เชื่อมต่อ');return false}
    try{
      const {error}=await supabaseClient.from('settings').upsert({app_id:CONFIG.appId,key,value},{onConflict:'app_id,key'});
      if(error) throw error;
      if(typeof settings!=='undefined') settings[key]=value;
      return true;
    }catch(e){console.error('Anv feature save error:',e);toast('บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง');return false}
  }

  function injectStyle(){
    if(document.getElementById('anvEnhancementStyle'))return;
    const s=document.createElement('style');s.id='anvEnhancementStyle';s.textContent=`
      .anvExtra{margin:12px auto 0;max-width:450px;text-align:left;background:var(--soft);border-radius:20px;padding:15px 16px;border:1px solid var(--line)}
      .anvExtraHead{display:flex;justify-content:space-between;gap:10px;align-items:center;font-size:12px;color:var(--muted)}
      .anvExtraTitle{font-weight:700;color:var(--pink2);font-size:14px}.anvProgress{height:8px;border-radius:999px;background:rgba(200,92,120,.12);overflow:hidden;margin:10px 0 7px}
      .anvProgress>i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--pink),#e79aae);border-radius:inherit;transition:width .7s ease}.anvExtraFoot{font-size:11px;color:var(--muted);line-height:1.6}
      .anvDaily{margin:12px auto 0;max-width:450px;padding:14px 16px;border-radius:20px;background:linear-gradient(135deg,var(--soft),transparent);border:1px solid var(--line);text-align:center}.anvDaily b{display:block;color:var(--pink2);font-size:12px;margin-bottom:5px}.anvDaily span{font-size:13px;line-height:1.7}.anvShare{margin-top:9px;width:100%}
      .anvFeatureTools{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin:0 auto 18px;max-width:650px}.anvFeatureBtn{border:0;border-radius:17px;padding:13px 8px;background:var(--soft);color:var(--pink2);font-size:12px}.anvFeatureBtn b,.anvFeatureBtn span{display:block}.anvFeatureBtn span{font-size:10px;color:var(--muted);margin-top:3px}
      .anvFeatureModal{position:fixed;inset:0;background:rgba(30,18,23,.58);backdrop-filter:blur(8px);display:none;align-items:center;justify-content:center;padding:16px;z-index:80}.anvFeatureModal.show{display:flex}.anvFeatureCard{width:min(94vw,680px);max-height:90vh;overflow:auto;background:var(--card);border-radius:26px;padding:22px;box-shadow:0 20px 70px rgba(0,0,0,.25)}
      .anvFeatureHead{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:14px}.anvFeatureHead h3{margin:0;color:var(--pink2);font-size:20px}.anvClose{border:0;background:var(--soft);color:var(--pink2);width:38px;height:38px;border-radius:50%}
      .anvQuestion{background:var(--soft);border-radius:18px;padding:15px;margin-bottom:12px}.anvQuestion b{display:block;color:var(--pink2);font-size:13px;line-height:1.6;margin-bottom:8px}.anvFeatureInput{width:100%;border:1px solid var(--line);border-radius:14px;padding:11px 12px;background:var(--card);color:var(--dark);margin-top:7px}.anvFeatureTextarea{min-height:100px;resize:vertical}.anvTwoCol{display:grid;grid-template-columns:1fr 1fr;gap:10px}.anvTwoCol label{font-size:12px;color:var(--muted)}.anvFeatureRow{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:10px}.anvLikeList,.anvPlanList{display:grid;gap:8px;margin-top:12px}.anvLikeItem,.anvPlanItem{display:flex;align-items:flex-start;gap:9px;background:var(--soft);border-radius:15px;padding:11px 12px}.anvLikeText,.anvPlanText{flex:1;line-height:1.6;font-size:13px}.anvLikeGroup{margin-top:16px}.anvLikeGroup h4{margin:0 0 7px;color:var(--pink2);font-size:13px}.anvMini{border:0;background:transparent;color:var(--pink);font-size:11px;padding:2px 5px}.anvPlanItem.done .anvPlanText{text-decoration:line-through;opacity:.55}.anvCheck{width:18px;height:18px;margin-top:2px;accent-color:var(--pink)}
      @media(max-width:560px){.anvFeatureTools{grid-template-columns:1fr}.anvTwoCol{grid-template-columns:1fr}.anvFeatureCard{padding:18px}}
    `;document.head.appendChild(s);
  }

  function applyMonthTheme(){
    const n=Math.max(1,fixedUnlockedMonth());const t=THEMES[(n-1)%THEMES.length];
    document.documentElement.style.setProperty('--pink',t[0]);document.documentElement.style.setProperty('--pink2',t[1]);document.documentElement.style.setProperty('--soft',t[2]);document.documentElement.style.setProperty('--bg2',t[3]);
  }
  function updateJourney(){
    const bar=$('anvJourneyBar'),pct=$('anvJourneyPct'),text=$('anvJourneyText');if(!bar||!pct||!text)return;
    const today=dayStart(new Date()),start=dayStart(new Date(CONFIG.startDate+'T00:00:00')),current=fixedUnlockedMonth();
    const next=current<CONFIG.totalMonths?fixedMonthDate(Math.max(1,current+1)):null;const total=next?Math.max(1,daysBetween(current?fixedMonthDate(current):start,next)):1;
    const elapsed=daysBetween(current?fixedMonthDate(current):start,today);const progress=Math.min(100,Math.round((elapsed/total)*100));
    bar.style.width=progress+'%';pct.textContent=progress+'%';text.textContent=current?`เปิดถึงเดือนที่ ${current} แล้ว · ${daysBetween(start,today)} วันทั้งหมด · ครบรอบถัดไป ${next?formatThaiDate(next):'ครบแล้ว'}`:'ยังไม่ถึงวันเริ่มต้น';
  }

  function ensureCards(){
    const counter=document.querySelector('.counter');if(!counter)return;
    if(!document.getElementById('anvJourney')){const x=document.createElement('div');x.id='anvJourney';x.className='anvExtra';x.innerHTML='<div class="anvExtraHead"><span class="anvExtraTitle">♡ เส้นทางของเรา</span><span id="anvJourneyPct">0%</span></div><div class="anvProgress"><i id="anvJourneyBar"></i></div><div class="anvExtraFoot" id="anvJourneyText">กำลังคำนวณ...</div>';counter.insertAdjacentElement('afterend',x)}
    if(!document.getElementById('anvDaily')){const x=document.createElement('div');x.id='anvDaily';x.className='anvDaily';const day=Math.floor(Date.now()/86400000);x.innerHTML='<b>ข้อความเล็ก ๆ สำหรับวันนี้</b><span>'+esc(MESSAGES[day%MESSAGES.length])+'</span><button class="secondary anvShare" type="button" id="anvShareBtn">↗ แชร์หน้าเว็บ</button>';counter.insertAdjacentElement('afterend',x);x.querySelector('#anvShareBtn').addEventListener('click',async()=>{try{if(navigator.share)await navigator.share({title:document.title,text:'Our Anniversary ♡',url:location.href});else{await navigator.clipboard.writeText(location.href);toast('คัดลอกลิงก์เว็บไซต์แล้ว ♡')}}catch(e){if(e?.name!=='AbortError')toast('ไม่สามารถแชร์ได้')}})}
    if(!document.getElementById('anvFeatureTools')){const x=document.createElement('div');x.id='anvFeatureTools';x.className='anvFeatureTools';x.innerHTML='<button class="anvFeatureBtn" data-feature="question">💭<b>คำถามประจำเดือน</b><span>เก็บคำตอบของเรา</span></button><button class="anvFeatureBtn" data-feature="likes">❤️<b>สิ่งที่ชอบเกี่ยวกับเธอ</b><span>สิ่งเล็ก ๆ ที่อยากจำ</span></button><button class="anvFeatureBtn" data-feature="plans">🔒<b>สิ่งที่อยากทำด้วยกัน</b><span>จากสิ่งที่อยากทำ → ความทรงจำ</span></button>';counter.insertAdjacentElement('afterend',x);x.querySelectorAll('[data-feature]').forEach(b=>b.addEventListener('click',()=>openFeature(b.dataset.feature)))}
  }

  function ensureFeatureModal(){
    if(document.getElementById('anvFeatureModal'))return;const m=document.createElement('div');m.id='anvFeatureModal';m.className='anvFeatureModal';m.innerHTML='<div class="anvFeatureCard"><div class="anvFeatureHead"><h3 id="anvFeatureTitle"></h3><button class="anvClose" id="anvFeatureClose">×</button></div><div id="anvFeatureBody"></div></div>';document.body.appendChild(m);m.addEventListener('click',e=>{if(e.target===m)closeFeature()});m.querySelector('#anvFeatureClose').addEventListener('click',closeFeature)
  }
  function openFeature(type){ensureFeatureModal();const m=$('anvFeatureModal'),b=$('anvFeatureBody'),t=$('anvFeatureTitle');if(type==='question')renderQuestion(t,b);if(type==='likes')renderLikes(t,b);if(type==='plans')renderPlans(t,b);m.classList.add('show')}
  function closeFeature(){const m=$('anvFeatureModal');if(m)m.classList.remove('show')}
  function renderQuestion(title,body){
    const month=Math.max(1,fixedUnlockedMonth()),q=MONTH_QUESTIONS[(month-1)%MONTH_QUESTIONS.length],data=getSetting('question_'+month,{brother:'',child:''})||{};title.textContent=`💭 คำถามประจำเดือน · เดือนที่ ${month}`;body.innerHTML=`<div class="anvQuestion"><b>${esc(q)}</b><div class="anvTwoCol"><label>คำตอบของพี่<textarea class="anvFeatureInput anvFeatureTextarea" id="anvBrother">${esc(data.brother||'')}</textarea></label><label>คำตอบของหนู<textarea class="anvFeatureInput anvFeatureTextarea" id="anvChild">${esc(data.child||'')}</textarea></label></div><div class="anvFeatureRow"><button class="primary" id="anvSaveQuestion">บันทึกคำตอบ</button></div></div>`;$('anvSaveQuestion').onclick=async()=>{const v={question:q,brother:$('anvBrother').value.trim(),child:$('anvChild').value.trim()};if(!v.brother&&!v.child){toast('ลองเขียนอย่างน้อยหนึ่งคำตอบก่อนนะ');return}if(await saveSetting('question_'+month,v)){toast('บันทึกคำตอบแล้ว ♡');closeFeature()}}
  }
  function renderLikes(title,body){
    const d=getSetting('likes_about_us',{toChild:[],toBrother:[]})||{},a=Array.isArray(d.toChild)?d.toChild:[],b=Array.isArray(d.toBrother)?d.toBrother:[];title.textContent='❤️ สิ่งที่ชอบเกี่ยวกับเธอ';const list=(arr,key,label)=>`<div class="anvLikeGroup"><h4>${label}</h4><div class="anvLikeList">${arr.length?arr.map((x,i)=>`<div class="anvLikeItem"><div class="anvLikeText">${esc(x)}</div><button class="anvMini" data-del="${key}" data-i="${i}">ลบ</button></div>`).join(''):'<div class="small">ยังไม่มีข้อความ</div>'}</div><div class="anvFeatureRow"><input class="anvFeatureInput" id="like_${key}" placeholder="เขียนสิ่งเล็ก ๆ ที่ชอบ..." maxlength="180"><button class="secondary" data-add="${key}">+ เพิ่ม</button></div></div>`;body.innerHTML=list(a,'toChild','สิ่งที่พี่ชอบในหนู')+list(b,'toBrother','สิ่งที่หนูชอบในพี่');body.querySelectorAll('[data-add]').forEach(x=>x.onclick=async()=>{const k=x.dataset.add,v=$('like_'+k).value.trim();if(!v)return;const n={toChild:[...a],toBrother:[...b]};n[k].push(v);if(await saveSetting('likes_about_us',n)){toast('เพิ่มข้อความแล้ว ♡');renderLikes(title,body)}});body.querySelectorAll('[data-del]').forEach(x=>x.onclick=async()=>{const k=x.dataset.del,i=Number(x.dataset.i),n={toChild:[...a],toBrother:[...b]};n[k].splice(i,1);if(await saveSetting('likes_about_us',n))renderLikes(title,body)})
  }
  function renderPlans(title,body){
    let plans=getSetting('future_plans',[]);plans=Array.isArray(plans)?plans:[];title.textContent='🔒 สิ่งที่อยากทำด้วยกัน';body.innerHTML=`<div class="anvFeatureRow"><input class="anvFeatureInput" id="planInput" placeholder="เช่น ไปเที่ยวทะเลด้วยกัน" maxlength="180"><button class="primary" id="planAdd">+ เพิ่มสิ่งที่อยากทำ</button></div><div class="anvPlanList">${plans.length?plans.map((p,i)=>`<div class="anvPlanItem ${p.done?'done':''}"><input class="anvCheck" type="checkbox" ${p.done?'checked':''} data-toggle="${i}"><div class="anvPlanText">${esc(p.text||'')}</div><button class="anvMini" data-plan-del="${i}">ลบ</button></div>`).join(''):'<div class="emptyState">ยังไม่มีรายการ ลองเพิ่มสิ่งที่อยากทำด้วยกันสักอย่าง ♡</div>'}</div>`;$('planAdd').onclick=async()=>{const v=$('planInput').value.trim();if(!v)return;const n=[...plans,{text:v,done:false,createdAt:new Date().toISOString()}];if(await saveSetting('future_plans',n)){toast('เพิ่มรายการแล้ว ♡');renderPlans(title,body)}};body.querySelectorAll('[data-toggle]').forEach(x=>x.onchange=async()=>{const i=Number(x.dataset.toggle),n=plans.map((p,j)=>j===i?{...p,done:x.checked}:p);if(await saveSetting('future_plans',n))renderPlans(title,body)});body.querySelectorAll('[data-plan-del]').forEach(x=>x.onclick=async()=>{const i=Number(x.dataset.planDel),n=plans.filter((_,j)=>j!==i);if(await saveSetting('future_plans',n))renderPlans(title,body)})
  }

  function addSwipe(){const lb=$('lightbox');if(!lb||lb.dataset.anvSwipe)return;lb.dataset.anvSwipe='1';let x=0;lb.addEventListener('touchstart',e=>x=e.changedTouches[0].clientX,{passive:true});lb.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-x;if(Math.abs(dx)<55)return;dx<0?nextPhoto():prevPhoto()},{passive:true});document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLightbox();closeModal();closeFeature()}if(!lb.classList.contains('show'))return;if(e.key==='ArrowLeft')prevPhoto();if(e.key==='ArrowRight')nextPhoto()})}

  function applyFixes(){
    /* Override the original helpers after index.html has initialized. */
    window.monthDate=fixedMonthDate;window.isMonthUnlocked=fixedIsUnlocked;window.currentUnlockedMonth=fixedUnlockedMonth;window.updateCounter=fixedUpdateCounter;
    fixedUpdateCounter();
    ensureCards();applyMonthTheme();updateJourney();addSwipe();
    const originalOpen=window.openMonth;
    if(!window.__anvOpenWrapped){window.__anvOpenWrapped=true;window.openMonth=async function(month){if(!fixedIsUnlocked(month)){toast('เดือนนี้ยังไม่ถึงวันเปิด');return}return originalOpen.call(this,month)}}
  }
  function initEnhancements(){injectStyle();applyFixes()}
  setTimeout(initEnhancements,300);setTimeout(initEnhancements,1000);setInterval(()=>{applyFixes()},60000);
})();