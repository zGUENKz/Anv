/* Anv Random UX — animated reveal + Lucky Random */
(function(){
  const LUCKY=[
    ['💕','Lucky Love','บอกอีกคนหนึ่งอย่างที่ชอบที่สุดในตัวเขา แล้วกอดกัน 10 วินาที'],
    ['💌','Lucky Message','ส่งข้อความสั้น ๆ บอกอีกคนว่า วันนี้ดีใจที่มีเขาอยู่ในชีวิต'],
    ['📸','Lucky Moment','ถ่ายรูปคู่กัน 1 รูปในวันนี้ เก็บไว้เป็นความทรงจำของเรา'],
    ['🍰','Lucky Treat','วันนี้เลือกของกินหรือเครื่องดื่มให้อีกคน โดยห้ามบอกล่วงหน้า'],
    ['🎵','Lucky Song','ผลัดกันเลือกเพลงคนละ 1 เพลง แล้วฟังด้วยกันจนจบ'],
    ['💭','Lucky Question','ถามกันว่า “ช่วงเวลาไหนของเราที่อยากกลับไปอีกครั้ง?”'],
    ['🤍','Lucky Thanks','ผลัดกันพูด 1 เรื่องที่อยากขอบคุณอีกคนในวันนี้'],
    ['🎮','Lucky Challenge','เล่นเกมด้วยกัน 1 รอบ คนแพ้ต้องทำอะไรน่ารัก ๆ ให้คนชนะ'],
    ['🌙','Lucky Night','คืนนี้หาเวลาคุยกัน 15 นาที โดยวางโทรศัพท์ไว้ข้าง ๆ'],
    ['🫶','Lucky Hug','หยุดทุกอย่างสักครู่ แล้วกอดกันโดยไม่ต้องพูดอะไร'],
    ['✨','Lucky Surprise','ทำเรื่องเล็ก ๆ ที่คิดว่าอีกคนน่าจะชอบให้ 1 อย่าง โดยไม่บอกก่อน'],
    ['🌷','Lucky Date','ให้คนหนึ่งเป็นคนเลือกกิจกรรมเล็ก ๆ ของเราในวันนี้ทั้งหมด']
  ];

  function style(){
    if(document.getElementById('anvRandomUXStyle'))return;
    const s=document.createElement('style');
    s.id='anvRandomUXStyle';
    s.textContent=[
      '.anvDailyTogetherGrid{grid-template-columns:repeat(2,1fr)}',
      '.anvDailyTogetherBtn{transition:transform .2s,box-shadow .2s}',
      '.anvDailyTogetherBtn:hover{transform:translateY(-2px);box-shadow:0 9px 24px rgba(123,70,93,.08)}',
      '.anvDailyTogetherBtn:active{transform:scale(.97)}',
      '.anvLuckyBtn{position:relative;overflow:hidden;background:linear-gradient(135deg,var(--soft),rgba(255,255,255,.7));border:1px solid var(--line)}',
      '.anvLuckyBtn:after{content:"✦";position:absolute;right:9px;top:6px;font-size:10px;animation:anvLuckyTwinkle 1.8s ease-in-out infinite}',
      '.anvUXResult{animation:anvUXReveal .42s ease}',
      '.anvUXRolling{opacity:.45;transform:scale(.98);filter:blur(1px)}',
      '.anvLuckyCard{min-height:190px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(145deg,var(--soft),transparent);border:1px solid var(--line);border-radius:24px;padding:24px 18px}',
      '.anvLuckyBadge{display:inline-flex;padding:6px 11px;border-radius:999px;background:var(--soft);color:var(--pink2);font-size:11px;margin-bottom:12px}',
      '.anvLuckyIcon{font-size:42px;line-height:1;animation:anvLuckyPop .55s ease}',
      '.anvLuckyTitle{font-size:22px;font-weight:700;color:var(--pink2);margin:9px 0 6px}',
      '.anvLuckyText{font-size:15px;line-height:1.8;color:var(--dark);max-width:420px}',
      '@keyframes anvUXReveal{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}',
      '@keyframes anvLuckyPop{0%{transform:scale(.5) rotate(-10deg);opacity:0}70%{transform:scale(1.12) rotate(4deg)}100%{transform:none;opacity:1}}',
      '@keyframes anvLuckyTwinkle{50%{transform:scale(1.5) rotate(25deg);opacity:1}}',
      '@media(max-width:560px){.anvDailyTogetherGrid{grid-template-columns:1fr}.anvLuckyText{font-size:14px}}'
    ].join('');
    document.head.appendChild(s);
  }

  function getModal(){
    const m=document.getElementById('anvDailyModal');
    return m;
  }

  function setResult(text){
    const r=document.getElementById('anvDailyResult');
    if(!r)return;
    r.className='anvDailyResult anvUXResult';
    r.textContent=text;
  }

  function animatedPick(btn){
    const title=btn.textContent.includes('กิน')?'วันนี้กินอะไรดี?':btn.textContent.includes('ทำอะไร')?'วันนี้ทำอะไรดี?':'วันนี้คุยอะไรกันดี?';
    const m=getModal();
    if(!m)return;
    const r=document.getElementById('anvDailyResult');
    const hint=document.getElementById('anvDailyHint');
    const again=document.getElementById('anvDailyAgain');
    document.getElementById('anvDailyModalTitle').textContent=title;
    hint.textContent='กำลังลุ้นผลอยู่ ♡';
    r.className='anvDailyResult anvUXRolling';
    r.textContent='กำลังสุ่ม...';
    m.classList.add('show');
    let i=0;
    const timer=setInterval(function(){
      r.textContent=['✦','♡','…','✦','♡','…'][i%6];
      i++;
      if(i>=8){
        clearInterval(timer);
        const old=again.onclick;
        if(typeof old==='function'){
          old();
        }else{
          r.className='anvDailyResult anvUXResult';
          hint.textContent='ได้อันนี้แล้ว ♡';
        }
      }
    },85);
  }

  function lucky(){
    const m=getModal();
    if(!m)return;
    const r=document.getElementById('anvDailyResult');
    const hint=document.getElementById('anvDailyHint');
    const again=document.getElementById('anvDailyAgain');
    const item=LUCKY[Math.floor(Math.random()*LUCKY.length)];
    document.getElementById('anvDailyModalTitle').textContent='🍀 Lucky Random';
    hint.textContent='ภารกิจพิเศษสำหรับเราสองคน ♡';
    again.textContent='🍀 Lucky อีกครั้ง';
    r.className='anvLuckyCard';
    r.innerHTML='<div class="anvLuckyBadge">✦ LUCKY ✦</div><div class="anvLuckyIcon">🍀</div><div class="anvLuckyTitle">กำลังสุ่ม...</div><div class="anvLuckyText">โชคดีกำลังเลือกอะไรบางอย่างให้เรา</div>';
    m.classList.add('show');
    setTimeout(function(){
      r.innerHTML='<div class="anvLuckyBadge">✦ LUCKY ✦</div><div class="anvLuckyIcon">'+item[0]+'</div><div class="anvLuckyTitle">'+item[1]+'</div><div class="anvLuckyText">'+item[2]+'</div>';
    },800);
    again.onclick=lucky;
  }

  function addLucky(){
    const wrap=document.getElementById('anvDailyTogether');
    if(!wrap||document.getElementById('anvLuckyRandomButton'))return;
    const btn=document.createElement('button');
    btn.id='anvLuckyRandomButton';
    btn.className='anvDailyTogetherBtn anvLuckyBtn';
    btn.type='button';
    btn.innerHTML='🍀<b>Lucky Random</b><span>ภารกิจพิเศษของเรา</span>';
    btn.addEventListener('click',lucky);
    wrap.querySelector('.anvDailyTogetherGrid').appendChild(btn);
  }

  function enhanceNormalRandom(){
    const wrap=document.getElementById('anvDailyTogether');
    if(!wrap||wrap.dataset.uxBound==='1')return;
    wrap.dataset.uxBound='1';
    wrap.addEventListener('click',function(e){
      const btn=e.target.closest('[data-daily]');
      if(!btn||btn.dataset.daily==='lucky')return;
      setTimeout(function(){
        const m=getModal(),r=document.getElementById('anvDailyResult');
        if(!m||!r||!m.classList.contains('show'))return;
        const final=r.textContent;
        r.className='anvDailyResult anvUXRolling';
        r.textContent='กำลังสุ่ม...';
        let i=0;
        const timer=setInterval(function(){
          r.textContent=['✦','♡','…','✦','♡','…'][i%6];
          i++;
          if(i>=7){
            clearInterval(timer);
            r.textContent=final;
            r.className='anvDailyResult anvUXResult';
          }
        },80);
      },20);
    });
  }

  function init(){
    style();
    addLucky();
    enhanceNormalRandom();
    setTimeout(function(){addLucky();enhanceNormalRandom()},500);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();