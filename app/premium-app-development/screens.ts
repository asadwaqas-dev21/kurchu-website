/**
 * Phone-screen mockups shown inside the 3D devices.
 *
 * Each screen is a pure function returning static markup (no user input is
 * ever interpolated), styled by the `.ui` rules in premium.css. `id` makes the
 * SVG gradient ids unique per device instance.
 */

export type ScreenName =
  | "novaHome"
  | "novaTransfer"
  | "novaInsights"
  | "lumenHome"
  | "lumenBooking"
  | "moveMap"
  | "moveLive"
  | "arcaDiscover"
  | "arcaProduct"
  | "arcaCheckout"
  | "evolve";

const ICONS: Record<string, string> = {
  bell: '<path d="M6 16v-5a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  fwd: '<path d="M9 5l7 7-7 7"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  trend: '<path d="M4 16l6-6 4 4 6-6M14 8h6v6"/>',
  cal: '<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M9 3v4M15 3v4"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  home: '<path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8Z"/>',
  doc: '<path d="M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 1 1 14 0c0 5.8-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="3"/><path d="M16 10l5-3v10l-5-3"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  msg: '<path d="M4 5h16v11H9l-5 4V5Z"/>',
  share: '<path d="M12 3v12M7 8l5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4"/>',
  bag: '<path d="M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
};

const ic = (name: string) =>
  `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;

const statusBar = () =>
  '<div class="sb"><span class="sb-t">9:41</span><span class="sb-i">' +
  '<svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx=".8"/><rect x="5" y="5.5" width="3" height="6.5" rx=".8"/><rect x="10" y="3" width="3" height="9" rx=".8"/><rect x="15" y="0" width="3" height="12" rx=".8"/></svg>' +
  '<svg viewBox="0 0 16 12"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .4C5.3.4 2.7 1.5.8 3.3L2 4.6a8.6 8.6 0 0 1 6-2.4Zm0 3.6c1.4 0 2.6.5 3.6 1.4l1.2-1.3A7 7 0 0 0 8 4a7 7 0 0 0-4.8 1.9l1.2 1.3c1-.9 2.2-1.4 3.6-1.4Zm0 3.5c-.7 0-1.3.3-1.8.7L8 12l1.8-1.9c-.5-.5-1.1-.8-1.8-.8Z"/></svg>' +
  '<svg viewBox="0 0 27 12"><rect x=".5" y=".5" width="23" height="11" rx="3.2" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="17" height="8" rx="2"/><path d="M25 4v4c.8-.3 1.3-1.1 1.3-2S25.8 4.3 25 4Z" opacity=".4"/></svg>' +
  "</span></div>";

const homeIndicator = '<div class="hi"></div>';

/* ---------- Nova Pay (fintech) ---------- */

function novaChart(gradId: string) {
  const d = "M0 66 C30 62 42 44 74 47 S118 66 150 42 S205 22 236 33 S290 12 350 16";
  return (
    `<svg viewBox="0 0 350 84"><defs><linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CBF36B" stop-opacity=".28"/><stop offset="1" stop-color="#CBF36B" stop-opacity="0"/></linearGradient></defs>` +
    '<path d="M0 20H350M0 48H350M0 76H350" stroke="rgba(255,255,255,.06)"/>' +
    `<path d="${d} L350 84 L0 84Z" fill="url(#${gradId})"/>` +
    `<path class="nv-line" d="${d}"/><circle cx="350" cy="16" r="4.5" fill="#CBF36B"/><circle cx="350" cy="16" r="10" fill="#CBF36B" opacity=".18"/></svg>`
  );
}

function novaHome(id: string) {
  const tx = [
    ["BC", "Bloom Coffee", "Today · 08:42", "−£4.20", "#232A1B", "#CBF36B"],
    ["OL", "Orbit Ltd · Salary", "Yesterday", "+£3,200.00", "#1D2A22", "#6FD39B"],
    ["MT", "Metro Transit", "Mon · 18:10", "−£2.80", "#22252B", "#9DB4FF"],
  ];
  const rows = tx
    .map(
      (t) =>
        `<li><i style="background:${t[4]};color:${t[5]}">${t[0]}</i><div><b>${t[1]}</b><small>${t[2]}</small></div><span${t[3][0] === "+" ? ' style="color:#CBF36B"' : ""}>${t[3]}</span></li>`,
    )
    .join("");
  return (
    '<div class="ui s-nova">' +
    statusBar() +
    `<div class="nv-head"><div class="nv-av"><span>AK</span></div><div class="nv-hi"><small>Good evening</small><b>Amira Khan</b></div><div class="nv-ic">${ic("bell")}</div></div>` +
    `<div class="nv-bal"><small>Total balance · GBP</small><div class="nv-amt">£12,480<span>.56</span></div><div class="nv-delta">${ic("trend")}+£298.40 this month</div></div>` +
    '<div class="nv-card"><div class="nv-card-row"><b>nova</b><span class="nv-chip"></span></div><div class="nv-card-num">•••• •••• •••• 4417</div><div class="nv-card-row nv-card-foot"><span>AMIRA KHAN</span><span>09/29</span></div></div>' +
    `<div class="nv-acts"><div><i>${ic("up")}</i><span>Send</span></div><div><i>${ic("down")}</i><span>Request</span></div><div><i>${ic("plus")}</i><span>Top up</span></div><div><i>${ic("grid")}</i><span>More</span></div></div>` +
    '<div class="nv-sec"><b>Spending</b><span>October · £1,842</span></div>' +
    `<div class="nv-chart">${novaChart(id)}</div>` +
    `<ul class="nv-tx">${rows}</ul>` +
    homeIndicator +
    "</div>"
  );
}

function novaTransfer() {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "←"];
  return (
    '<div class="ui s-nova">' +
    statusBar() +
    `<div class="topbar"><span class="rb">${ic("back")}</span><b>Send money</b><span class="rb">${ic("more")}</span></div>` +
    '<div class="nv-to"><div class="nv-av"><span>OR</span></div><b>Omar Rahman</b><small>Account ••2190 · EUR</small></div>' +
    '<div class="nv-big">£250<span></span></div>' +
    '<div class="nv-note">They receive <b>€289.12</b> · No fee</div>' +
    '<span class="nv-pill">GBP → EUR · 1.1565</span>' +
    `<div class="nv-pad">${keys.map((k) => `<span>${k}</span>`).join("")}</div>` +
    '<div class="nv-btn"><span>Send £250</span></div>' +
    homeIndicator +
    "</div>"
  );
}

function novaInsights() {
  const circumference = 2 * Math.PI * 50;
  let offset = 0;
  const segments: Array<[number, string]> = [
    [32, "#CBF36B"],
    [26, "#6FD39B"],
    [18, "#9DB4FF"],
    [14, "#F2D7B6"],
    [10, "#4A5048"],
  ];
  const rings = segments
    .map(([pct, color]) => {
      const len = (circumference * pct) / 100;
      const el = `<circle cx="60" cy="60" r="50" fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round" stroke-dasharray="${(len - 7).toFixed(1)} ${circumference.toFixed(1)}" stroke-dashoffset="${(-offset).toFixed(1)}"/>`;
      offset += len;
      return el;
    })
    .join("");
  const cats = [
    ["Groceries", "£589", "32%", "#CBF36B"],
    ["Bills", "£479", "26%", "#6FD39B"],
    ["Transport", "£332", "18%", "#9DB4FF"],
    ["Dining", "£258", "14%", "#F2D7B6"],
  ];
  return (
    '<div class="ui s-nova">' +
    statusBar() +
    `<div class="topbar"><b style="font-size:2.6em;letter-spacing:-.04em">Insights</b><span class="rb">${ic("cal")}</span></div>` +
    '<div class="nv-tabs"><span>Week</span><span class="on">Month</span><span>Year</span></div>' +
    `<div class="nv-donut"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="none" stroke="#151815" stroke-width="12"/>${rings}</svg><div><small>Spent in October</small><b>£1,842</b></div></div>` +
    `<ul class="nv-cats">${cats
      .map(
        (c) =>
          `<li><i style="background:${c[3]}"></i><b>${c[0]}</b><span>${c[1]}</span><em style="--p:${c[2]};--c:${c[3]}"></em></li>`,
      )
      .join("")}</ul>` +
    homeIndicator +
    "</div>"
  );
}

/* ---------- Lumen Health ---------- */

function lumenHome() {
  const bars = [50, 64, 42, 78, 70, 88, 60]
    .map((h, i) => `<i${i === 5 ? ' class="on"' : ""} style="height:${h}%"></i>`)
    .join("");
  return (
    '<div class="ui s-lumen">' +
    statusBar() +
    '<div class="lm-head"><div><small>Thursday, 12 November</small><h5>Good morning,<br>Daniel</h5></div><div class="lm-av">DW</div></div>' +
    `<div class="lm-appt"><small>Next appointment · in 2h 15m</small><h6>Dr. Sara Malik</h6><p>Cardiology · Video consultation</p><div class="lm-row"><span>${ic("cal")}Thu 12</span><span>${ic("clock")}10:30</span><em>Join</em></div></div>` +
    `<div class="lm-vitals"><div><small>Heart rate</small><b>64 <span>bpm</span></b><svg viewBox="0 0 100 34"><path d="M0 20 H22 L27 8 L33 30 L38 14 L42 20 H60 L65 6 L71 30 L75 20 H100" fill="none" stroke="#1C5D58" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg></div><div><small>Sleep</small><b>7h 20m</b><div class="lm-bars">${bars}</div></div></div>` +
    '<div class="lm-sec"><b>Specialists for you</b><span>See all</span></div>' +
    '<ul class="lm-docs"><li><div class="lm-av" style="background:linear-gradient(135deg,#E8D5C4,#C9A88C)">AK</div><div><b>Dr. Amir Karimi</b><small>Dermatology · ★ 4.9</small></div><span>Today<br>16:00</span></li>' +
    '<li><div class="lm-av" style="background:linear-gradient(135deg,#D6DCEB,#9FAACB)">LO</div><div><b>Dr. Lena Ortiz</b><small>Physiotherapy · ★ 4.8</small></div><span>Fri<br>09:15</span></li></ul>' +
    `<div class="lm-tabs"><span class="on">${ic("home")}Home</span><span>${ic("cal")}Book</span><span>${ic("doc")}Records</span><span>${ic("user")}Profile</span></div>` +
    homeIndicator +
    "</div>"
  );
}

function lumenBooking() {
  const days: Array<[string, number]> = [
    ["Mon", 9],
    ["Tue", 10],
    ["Wed", 11],
    ["Thu", 12],
    ["Fri", 13],
    ["Sat", 14],
    ["Sun", 15],
  ];
  const times = [
    ["09:00", "off"],
    ["09:30", ""],
    ["10:30", "on"],
    ["11:00", ""],
    ["14:00", "off"],
    ["15:30", ""],
  ];
  return (
    '<div class="ui s-lumen">' +
    statusBar() +
    `<div class="topbar"><span class="rb" style="background:#fff">${ic("back")}</span><b>Book appointment</b><span class="rb"></span></div>` +
    '<div class="lm-doc"><div class="lm-av">SM</div><div><b>Dr. Sara Malik</b><small>Cardiology · Crescent Clinic</small></div></div>' +
    `<div class="lm-month"><b>November 2026</b><span>${ic("back")}${ic("fwd")}</span></div>` +
    `<div class="lm-week">${days
      .map(([d, n]) => `<span class="${n === 12 ? "on" : n > 13 ? "off" : ""}">${d}<b>${n}</b></span>`)
      .join("")}</div>` +
    '<div class="lm-sec"><b>Available times</b><span>4 left</span></div>' +
    `<div class="lm-times">${times.map(([t, c]) => `<span class="${c}">${t}</span>`).join("")}</div>` +
    '<div class="lm-sec"><b>Consultation</b><span>45 min</span></div>' +
    `<div class="lm-seg"><span>${ic("pin")}In person</span><span class="on">${ic("video")}Video</span></div>` +
    '<div class="lm-cta"><span>Confirm · Thu 12, 10:30</span></div>' +
    homeIndicator +
    "</div>"
  );
}

/* ---------- Move (mobility) ---------- */

function moveMapSvg(live: boolean) {
  const route = "M70 430 V320 Q70 300 90 300 H240 Q260 300 260 280 V140 Q260 120 280 120 H330";
  const car = live
    ? `<g><circle r="13" fill="#FFC24B" opacity=".22"/><circle r="7" fill="#F2F1EE" stroke="#FFC24B" stroke-width="3"/><animateMotion dur="11s" repeatCount="indefinite" rotate="auto" keyPoints="0.18;0.92" keyTimes="0;1" calcMode="linear" path="${route}"/></g>`
    : '<g fill="#F2F1EE" opacity=".85"><rect x="150" y="294" width="14" height="9" rx="3"/><rect x="254" y="200" width="9" height="14" rx="3"/><rect x="40" y="206" width="14" height="9" rx="3"/><rect x="330" y="396" width="14" height="9" rx="3"/></g>';
  return (
    '<svg viewBox="0 0 390 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
    '<rect width="390" height="560" fill="#15181C"/>' +
    '<path d="M-10 470 C80 440 140 500 230 470 S360 430 400 450 L400 560 L-10 560Z" fill="#0F1922"/>' +
    '<rect x="282" y="170" width="70" height="96" rx="10" fill="#17221B"/><rect x="96" y="326" width="132" height="58" rx="10" fill="#1A1D22"/><rect x="96" y="136" width="132" height="58" rx="10" fill="#191C21"/>' +
    '<g fill="none" stroke="#22262C" stroke-linecap="round"><path d="M70 -10 V580" stroke-width="16"/><path d="M260 -10 V580" stroke-width="16"/><path d="M-10 300 H400" stroke-width="16"/><path d="M-10 120 H400" stroke-width="16"/><path d="M-30 -10 L420 390" stroke-width="11"/></g>' +
    '<g fill="none" stroke="#1C2025" stroke-width="7"><path d="M165 -10 V580"/><path d="M-10 210 H400"/><path d="M-10 400 H400"/><path d="M350 -10 V580"/></g>' +
    `<path d="${route}" fill="none" stroke="#FFC24B" stroke-opacity=".16" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="${route}" fill="none" stroke="#FFC24B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"${live ? "" : ' stroke-dasharray="2 9"'}/>` +
    '<circle cx="70" cy="430" r="9" fill="#111316" stroke="#FFC24B" stroke-width="4"/>' +
    `<rect x="321" y="111" width="18" height="18" rx="5" fill="#F2F1EE"/>${car}</svg>`
  );
}

function moveMap() {
  const opt = (on: boolean, name: string, sub: string, price: string) =>
    `<div class="mv-opt${on ? " on" : ""}"><span class="mv-car"></span><div><b>${name}</b><small>${sub}</small></div><span>${price}</span></div>`;
  return (
    `<div class="ui s-move"><div class="mv-map">${moveMapSvg(false)}</div><div class="mv-over">${statusBar()}` +
    '<div class="mv-search"><div><i></i><span><small>Pickup</small><b>12 Canal Street</b></span></div><div><i></i><span><small>Drop-off</small><b>Union Station</b></span></div></div>' +
    '<div class="mv-sheet"><div class="mv-grab"></div><h6>Choose a ride</h6>' +
    opt(true, "Move", "4 min away · 3 seats", "£14.20") +
    opt(false, "Comfort", "6 min · extra legroom", "£18.90") +
    opt(false, "XL", "9 min · 6 seats", "£24.10") +
    `<div class="mv-cta"><span>Confirm Move</span></div></div></div>${homeIndicator}</div>`
  );
}

function moveLive() {
  return (
    `<div class="ui s-move"><div class="mv-map">${moveMapSvg(true)}</div><div class="mv-over">${statusBar()}` +
    '<div class="mv-banner"><div><small>Arriving in</small><br><b>3 min</b></div><div style="text-align:right"><small>Union Station</small><br><b style="font-size:1.5em">18:42</b></div></div>' +
    '<div class="mv-sheet"><div class="mv-grab"></div>' +
    '<div class="mv-driver"><span class="av">JM</span><div><b>Jonas M.</b><small>★ 4.96 · Prius · Graphite</small></div><span class="mv-plate">LK70 MVE</span></div>' +
    '<div class="mv-prog"><i class="on"></i><i class="on"></i><i class="now"></i><i></i></div>' +
    '<div class="mv-meta"><span>Picked up 18:31</span><span>2.4 km left</span></div>' +
    `<div class="mv-acts"><span>${ic("phone")}Call</span><span>${ic("msg")}Message</span><span>${ic("share")}Share</span></div>` +
    `</div></div>${homeIndicator}</div>`
  );
}

/* ---------- Arca (marketplace) ---------- */

const arcaItem = (obj: string, name: string, maker: string, price: string) =>
  `<div class="ar-item"><div class="img"><span class="obj ${obj}"></span></div><b>${name}</b><small>${maker}<span>${price}</span></small></div>`;

function arcaDiscover() {
  return (
    '<div class="ui s-arca">' +
    statusBar() +
    `<div class="ar-top"><span class="ar-logo">ARCA</span><span>${ic("search")}${ic("bag")}</span></div>` +
    '<h5 class="ar-h">Objects for<br><em>slow living</em></h5>' +
    '<div class="ar-cats"><span class="on">All</span><span>Ceramics</span><span>Lighting</span><span>Textiles</span></div>' +
    `<div class="ar-grid">${arcaItem("obj-vase", "Oslo Vessel", "Studio Vale", "£180")}${arcaItem("obj-lamp", "Halo Lamp", "Kiln &amp; Co", "£320")}${arcaItem("obj-bowl", "Tide Bowl", "Mareo", "£64")}${arcaItem("obj-throw", "Fold Throw", "Wefts", "£140")}</div>` +
    homeIndicator +
    "</div>"
  );
}

function arcaProduct() {
  return (
    '<div class="ui s-arca">' +
    statusBar() +
    `<div class="ar-top"><span>${ic("back")}</span><span class="ar-logo">ARCA</span><span>${ic("bag")}</span></div>` +
    `<div class="ar-hero"><div class="obj obj-vase"></div><span class="fav">${ic("heart")}</span><div class="ar-dots"><i class="on"></i><i></i><i></i></div></div>` +
    '<div class="ar-pd"><small>Studio Vale · Lisbon</small><h6>Oslo Vessel</h6><div class="row"><b>£180</b><div class="ar-sw"><i class="on" style="background:#D9CDB9"></i><i style="background:#3E4A47"></i><i style="background:#A6533A"></i></div></div><p>Hand-thrown stoneware with a raw foot and satin glaze. Each piece is slightly different.</p></div>' +
    '<div class="ar-cta"><span>Add to bag</span><span>£180</span></div>' +
    homeIndicator +
    "</div>"
  );
}

function arcaCheckout() {
  return (
    '<div class="ui s-arca">' +
    statusBar() +
    `<div class="topbar"><span class="rb">${ic("back")}</span><b>Checkout</b><span class="rb"></span></div>` +
    '<ul class="ar-lines"><li><span class="th"><span class="obj obj-vase"></span></span><div><b>Oslo Vessel</b><small>Sand · Qty 1</small></div><span>£180</span></li>' +
    '<li><span class="th"><span class="obj obj-bowl"></span></span><div><b>Tide Bowl</b><small>Ink · Qty 1</small></div><span>£64</span></li></ul>' +
    '<div class="ar-ship"><i></i><div><b>Express delivery</b><small>Thu 12 Nov · insured</small></div><span>Free</span></div>' +
    '<div class="ar-box"><div class="r"><span>Subtotal</span><span>£244.00</span></div><div class="r"><span>Delivery</span><span>£0.00</span></div><div class="r t"><span>Total</span><span>£244.00</span></div></div>' +
    `<div class="ar-cta"><span>${ic("lock")}Pay £244.00</span><span>${ic("fwd")}</span></div>` +
    homeIndicator +
    "</div>"
  );
}

/* ---------- Idea → product (scroll-driven evolution) ---------- */

function sketchSvg() {
  const circle = (x: number, y: number, r: number) =>
    `M${x - r} ${y} c0 -${r * 0.58} ${r * 0.45} -${r} ${r} -${r} c${r * 0.6} 0 ${r * 1.02} ${r * 0.45} ${r} ${r} c-.02 ${r * 0.6} -${r * 0.5} ${r * 1.02} -${r * 1.04} ${r * 0.98} c-${r * 0.55} 0 -${r * 0.98} -${r * 0.5} -${r * 0.96} -${r * 1.02}`;
  return (
    '<svg viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">' +
    `<path class="stroke" d="${circle(76, 112, 20)}"/>` +
    '<path class="stroke" d="M112 104 q40 -3 86 1 M112 124 q28 2 56 -1"/>' +
    '<path class="stroke" d="M334 112 q0 -16 14 -16 q14 0 14 16 v8 h-28z"/>' +
    '<text x="40" y="206" font-size="52">£12,480</text>' +
    '<path class="stroke" d="M40 220 q70 7 160 -3"/>' +
    '<path class="stroke" d="M40 254 q150 -7 312 2 q6 84 -2 172 q-152 7 -310 -2 q-7 -86 0 -172z"/>' +
    '<path class="stroke" d="M66 290 q20 -2 40 1 M66 386 q70 3 150 -2 M300 384 q16 -1 30 2"/>' +
    `<path class="stroke" d="${circle(78, 494, 26)}"/><path class="stroke" d="${circle(156, 494, 26)}"/><path class="stroke" d="${circle(234, 494, 26)}"/><path class="stroke" d="${circle(312, 494, 26)}"/>` +
    '<text x="58" y="550" font-size="22">send</text><text x="132" y="550" font-size="22">req</text><text x="218" y="550" font-size="22">top</text><text x="294" y="550" font-size="22">more</text>' +
    '<path class="stroke" d="M40 664 q30 -22 60 -8 t60 -18 t60 12 t60 -32 t60 -12"/><path class="stroke" d="M40 690 q150 4 312 -1"/>' +
    '<path class="stroke" d="M42 722 h30 v30 h-30z M88 732 q80 3 150 -1 M300 740 q24 -1 48 1"/>' +
    '<path class="stroke" d="M42 774 h30 v30 h-30z M88 784 q70 3 130 -1 M300 792 q24 -1 48 1"/>' +
    '<path class="note" d="M44 492 c-2 -40 72 -40 70 0 c-2 38 -72 38 -70 0"/>' +
    '<text class="blue" x="118" y="452" font-size="26">1-tap send!</text>' +
    '<path class="note" d="M360 236 q4 -40 -40 -54 M320 182 l12 -4 M320 182 l6 10"/>' +
    '<text class="blue" x="230" y="170" font-size="26">calm, premium</text>' +
    "</svg>"
  );
}

function evolve(id: string) {
  return (
    '<div class="ev">' +
    `<div class="ev-l ev-sketch on" data-i="0">${sketchSvg()}</div>` +
    '<div class="ev-l ev-wire" data-i="1">' +
    '<div style="display:flex;gap:1em;align-items:center"><div class="b" style="width:4.2em;height:4.2em;border-radius:50%;flex:none"></div><div style="flex:1;display:flex;flex-direction:column;gap:.6em"><div class="b" style="height:1em;width:40%"></div><div class="b" style="height:1.4em;width:62%"></div></div></div>' +
    '<div class="b" style="height:9em"><small>Balance</small></div>' +
    '<div class="b x" style="height:16em"><small>Card</small></div>' +
    '<div class="row"><div class="b"></div><div class="b"></div><div class="b"></div><div class="b"></div></div>' +
    '<div class="b" style="height:8em"><small>Spending chart</small></div>' +
    '<div class="b" style="height:4.6em"></div><div class="b" style="height:4.6em"></div>' +
    "</div>" +
    '<div class="ev-l ev-ds" data-i="2">' +
    '<div><span class="lbl">Colour</span><div class="sw"><i style="background:#CBF36B"></i><i style="background:#6FD39B"></i><i style="background:#0A0C0B"></i><i style="background:#232823"></i><i style="background:#EEF0EA"></i></div></div>' +
    '<div><span class="lbl">Type</span><div class="ty"><b>Aa</b><div><span>Display 43/45</span><span>Title 20/26</span><span>Body 15/22</span></div></div></div>' +
    '<div><span class="lbl">Components</span><div class="bt"><span>Send</span><span>Request</span></div></div>' +
    '<div><span class="lbl">Radius</span><div class="rad"><i style="border-top-left-radius:.8em"></i><i style="border-top-left-radius:1.6em"></i><i style="border-top-left-radius:2.6em"></i></div></div>' +
    '<div><span class="lbl">Spacing</span><div class="sp"><i style="height:.4em"></i><i style="height:.8em"></i><i style="height:1.6em"></i><i style="height:2.4em"></i><i style="height:3.2em"></i><i style="height:4.8em"></i></div></div>' +
    "</div>" +
    `<div class="ev-l ev-proto" data-i="3">${novaHome(id + "p")}<span class="ev-tap"></span><span class="ev-flow">→ Send flow</span></div>` +
    `<div class="ev-l ev-eng" data-i="4">${novaHome(id + "e")}</div>` +
    `<div class="ev-l" data-i="5">${novaHome(id + "l")}</div>` +
    "</div>"
  );
}

const SCREENS: Record<ScreenName, (id: string) => string> = {
  novaHome,
  novaTransfer,
  novaInsights,
  lumenHome,
  lumenBooking,
  moveMap,
  moveLive,
  arcaDiscover,
  arcaProduct,
  arcaCheckout,
  evolve,
};

/** Titanium frame + glass around a screen. */
export function renderDevice(screen: ScreenName, id: string) {
  return (
    '<div class="d-frame"></div><i class="d-btn a"></i><i class="d-btn b"></i><i class="d-btn c"></i><i class="d-btn d"></i><div class="d-bezel"></div>' +
    `<div class="screen">${SCREENS[screen](id)}<div class="island"></div></div><div class="d-glare"></div>`
  );
}
