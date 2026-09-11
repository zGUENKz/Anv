/* Anv birthday layer — personal birthdays, October blue theme, small birthday surprises */
(function(){
  const BIRTHDAYS={
    owner:{month:8,day:27,title:'สุขสันต์วันเกิดนะ ♡',message:'ขอให้ปีนี้เป็นอีกหนึ่งปีที่มีเรื่องดี ๆ ให้ยิ้มได้เยอะขึ้น ได้ทำสิ่งที่ตั้งใจ และมีความทรงจำดี ๆ เพิ่มขึ้นเรื่อย ๆ นะ'},
    partner:{month:10,day:4,title:'สุขสันต์วันเกิด ♡',message:'ขอให้วันเกิดปีนี้เต็มไปด้วยรอยยิ้ม ความสุข และเรื่องดี ๆ ที่ทำให้รู้สึกภูมิใจกับตัวเองนะ ขอให้ปีใหม่ของชีวิตเป็นปีที่อบอุ่นและมีความทรงจำดี ๆ มากมาย'}
  };
  const pad=n=>String(n).padStart(2,'0');
  const today=new Date();
  const isBirthday=(b)=>today.getMonth()+1===b.month&&today.getDate()===b.day;

  function injectStyle(){
    if(document.getElementById('anvBirthdayStyle'))return;
    const s=document.createElement('style');s.id='anvBirthdayStyle';s.textContent=`
      .anvBirthday{margin:12px auto 0;max-width:450px;padding:16px;border-radius:22px;background:linear-gradient(135deg,var(--soft),transparent);border:1px solid var(--line);text-align:center}
      .anvBirthdayIcon{font-size:25px}.anvBirthdayTitle{margin:5px 0;color:var(--pink2);font-weight:700;font-size:15px}.anvBirthdayText{font-size:12px;line-height:1.7;color:var(--muted)}
      .anvBirthdayBtn{margin-top:10px}
      .anvBirthdayModal{position:fixed;inset:0;background:rgba(10,25,45,.55);backdrop-filter:blur(9px);display:none;align-items:center;justify-content:center;padding:18px;z-index:95}
      .anvBirthdayModal.show{display:flex}.anvBirthdayCard{width:min(92vw,520px);text-align:center;background:var(--card);border:1px solid var(--line);border-radius:28px;padding:30px 24px;box-shadow:0 25px 80px rgba(0,0,0,.25);animation:pop .35s ease}
      .anvBirthdayCard .big{font-size:42px}.anvBirthdayCard h3{margin:8px 0;color:var(--pink2);font-size:23px}.anvBirthdayCard p{color:var(--dark);line-height:1.9;font-size:14px;margin:10px 0 18px;white-space:pre-wrap}
      body.anvOctober{--pink:#3978b8;--pink2:#245a91;--soft:#edf6ff;--bg2:#dceeff;--line:#c5def5}
      body.dark.anvOctober{--pink:#72b4ee;--pink2:#a9d6ff;--soft:#172d42;--bg2:#102236;--line:#315574}
    `;document.head.appendChild(s);
  }

  function applyBirthdayTheme(){
    if(today.getMonth()+1===10) document.body.classList.add('anvOctober');
    else document.body.classList.remove('anvOctober');
  }

  function showModal(kind){
    const b=BIRTHDAYS[kind];
    let modal=document.getElementById('anvBirthdayModal');
    if(!modal){
      modal=document.createElement('div');modal.id='anvBirthdayModal';modal.className='anvBirthdayModal';
      modal.innerHTML='<div class="anvBirthdayCard"><div class="big">🎂</div><h3 id="anvBirthdayModalTitle"></h3><p id="anvBirthdayModalText"></p><button class="primary" id="anvBirthdayClose">เก็บไว้เป็นความทรงจำ ♡</button></div>';
      document.body.appendChild(modal);
      modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('show')});
      modal.querySelector('#anvBirthdayClose').addEventListener('click',()=>modal.classList.remove('show'));
    }
    modal.querySelector('#anvBirthdayModalTitle').textContent=b.title;
    modal.querySelector('#anvBirthdayModalText').textContent=b.message;
    modal.classList.add('show');
  }

  function addBirthdayCard(kind,label){
    const counter=document.querySelector('.counter');if(!counter)return;
    if(document.getElementById('anvBirthdayCard_'+kind))return;
    const b=BIRTHDAYS[kind];
    const card=document.createElement('div');card.id='anvBirthdayCard_'+kind;card.className='anvBirthday';
    card.innerHTML='<div class="anvBirthdayIcon">🎂</div><div class="anvBirthdayTitle">'+label+'</div><div class="anvBirthdayText">'+b.message+'</div><button class="secondary anvBirthdayBtn" type="button">เปิดคำอวยพร ♡</button>';
    counter.insertAdjacentElement('afterend',card);
    card.querySelector('button').addEventListener('click',()=>showModal(kind));
  }

  function init(){
    injectStyle();
    applyBirthdayTheme();
    if(isBirthday(BIRTHDAYS.owner)) addBirthdayCard('owner','วันเกิดของพี่ 🎂');
    if(isBirthday(BIRTHDAYS.partner)) addBirthdayCard('partner','วันเกิดของหนู 🎂');
    if(isBirthday(BIRTHDAYS.owner)) setTimeout(()=>showModal('owner'),900);
    if(isBirthday(BIRTHDAYS.partner)) setTimeout(()=>showModal('partner'),900);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
