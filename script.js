
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced && 'IntersectionObserver' in window){document.body.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.09});document.querySelectorAll('.appear').forEach(el=>observer.observe(el));}
const tabs=[...document.querySelectorAll('[data-tab]')];function activate(t){tabs.forEach(b=>{const on=b===t;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1;const p=document.getElementById('panel-'+b.dataset.tab);p.classList.toggle('hidden',!on);if(on)p.classList.add('visible')})}tabs.forEach((t,i)=>{t.addEventListener('click',()=>activate(t));t.addEventListener('keydown',e=>{let j;if(e.key==='ArrowRight')j=(i+1)%tabs.length;if(e.key==='ArrowLeft')j=(i+tabs.length-1)%tabs.length;if(e.key==='Home')j=0;if(e.key==='End')j=tabs.length-1;if(j!==undefined){e.preventDefault();activate(tabs[j]);tabs[j].focus()}})});
document.querySelectorAll('[data-interest]').forEach(a=>a.addEventListener('click',()=>{document.getElementById('service').value=a.dataset.interest}));
const WHATSAPP_NUMBER = '573116760185';
let summary='';
const status=document.getElementById('status'),copy=document.getElementById('copy');
document.getElementById('brief').addEventListener('submit',e=>{
  e.preventDefault();
  const need=document.getElementById('need');
  if(!need.value.trim()) {need.setCustomValidity('Describe brevemente tu necesidad.');need.reportValidity();return;}
  summary='Hola SAO, quiero consultar una solución.\nServicio: '+document.getElementById('service').value+'\nNecesidad: '+need.value.trim();
  const url='https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(summary);
  const opened=window.open(url,'_blank','noopener,noreferrer');
  status.replaceChildren();
  const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.className='text-link';link.textContent='Abrir mi consulta en WhatsApp ↗';
  status.append('Tu consulta está preparada. Si WhatsApp no se abrió, ',link);
  status.classList.remove('hidden');copy.classList.remove('hidden');
});
document.getElementById('need').addEventListener('input',e=>e.target.setCustomValidity(''));
copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(summary);status.textContent='Resumen copiado.'}catch{status.textContent=summary;status.style.whiteSpace='pre-wrap'}});
document.getElementById('year').textContent=new Date().getFullYear();
let scheduled=false;addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.progress').style.width=(max>0?scrollY/max*100:0)+'%';scheduled=false})}},{passive:true});
