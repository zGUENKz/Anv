/* Anv Daily Together — food, activities, and deep-talk prompts */
(function(){
  const FOOD=[
    'กะเพราหมูสับ','กะเพราหมูกรอบ','กะเพราไก่ไข่ดาว','กะเพราทะเล','ข้าวผัดหมู','ข้าวผัดกุ้ง','ข้าวหมูกระเทียม','ข้าวไก่กระเทียม','ผัดพริกแกงหมู','ผัดพริกแกงไก่','คะน้าหมูกรอบ','คะน้าหมูชิ้น','ผัดผักรวมหมู','ผัดซีอิ๊ว','ราดหน้า','สุกี้น้ำ','สุกี้แห้ง','ก๋วยเตี๋ยวต้มยำ','ก๋วยเตี๋ยวน้ำตก','เย็นตาโฟ','ข้าวมันไก่','ข้าวหมูแดง','ข้าวขาหมู','ข้าวหน้าไก่','ข้าวไข่เจียวหมูสับ','ข้าวต้มหมู','ข้าวแกง','ข้าวคลุกกะปิ','ข้าวหมูทอด','ข้าวไก่ทอด','ส้มตำ + ไก่ย่าง','ส้มตำ + คอหมูย่าง','หมูกระทะ','ชาบู','บุฟเฟ่ต์','ปิ้งย่าง','อาหารญี่ปุ่น','อาหารเกาหลี','หมาล่า','พิซซ่า','เบอร์เกอร์','ไก่ทอด','บะหมี่เกี๊ยว','ข้าวซอย','ผัดไทย','หอยทอด','ก๋วยจั๊บ','ขนมจีนน้ำยา','โจ๊กหมู','ข้าวผัดอเมริกัน'
  ];
  const ACTIVITIES=[
    'ไปกินหมูกระทะด้วยกัน','ไปกินชาบูด้วยกัน','ไปกินบุฟเฟ่ต์ด้วยกัน','ไปกินปิ้งย่างด้วยกัน','หาร้านอาหารใหม่ ๆ แล้วลองด้วยกัน','ออกไปกินมื้อใหญ่แบบไม่ต้องคิดเยอะ','ดูหนังด้วยกัน','เล่นเกมด้วยกัน','ไปคาเฟ่ด้วยกัน','ออกไปเดินเล่นด้วยกัน','ถ่ายรูปด้วยกัน','ซื้อขนมที่ชอบมากินด้วยกัน','ทำอาหารหรือของหวานด้วยกัน','ออกไปเที่ยวใกล้ ๆ กัน','นั่งคุยกันยาว ๆ โดยไม่เล่นโทรศัพท์','ดูรูปเก่า ๆ ของเราด้วยกัน','ทำ playlist ที่อยากฟังด้วยกัน','แลกข้อความดี ๆ ให้กัน','ลองทำกิจกรรมที่ไม่เคยทำด้วยกัน','หาที่นั่งชิล ๆ แล้วคุยกัน','ออกไปดูพระอาทิตย์ตกด้วยกัน','หาของกินตอนกลางคืนด้วยกัน','ไปเดินตลาดด้วยกัน','เลือกของเล็ก ๆ ให้กัน','จัดมื้ออาหารเล็ก ๆ ที่บ้านด้วยกัน','เล่นคำถาม Deep Talk ด้วยกัน'
  ];
  const DEEP=[
    'ช่วงนี้มีเรื่องอะไรที่อยู่ในใจมากที่สุด?','ช่วงนี้มีอะไรที่อยากให้อีกคนเข้าใจตัวเรามากขึ้นไหม?','มีเรื่องอะไรที่อยากขอบคุณอีกคน แต่ยังไม่เคยพูดจริง ๆ ไหม?','ช่วงเวลาไหนที่อยู่ด้วยกันแล้วรู้สึกสบายใจที่สุด?','มีความทรงจำไหนของเราที่อยากกลับไปสัมผัสอีกครั้ง?','อะไรคือสิ่งเล็ก ๆ ที่อีกคนทำแล้วทำให้รู้สึกดีมาก?','ถ้าย้อนกลับไปวันที่เราเริ่มรู้จักกัน อยากบอกอะไรกับตัวเราในวันนั้น?','มีเรื่องอะไรที่อยากลองทำด้วยกันสักครั้ง?','ถ้าอีก 1 ปีเราเปิดเว็บนี้กลับมาดู อยากเห็นตัวเราเป็นแบบไหน?','อนาคตแบบไหนที่อยากให้เราได้มีโอกาสสร้างร่วมกัน?','มีความฝันอะไรที่อยากให้อีกคนช่วยเป็นกำลังใจให้?','เวลาเหนื่อยหรือไม่สบายใจ อยากให้อีกคนอยู่ข้าง ๆ แบบไหน?','มีเรื่องอะไรที่คิดว่าเราเข้าใจกันมากขึ้นกว่าเมื่อก่อน?','อะไรทำให้รู้สึกว่าเวลาที่ได้อยู่ด้วยกันมีความหมาย?','ถ้าเลือกเก็บช่วงเวลาหนึ่งของเราไว้ได้หนึ่งช่วง จะเลือกช่วงไหน?','มีนิสัยเล็ก ๆ ของอีกคนที่ตอนแรกไม่คุ้น แต่ตอนนี้กลับรู้สึกชอบไหม?','มีอะไรที่อยากให้เราลองปรับเพื่อให้เวลาที่อยู่ด้วยกันดีขึ้น?','ช่วงนี้มีเรื่องอะไรที่ทำให้ภูมิใจในตัวเองบ้าง?','ถ้าวันนี้ไม่มีข้อจำกัดเรื่องเวลาและงบประมาณ อยากพากันไปทำอะไร?','มีสถานที่ไหนที่อยากไปด้วยกันในอนาคต?','เรื่องอะไรที่อยากให้เราจำเกี่ยวกับช่วงเวลานี้ไปนาน ๆ?','ถ้าต้องตั้งชื่อช่วงเวลาที่เราอยู่ด้วยกันตอนนี้ จะตั้งว่าอะไร?','มีเรื่องอะไรที่อยากถามกันมานานแล้วแต่ยังไม่มีโอกาสถาม?','อะไรคือวันที่ธรรมดาที่กลายเป็นความทรงจำดี ๆ สำหรับเรา?','ถ้าเราต้องสร้างประเพณีเล็ก ๆ ของเราเอง อยากให้เป็นอะไร?','มีอะไรที่ทำให้รู้สึกขอบคุณชีวิตในช่วงนี้?','เวลาที่เราคิดไม่ตรงกัน อยากให้เราคุยกันแบบไหน?','มีเรื่องอะไรที่อยากเรียนรู้หรือเติบโตไปพร้อมกัน?','ถ้าเลือกทำให้หนึ่งวันธรรมดากลายเป็นวันพิเศษ อยากทำอะไร?','คำไหนหรือประโยคไหนที่อยากได้ยินจากอีกคนในวันที่เหนื่อย?'
  ];

  // Shuffle bag: สุ่มครบทุกข้อก่อน แล้วค่อยเริ่มรอบใหม่ เพื่อไม่ให้ผลเดิมซ้ำติดกันง่าย ๆ
  const bags=new WeakMap();
  function pick(list){
    let bag=bags.get(list);
    if(!bag||bag.length===0){
      bag=list.slice();
      for(let i=bag.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [bag[i],bag[j]]=[bag[j],bag[i]];
      }
      bags.set(list,bag);
    }
    return bag.pop();
  }

  function injectStyle(){
    if(document.getElementById('anvDailyTogetherStyle'))return;
    const s=document.createElement('style');s.id='anvDailyTogetherStyle';s.textContent=`
      .anvDailyTogether{max-width:650px;margin:12px auto 18px}.anvDailyTogetherTitle{text-align:center;color:var(--muted);font-size:12px;margin-bottom:9px}
      .anvDailyTogetherGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.anvDailyTogetherBtn{border:0;border-radius:18px;padding:15px 9px;background:var(--soft);color:var(--pink2);box-shadow:0 5px 18px rgba(123,70,93,.04);transition:.2s}.anvDailyTogetherBtn:hover{transform:translateY(-2px)}.anvDailyTogetherBtn b,.anvDailyTogetherBtn span{display:block}.anvDailyTogetherBtn b{font-size:13px}.anvDailyTogetherBtn span{font-size:10px;color:var(--muted);margin-top:4px}
      .anvDailyModal{position:fixed;inset:0;background:rgba(30,18,23,.58);backdrop-filter:blur(8px);display:none;align-items:center;justify-content:center;padding:16px;z-index:90}.anvDailyModal.show{display:flex}.anvDailyCard{width:min(94vw,540px);background:var(--card);border:1px solid var(--line);border-radius:28px;padding:24px;text-align:center;box-shadow:0 20px 70px rgba(0,0,0,.25);animation:pop .3s ease}.anvDailyHead{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:16px}.anvDailyHead h3{margin:0;color:var(--pink2);font-size:20px}.anvDailyClose{border:0;background:var(--soft);color:var(--pink2);width:38px;height:38px;border-radius:50%}.anvDailyResult{min-height:100px;display:flex;align-items:center;justify-content:center;background:var(--soft);border-radius:20px;padding:22px 16px;color:var(--dark);font-size:20px;font-weight:600;line-height:1.65}.anvDailyHint{font-size:11px;color:var(--muted);margin-top:10px}.anvDailyActions{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:15px}
      @media(max-width:560px){.anvDailyTogetherGrid{grid-template-columns:1fr}.anvDailyCard{padding:19px}.anvDailyResult{font-size:18px}}
    `;document.head.appendChild(s);
  }
  function modal(){
    let m=document.getElementById('anvDailyModal');
    if(m)return m;
    m=document.createElement('div');m.id='anvDailyModal';m.className='anvDailyModal';m.innerHTML='<div class="anvDailyCard"><div class="anvDailyHead"><h3 id="anvDailyModalTitle"></h3><button class="anvDailyClose" type="button" aria-label="ปิด">×</button></div><div class="anvDailyResult" id="anvDailyResult"></div><div class="anvDailyHint">สุ่มใหม่ได้เรื่อย ๆ จนกว่าจะเจออันที่ใช่ ♡</div><div class="anvDailyActions"><button class="primary" type="button" id="anvDailyAgain">🎲 สุ่มใหม่</button></div></div>';
    document.body.appendChild(m);
    m.querySelector('.anvDailyClose').addEventListener('click',()=>m.classList.remove('show'));
    m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('show')});
    return m;
  }
  function open(type,title,list){
    const m=modal();m.querySelector('#anvDailyModalTitle').textContent=title;m.querySelector('#anvDailyResult').textContent=pick(list);m.classList.add('show');
    m.querySelector('#anvDailyAgain').onclick=()=>{m.querySelector('#anvDailyResult').textContent=pick(list)};
  }
  function init(){
    injectStyle();
    const counter=document.querySelector('.counter');if(!counter)return;
    if(document.getElementById('anvDailyTogether'))return;
    const wrap=document.createElement('section');wrap.id='anvDailyTogether';wrap.className='anvDailyTogether';wrap.innerHTML='<div class="anvDailyTogetherTitle">วันนี้ของเรา ♡</div><div class="anvDailyTogetherGrid"><button class="anvDailyTogetherBtn" type="button" data-daily="food">🍜<b>วันนี้กินอะไรดี?</b><span>สุ่มเมนูให้เรา</span></button><button class="anvDailyTogetherBtn" type="button" data-daily="activity">🍲<b>วันนี้ทำอะไรดี?</b><span>สุ่มกิจกรรมให้เรา</span></button><button class="anvDailyTogetherBtn" type="button" data-daily="deep">💭<b>วันนี้คุยอะไรกันดี?</b><span>สุ่มคำถาม Deep Talk</span></button></div>';
    counter.insertAdjacentElement('afterend',wrap);
    const map={food:['วันนี้กินอะไรดี?',FOOD],activity:['วันนี้ทำอะไรดี?',ACTIVITIES],deep:['วันนี้คุยอะไรกันดี?',DEEP]};
    wrap.querySelectorAll('[data-daily]').forEach(btn=>btn.addEventListener('click',()=>{const item=map[btn.dataset.daily];if(item)open(btn.dataset.daily,item[0],item[1]);}));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
