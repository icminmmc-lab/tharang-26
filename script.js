const events = [
  ["G4","Mime","Group","11:00 AM","Dr. APJ Audi","St. Chavara Block 3rd F"],
  ["G5","Group Song","Group","11:00 AM","Vivekananda Hall","St. Chavara Block 1st F"],
  ["G8","Rangoli","Group","11:00 AM","Corridor","St. Mary GF"],
  ["G9","Flameless Cooking","Group","11:00 AM","Mother Teresa","St. Joseph GF"],
  ["G7","Bridal Makeup","Group","11:30 AM","J-203 & 204","St. Joseph 2nd F"],
  ["G2","Meet the Beat","Group","12:00 PM","Dr. APJ Audi","St. Chavara Block 3rd F"],
  ["G6","Mehandi","Group","12:00 PM","M-010 & M-011","St. Mary GF"],
  ["G10","Face Painting","Group","12:00 PM","M-02","St. Mary GF"],
  ["G3","Social Walk","Group","12:30 PM","Dr. APJ Audi","St. Chavara Block 3rd F"],
  ["G1","Group Dance","Group","1:30 PM","Dr. APJ Audi","St. Chavara Block 3rd F"],

  ["I1","Extempore - Tamil / English","Individual","11:00 AM","Tagore Hall","St. Joseph 3rd F"],
  ["I2","Doodle Art","Individual","11:00 AM","J-217","St. Joseph 2nd F"],
  ["I6","Photography","Individual","11:00 AM","CS - (LAB)","St. Joseph GF"],
  ["I5","Solo Dance - Contemporary","Individual","11:30 AM","Dr. APJ Audi","St. Joseph GF"],
  ["I3","Cartoon Sketching","Individual","12:00 PM","J-203","St. Joseph 2nd F"],
  ["I4","Vegetable Carving","Individual","12:00 PM","J-202","St. Joseph 2nd F"],

 
];

let filter = "All";

const search = document.getElementById("search");
const eventList = document.getElementById("eventList");
const count = document.getElementById("count");
const home = document.getElementById("home");
const details = document.getElementById("details");
const detailsContent = document.getElementById("detailsContent");

function safe(text){
  return String(text).replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",
    '"':"&quot;","'":"&#039;"
  }[char]));
}

function render(){
  const q = search.value.trim().toLowerCase();

  const results = events
    .map((event,index)=>({event,index}))
    .filter(({event})=>{
      const typeOK = filter === "All" || event[2] === filter;
      const searchOK =
        !q ||
        event[0].toLowerCase().includes(q) ||
        event[1].toLowerCase().includes(q);
      return typeOK && searchOK;
    });

  count.textContent = `${results.length} event${results.length===1?"":"s"}`;

  if(!results.length){
    eventList.innerHTML =
      `<div class="empty">No events found.<br>Try another event name or code.</div>`;
    return;
  }

  eventList.innerHTML = results.map(({event,index})=>`
    <article class="event-card" data-index="${index}">
      <div class="code-box">${safe(event[0])}</div>
      <div class="event-main">
        <div class="event-type">${safe(event[2].toUpperCase())} EVENT</div>
        <div class="event-name">${safe(event[1])}</div>
        <div class="event-meta">🕒 ${safe(event[3])} &nbsp; • &nbsp; 📍 ${safe(event[4])}</div>
      </div>
      <div class="arrow">›</div>
    </article>
  `).join("");

  document.querySelectorAll(".event-card").forEach(card=>{
    card.addEventListener("click",()=>{
      showEvent(Number(card.dataset.index));
    });
  });
}

function showEvent(index){
  const e = events[index];

  detailsContent.innerHTML = `
    <div class="detail-hero">
      <div class="detail-code">${safe(e[0])} · ${safe(e[2].toUpperCase())} EVENT</div>
      <div class="detail-name">${safe(e[1])}</div>
      <span class="detail-badge">THARANG'26 · 09 OCTOBER 2026</span>
    </div>

    <div class="info">
      <div class="info-row">
        <div class="info-icon">🕒</div>
        <div>
          <div class="label">Time / Mode</div>
          <div class="value">${safe(e[3])}</div>
        </div>
      </div>

      <div class="info-row">
        <div class="info-icon">📍</div>
        <div>
          <div class="label">Venue / Room</div>
          <div class="value">${safe(e[4])}</div>
        </div>
      </div>

      <div class="info-row">
        <div class="info-icon">🏫</div>
        <div>
          <div class="label">Block / Floor</div>
          <div class="value">${safe(e[5])}</div>
        </div>
      </div>

      <div class="info-row">
        <div class="info-icon">📅</div>
        <div>
          <div class="label">Competition Date</div>
          <div class="value">09-10-2026</div>
        </div>
      </div>
    </div>

    <button class="map-button" type="button">
      VIEW VENUE ON CAMPUS MAP
    </button>
  `;

  home.classList.add("hidden");
  details.classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
}

document.getElementById("back").addEventListener("click",()=>{
  details.classList.add("hidden");
  home.classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
});

document.querySelectorAll(".filter").forEach(button=>{
  button.addEventListener("click",()=>{
    document.querySelectorAll(".filter")
      .forEach(b=>b.classList.remove("active"));

    button.classList.add("active");
    filter = button.dataset.filter;
    render();
  });
});

search.addEventListener("input",render);

render();
