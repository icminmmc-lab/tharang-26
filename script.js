const events = [
{code:"G4",name:"Mime",type:"Group",time:"11:00 AM",venue:"Dr. APJ Audi",block:"St. Chavara Block 3rd F"},
{code:"G5",name:"Group Song",type:"Group",time:"11:00 AM",venue:"Vivekananda Hall",block:"St. Chavara Block 1st F"},
{code:"G8",name:"Rangoli",type:"Group",time:"11:00 AM",venue:"Corridor",block:"St. Mary GF"},
{code:"G9",name:"Flameless Cooking",type:"Group",time:"11:00 AM",venue:"Mother Teresa",block:"St. Joseph GF"},
{code:"G7",name:"Bridal Makeup",type:"Group",time:"11:30 AM",venue:"J-203 & 204",block:"St. Joseph 2nd F"},
{code:"G2",name:"Meet the Beat",type:"Group",time:"12:00 PM",venue:"Dr. APJ Audi",block:"St. Chavara Block 3rd F"},
{code:"G6",name:"Mehandi",type:"Group",time:"12:00 PM",venue:"M-010 & M-011",block:"St. Mary GF"},
{code:"G10",name:"Face Painting",type:"Group",time:"12:00 PM",venue:"M-02",block:"St. Mary GF"},
{code:"G3",name:"Social Walk",type:"Group",time:"12:30 PM",venue:"Dr. APJ Audi",block:"St. Chavara Block 3rd F"},
{code:"G1",name:"Group Dance",type:"Group",time:"1:30 PM",venue:"Dr. APJ Audi",block:"St. Chavara Block 3rd F"},
{code:"I1",name:"Extempore - Tamil / English",type:"Individual",time:"11:00 AM",venue:"Tagore Hall",block:"St. Joseph 3rd F"},
{code:"I2",name:"Doodle Art",type:"Individual",time:"11:00 AM",venue:"J-217",block:"St. Joseph 2nd F"},
{code:"I6",name:"Photography",type:"Individual",time:"11:00 AM",venue:"CS - (LAB)",block:"St. Joseph GF"},
{code:"I5",name:"Solo Dance - Contemporary",type:"Individual",time:"11:30 AM",venue:"Dr. APJ Audi",block:"St. Joseph GF"},
{code:"I3",name:"Cartoon Sketching",type:"Individual",time:"12:00 PM",venue:"J-203",block:"St. Joseph 2nd F"},
{code:"I4",name:"Vegetable Carving",type:"Individual",time:"12:00 PM",venue:"J-202",block:"St. Joseph 2nd F"},
{code:"O1",name:"Mannequin Challenge",type:"Online",time:"Online Entry",venue:"Online Entry",block:"—"},
{code:"O2",name:"Reel Making",type:"Online",time:"Online Entry",venue:"Sir C.V. Raman Theatre",block:"—"},
{code:"O3",name:"Short Film",type:"Online",time:"Online Entry",venue:"Online Entry",block:"—"},
{code:"O4",name:"Ad Making",type:"Online",time:"Online Entry",venue:"Online Entry",block:"—"}
];

let currentFilter="All";
const searchInput=document.getElementById("searchInput");
const eventList=document.getElementById("eventList");
const eventCount=document.getElementById("eventCount");
const detailView=document.getElementById("detailView");
const listView=eventList.parentElement;
const detailCard=document.getElementById("detailCard");

function esc(v){
  return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;")
    .replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}

function render(){
  const q=searchInput.value.trim().toLowerCase();
  const filtered=events.filter(e=>
    (currentFilter==="All"||e.type===currentFilter) &&
    (!q||e.name.toLowerCase().includes(q)||e.code.toLowerCase().includes(q))
  );

  eventCount.textContent=`${filtered.length} event${filtered.length===1?"":"s"}`;

  if(!filtered.length){
    eventList.innerHTML='<div class="empty">No matching events found.</div>';
    return;
  }

  eventList.innerHTML=filtered.map(e=>{
    const i=events.indexOf(e);
    return `<article class="event-card" tabindex="0" data-index="${i}">
      <div class="event-code">${esc(e.code)} · ${esc(e.type.toUpperCase())} EVENT</div>
      <div class="event-name">${esc(e.name)}</div>
      <div class="event-meta">
        <span class="pill">🕒 ${esc(e.time)}</span>
        <span class="pill">📍 ${esc(e.venue)}</span>
      </div>
    </article>`;
  }).join("");

  document.querySelectorAll(".event-card").forEach(card=>{
    card.addEventListener("click",()=>showEvent(Number(card.dataset.index)));
    card.addEventListener("keydown",e=>{
      if(e.key==="Enter"||e.key===" "){
        e.preventDefault();
        showEvent(Number(card.dataset.index));
      }
    });
  });
}

function showEvent(i){
  const e=events[i];

  eventList.classList.add("hidden");
  document.querySelector(".section-heading").classList.add("hidden");
  document.querySelector(".tabs").classList.add("hidden");
  document.querySelector(".search-box").classList.add("hidden");
  detailView.classList.remove("hidden");

  detailCard.innerHTML=`
    <div class="detail-top">
      <div class="detail-code">${esc(e.code)} · ${esc(e.type.toUpperCase())} EVENT</div>
      <div class="detail-name">${esc(e.name)}</div>
    </div>
    <div class="detail-body">
      <div class="info-row">
        <div class="info-icon">🕒</div>
        <div><div class="info-label">Time / Mode</div><div class="info-value">${esc(e.time)}</div></div>
      </div>
      <div class="info-row">
        <div class="info-icon">📍</div>
        <div><div class="info-label">Room / Venue</div><div class="info-value">${esc(e.venue)}</div></div>
      </div>
      <div class="info-row">
        <div class="info-icon">🏫</div>
        <div><div class="info-label">Block / Floor</div><div class="info-value">${esc(e.block)}</div></div>
      </div>
      <div class="info-row">
        <div class="info-icon">📅</div>
        <div><div class="info-label">Competition Date</div><div class="info-value">09 October 2026</div></div>
      </div>
      <div class="notice">Please reach your venue before the scheduled event time.</div>
    </div>`;
  window.scrollTo({top:0,behavior:"smooth"});
}

document.getElementById("backButton").addEventListener("click",()=>{
  detailView.classList.add("hidden");
  eventList.classList.remove("hidden");
  document.querySelector(".section-heading").classList.remove("hidden");
  document.querySelector(".tabs").classList.remove("hidden");
  document.querySelector(".search-box").classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
});

document.querySelectorAll(".tab").forEach(button=>{
  button.addEventListener("click",()=>{
    document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));
    button.classList.add("active");
    currentFilter=button.dataset.filter;
    render();
  });
});

searchInput.addEventListener("input",render);
render();
