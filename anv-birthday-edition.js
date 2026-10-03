/* Anv Birthday Edition 2026 — October 4 personal experience layer */
(function(){
  const isBirthday=()=>{const d=new Date();return d.getMonth()===9&&d.getDate()===4;};
  if(!isBirthday()) return;

  function injectStyle(){
    if(document.getElementById('anvBirthdayEditionStyle')) return;
    const s=document.createElement('style');
    s.id='anvBirthdayEditionStyle';
    s.textContent=`
      .anvBdayHero{margin:14px auto 0;max-width:520px;padding:20px 18px;border-radius:26px;text-align:center;background:linear-gradient(145deg,var(--soft),rgba(255,255,255,.45));border:1px solid var(--line);box-shadow:0 10px 30px rgba(52,92,130,.08)}
      .anvBdayHero .eyebrow{font-size:11px;letter-spacing:2px;color:var(--muted);text-transform:uppercase}
      .anvBdayHero .cake{font-size:38px;margin:5px 0}
      .anvBdayHero h3{margin:2px 0 6px;color:var(--pink2);font-size:24px}
      .anvBdayHero p{margin:0;color:var(--muted);font-size:13px;line-height:1.8}
      .anvBdayActions{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-top:13px}
      .anvBdayLetter{display:none;margin:12px auto 0;max-width:520px;padding:20px;border-radius:22px;background:var(--card);border:1px solid var(--line);text-align:left;animation:pop .3s ease}
      .anvBdayLetter.show{display:block}
      .anvBdayLetter h4{margin:0 0 10px;color:var(--pink2);font-size:17px}
      .anvBdayLetter p{margin:0;white-space:pre-wrap;color:var(--dark);line-height:1.95;font-size:13px}
      .anvBdaySecret{display:none;margin:12px auto 0;max-width:520px;padding:18px;border-radius:22px;text-align:center;background:linear-gradient(145deg,var(--soft),transparent);border:1px dashed var(--line);animation:pop .3s ease}
      .anvBdaySecret.show{display:block}
      .anvBdaySecret .secretIcon{font-size:28px}
      .anvBdaySecret p{margin:7px 0 0;color:var(--dark);line-height:1.8;font-size:13px}
      .anvBdayFinale{margin:18px auto 0;text-align:center;color:var(--muted);font-size:12px;line-height:1.8}
      .anvBdayFinale strong{display:block;color:var(--pink2);font-size:16px}
      .anvBdaySpark{position:fixed;inset:0;pointer-events:none;z-index:80;overflow:hidden}
      .anvBdaySpark i{position:absolute;top:-20px;font-style:normal;animation:anvBdayFall 2.8s ease-in forwards}
      @keyframes anvBdayFall{to{transform:translateY(110vh) rotate(360deg);opacity:0}}
    `;
    document.head.appendChild(s);
  }

  function makeCard(){
    const counter=document.querySelector('.counter');
    if(!counter || document.getElementById('anvBdayHero')) return;
    const wrap=document.createElement('div');
    wrap.innerHTML=`
      <section class="anvBdayHero" id="anvBdayHero">
        <div class="eyebrow">Birthday Edition · 04 October</div>
        <div class="cake">🎂</div>
        <h3>Happy Birthday, หนู ♡</h3>
        <p>วันนี้หน้าเว็บนี้มีเรื่องเล็ก ๆ ที่ตั้งใจเก็บไว้ให้วันเกิดของหนูโดยเฉพาะ</p>
        <div class="anvBdayActions">
          <button class="primary" type="button" id="anvBdayLetterBtn">💌 เปิดจดหมาย</button>
          <button class="secondary" type="button" id="anvBdaySecretBtn">🎁 เปิดความลับ</button>
        </div>
      </section>
      <section class="anvBdayLetter" id="anvBdayLetter">
        <h4>จดหมายวันเกิด ♡</h4>
        <p>สุขสันต์วันเกิดนะ ♡

ขอให้ปีนี้เป็นอีกหนึ่งปีที่มีเรื่องดี ๆ ให้ยิ้มได้เยอะ ๆ ได้ทำสิ่งที่ตั้งใจ และมีความทรงจำดี ๆ เพิ่มขึ้นเรื่อย ๆ

ไม่ว่าวันข้างหน้าจะมีเรื่องอะไรเกิดขึ้น ขอให้วันนี้เป็นอีกหนึ่งวันที่หนูเปิดกลับมาแล้วรู้สึกได้ว่า วันนี้มีคนตั้งใจทำพื้นที่เล็ก ๆ นี้ไว้เพื่อเก็บความทรงจำและคำอวยพรให้หนู

ขอให้ปีใหม่ของชีวิตเป็นปีที่อบอุ่น มีความสุข และภูมิใจกับตัวเองในทุก ๆ ก้าวนะ ♡</p>
      </section>
      <section class="anvBdaySecret" id="anvBdaySecret">
        <div class="secretIcon">✨</div>
        <p>ความลับวันนี้คือ… ต่อให้ Birthday Edition นี้หายไปในวันพรุ่งนี้ ความทรงจำที่เราเก็บไว้ด้วยกันก็ยังอยู่ตรงนี้เสมอ ♡</p>
      </section>
      <div class="anvBdayFinale">
        <strong>🎂 Happy Birthday ♡</strong>
        วันนี้ขอให้เป็นวันที่มีรอยยิ้มเยอะที่สุดวันหนึ่งนะ
      </div>`;
    counter.insertAdjacentElement('afterend',wrap.firstElementChild);
    const hero=document.getElementById('anvBdayHero');
    const letter=wrap.children[0];
    const secret=wrap.children[1];
    hero.insertAdjacentElement('afterend',letter);
    letter.insertAdjacentElement('afterend',secret);
    secret.insertAdjacentElement('afterend',wrap.children[2]);

    hero.querySelector('#anvBdayLetterBtn').addEventListener('click',()=>{
      letter.classList.toggle('show');
      if(letter.classList.contains('show')) secret.classList.remove('show');
    });
    hero.querySelector('#anvBdaySecretBtn').addEventListener('click',()=>{
      secret.classList.toggle('show');
      if(secret.classList.contains('show')) letter.classList.remove('show');
      sparkle();
    });
  }

  function sparkle(){
    let layer=document.querySelector('.anvBdaySpark');
    if(!layer){
      layer=document.createElement('div');layer.className='anvBdaySpark';document.body.appendChild(layer);
    }
    layer.innerHTML='';
    const icons=['♡','✦','✧','•','🎂'];
    for(let i=0;i<32;i++){
      const el=document.createElement('i');
      el.textContent=icons[Math.floor(Math.random()*icons.length)];
      el.style.left=(Math.random()*100)+'%';
      el.style.animationDelay=(Math.random()*1.1)+'s';
      el.style.fontSize=(10+Math.random()*16)+'px';
      layer.appendChild(el);
    }
    setTimeout(()=>layer.remove(),4200);
  }

  function init(){
    injectStyle();
    makeCard();
    setTimeout(sparkle,1300);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
