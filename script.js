const feedItems = [
  { title: "You've joined!", text: 'Thank you for participating.', time: 'Just now' },
  { title: '3 people joined nearby', text: 'Shared flow is growing.', time: '10 sec ago' },
  { title: 'Someone joined nearby', text: "You're not alone.", time: '30 sec ago' }
];

const data = {
  today: [
    ['Central', 128, '#eb2330'],
    ['Admiralty', 96, '#f5a623'],
    ['Mong Kok', 74, '#29b870'],
    ['Causeway Bay', 61, '#4d73ff'],
    ['Tsim Sha Tsui', 58, '#7a67d8']
  ],
  week: [
    ['Central', 633, '#eb2330'],
    ['Admiralty', 580, '#f5a623'],
    ['Mong Kok', 524, '#29b870'],
    ['Causeway Bay', 472, '#4d73ff'],
    ['Tsim Sha Tsui', 429, '#7a67d8']
  ],
  month: [
    ['Central', 2580, '#eb2330'],
    ['Admiralty', 2486, '#f5a623'],
    ['Mong Kok', 2311, '#29b870'],
    ['Causeway Bay', 2201, '#4d73ff'],
    ['Tsim Sha Tsui', 2094, '#7a67d8']
  ]
};

const feedRoot = document.getElementById('feed');
feedRoot.innerHTML = feedItems
  .map(
    (item) => `
      <article class="feed-item">
        <strong>${item.title} <small style="float:right;color:#7782a3;font-size:.8rem">${item.time}</small></strong>
        <span>${item.text}</span>
      </article>
    `
  )
  .join('');

const stationRoot = document.getElementById('stations');
const chips = [...document.querySelectorAll('.chip')];

function renderStations(range) {
  const rows = data[range];
  const max = Math.max(...rows.map((row) => row[1]));
  stationRoot.innerHTML = rows
    .map(
      ([name, count, color]) => `
      <div class="station">
        <div class="station-head"><span>${name}</span><span>${count}</span></div>
        <div class="bar"><div class="fill" style="width:${Math.round((count / max) * 100)}%;background:${color}"></div></div>
      </div>
    `
    )
    .join('');
}

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((btn) => btn.classList.remove('active'));
    chip.classList.add('active');
    renderStations(chip.dataset.range);
  });
});

renderStations('today');
