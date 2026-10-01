const catalog=[
 {title:"Horizonte",type:"Filme",year:2026,poster:"assets/poster1.jpg",video:"movies/horizonte.mp4"},
 {title:"Além da Noite",type:"Filme",year:2025,poster:"assets/poster2.jpg",video:"movies/alem-da-noite.mp4"},
 {title:"Distrito Zero",type:"Série",year:2026,poster:"assets/poster3.jpg",video:"movies/distrito-zero-ep1.mp4"},
 {title:"O Último Sinal",type:"Filme",year:2024,poster:"assets/poster4.jpg",video:"movies/o-ultimo-sinal.mp4"},
 {title:"Neon City",type:"Série",year:2025,poster:"assets/poster5.jpg",video:"movies/neon-city-ep1.mp4"},
 {title:"Viagem Estelar",type:"Filme",year:2026,poster:"assets/poster6.jpg",video:"movies/viagem-estelar.mp4"}
];

const $=s=>document.querySelector(s);
function card(item){const el=document.createElement("article");el.className="card";el.innerHTML=`<div class="poster">${item.title}</div><h3>${item.title}</h3><p>${item.type} · ${item.year}</p>`;el.onclick=()=>selectMovie(item);return el}
function render(list){$("#catalogGrid").replaceChildren(...list.map(card));$("#featured").replaceChildren(...list.slice(0,4).map(card))}
function selectMovie(item){$("#selectedMovie").textContent=`Selecionado: ${item.title} · ${item.type}`;$("#screen3d").querySelector("span").textContent=item.title.toUpperCase();$("#player").src=item.video;show("cinema")}
function show(id){document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));$("#"+id).classList.add("active");window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>show(b.dataset.view)));
$("#search").addEventListener("input",e=>{const q=e.target.value.toLowerCase();render(catalog.filter(x=>`${x.title} ${x.type}`.toLowerCase().includes(q)))});

const avatar=$("#avatar");let x=50,y=82;
function move(dx,dy){x=Math.max(5,Math.min(95,x+dx));y=Math.max(50,Math.min(92,y+dy));avatar.style.left=x+"%";avatar.style.bottom=(100-y)+"%"}
document.addEventListener("keydown",e=>{if(["INPUT","TEXTAREA"].includes(document.activeElement.tagName))return;const k=e.key.toLowerCase();if(k==="w"||k==="arrowup")move(0, -3);if(k==="s"||k==="arrowdown")move(0,3);if(k==="a"||k==="arrowleft")move(-3,0);if(k==="d"||k==="arrowright")move(3,0)});
document.querySelectorAll("[data-move]").forEach(b=>b.addEventListener("click",()=>{const d=b.dataset.move;if(d==="up")move(0,-3);if(d==="down")move(0,3);if(d==="left")move(-3,0);if(d==="right")move(3,0)}));
const seats=$("#seats");for(let i=0;i<24;i++){const s=document.createElement("button");s.className="seat";s.setAttribute("aria-label","Poltrona "+(i+1));s.onclick=()=>{avatar.style.left=(12+(i%8)*10.7)+"%";avatar.style.bottom=(35+Math.floor(i/8)*8)+"%";};seats.appendChild(s)}
render(catalog);