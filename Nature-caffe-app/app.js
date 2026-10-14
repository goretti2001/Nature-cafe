// Nature Caffe – stämpelkort, meny och navigering.
// Stämplarna sparas i webbläsaren (localStorage). I en riktig app skulle de ligga på en server.

(function () {
  var GOAL = 10;
  var START = 6; // demo: Sara har redan 6 stämplar
  var KEY = 'nature-caffe-stamps';

  var MENU = {
    'Frukost': [
      { name: 'Overnight oats', desc: 'Havre, chiafrön, blåbär och rostade nötter', tag: 'Glutenfri', price: 75, img: 'images/meny/overnight-oats.jpg' },
      { name: 'Avokadomacka', desc: 'Surdegsbröd, avokado, rädisor och groddar', price: 89, img: 'images/meny/avokadomacka.jpg' },
      { name: 'Chiapudding', desc: 'Kokosmjölk, mango och passionsfrukt', tag: 'Raw', price: 69, img: 'images/meny/chiapudding.jpg' },
      { name: 'Granolaskål', desc: 'Hemgjord granola, sojayoghurt och bär', price: 79, img: 'images/meny/granola.jpg' },
      { name: 'Tofuröra på surdeg', desc: 'Gurkmeja, spenat och körsbärstomater', price: 95, img: 'images/meny/tofurora.jpg' },
      { name: 'Smoothiebowl', desc: 'Açaí, banan, jordgubbar och kokos', tag: 'Glutenfri', price: 85, img: 'images/meny/smoothiebowl.jpg' }
    ],
    'Lunch': [
      { name: 'Rödbetsbowl', desc: 'Rödbetor, hummus, quinoa och grönkål', tag: 'Glutenfri', price: 125, img: 'images/meny/rodbetsbowl.jpg' },
      { name: 'Linssoppa', desc: 'Röda linser och kokos, serveras med surdegsbröd', price: 105, img: 'images/meny/linssoppa.jpg' },
      { name: 'Falafeltallrik', desc: 'Falafel, tabbouleh och tahinisås', price: 119, img: 'images/meny/falafel.jpg' },
      { name: 'Sötpotatissallad', desc: 'Rostad sötpotatis, bulgur, granatäpple och mynta', price: 115, img: 'images/meny/sotpotatissallad.jpg' }
    ],
    'Fika': [
      { name: 'Chokladboll', desc: 'Dadlar, kakao och kokos', tag: 'Raw', price: 35, img: 'images/meny/chokladboll.jpg' },
      { name: 'Kanelbulle', desc: 'Bakad på havremjölk och kardemumma', price: 39, img: 'images/meny/kanelbulle.jpg' },
      { name: 'Raw cheesecake', desc: 'Cashew, citron och hallon', tag: 'Raw', price: 59, img: 'images/meny/cheesecake.jpg' }
    ],
    'Kaffe & te': [
      { name: 'Bryggkaffe', desc: 'Från Kersh kafferosteri, Karlstad', price: 35, img: 'images/meny/bryggkaffe.jpg' },
      { name: 'Havrelatte', desc: 'Dubbel espresso och ångad havremjölk', price: 49, img: 'images/meny/havrelatte.jpg' },
      { name: 'Chai latte', desc: 'Hemkokt chai med havremjölk', price: 52, img: 'images/meny/chai-latte.jpg' },
      { name: 'Matcha latte', desc: 'Ekologisk matcha och havremjölk', price: 55, img: 'images/meny/matcha-latte.jpg' }
    ]
  };

  var BEAN_FULL = '<svg role="img" aria-label="Stämpel" width="44" height="44" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="7" ry="10" transform="rotate(30 12 12)" fill="#6B4A32"/><path d="M15.5 4.5c-3.5 2.5-1.5 6-3.5 7.5s-2.5 4.5-1.5 7.5" fill="none" stroke="#F5F1E8" stroke-width="1.5" stroke-linecap="round"/></svg>';
  var BEAN_EMPTY = '<svg role="img" aria-label="Tom plats" width="44" height="44" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="7" ry="10" transform="rotate(30 12 12)" fill="#F5F1E8" stroke="#B8AE9C" stroke-width="1.2" stroke-dasharray="2 2"/></svg>';
  var LEAF = '<svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4F6F5C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z"/><path d="M5 19l7-7"/></svg>';

  // ---------- Lagring ----------
  var memory = START;
  function load() {
    try {
      var v = localStorage.getItem(KEY);
      if (v !== null && !isNaN(parseInt(v, 10))) return Math.max(0, Math.min(GOAL, parseInt(v, 10)));
    } catch (e) {}
    return memory;
  }
  function save(n) {
    memory = n;
    try { localStorage.setItem(KEY, String(n)); } catch (e) {}
  }

  var $ = function (id) { return document.getElementById(id); };
  var justAdded = -1;

  // ---------- Stämpelkort ----------
  function renderCard() {
    var n = load();
    var html = '';
    for (var i = 0; i < GOAL; i++) {
      html += '<li' + (i === justAdded ? ' class="is-new"' : '') + '>' + (i < n ? BEAN_FULL : BEAN_EMPTY) + '</li>';
    }
    $('beans').innerHTML = html;
    $('beans').setAttribute('aria-label', n + ' av ' + GOAL + ' stämplar');
    $('stamp-count').textContent = n;
    $('progress-bar').style.width = (n / GOAL * 100) + '%';
    $('qr-label').textContent = 'SARA · ' + n + ' AV ' + GOAL;

    var full = n >= GOAL;
    document.querySelector('.stampcard').classList.toggle('is-full', full);
    var left = GOAL - n;
    $('stamp-hint').innerHTML = full
      ? '<strong>Din gratis kaffe väntar!</strong> Visa kortet i kassan.'
      : left + (left === 1 ? ' böna' : ' bönor') + ' kvar till en <strong>gratis kaffe</strong>';
    $('stamp-btn-label').textContent = full ? 'Lös in gratis kaffe' : 'Få stämpel';
    justAdded = -1;
  }

  function showQr() {
    $('qr-view').hidden = false;
    $('done-view').hidden = true;
  }

  function onScan() {
    var n = load();
    var full = n >= GOAL;
    if (full) {
      save(0);
      $('done-title').textContent = 'Smaklig kaffe!';
      $('done-text').textContent = 'Din gratis kaffe är inlöst. Kortet börjar om från noll.';
    } else {
      n += 1;
      justAdded = n - 1;
      save(n);
      if (n >= GOAL) {
        $('done-title').textContent = 'Gratis kaffe upplåst!';
        $('done-text').textContent = 'Du har samlat alla 10 bönor. Nästa kaffe bjuder vi på.';
      } else {
        var left = GOAL - n;
        $('done-title').textContent = 'Stämpel tillagd!';
        $('done-text').textContent = 'Du har nu ' + n + ' av ' + GOAL + ' bönor. ' + left + ' kvar till en gratis kaffe.';
      }
    }
    $('qr-view').hidden = true;
    $('done-view').hidden = false;
    $('done-btn').focus();
  }

  // ---------- Meny ----------
  var currentCat = 'Frukost';
  function renderMenu() {
    var cats = Object.keys(MENU);
    $('chips').innerHTML = cats.map(function (c) {
      return '<button type="button" class="chip" role="tab" aria-selected="' + (c === currentCat) + '" data-cat="' + c + '">' + c + '</button>';
    }).join('');
    $('menu-list').innerHTML = MENU[currentCat].map(function (d) {
      return '<li class="card dish">' +
        '<div class="dish__icon">' + (d.img ? '<img src="' + d.img + '" alt="' + d.name + '" loading="lazy" width="60" height="60">' : LEAF) + '</div>' +
        '<div class="dish__body">' +
          '<div class="dish__top"><p class="dish__name">' + d.name + '</p><p class="dish__price">' + d.price + ' kr</p></div>' +
          '<p class="dish__desc">' + d.desc + '</p>' +
          (d.tag ? '<span class="tag">' + d.tag + '</span>' : '') +
        '</div></li>';
    }).join('');
  }

  // ---------- Navigering ----------
  var SCREENS = ['hem', 'stampel', 'meny', 'om-oss', 'kontakt'];
  function route() {
    var id = (location.hash || '#hem').slice(1);
    if (SCREENS.indexOf(id) === -1) id = 'hem';
    SCREENS.forEach(function (s) { $(s).hidden = s !== id; });
    document.querySelectorAll('#tabbar a').forEach(function (a) {
      if (a.dataset.tab === id) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    var green = id === 'stampel';
    $('tabbar').classList.toggle('is-hidden', green);
    document.querySelector('.app').classList.toggle('is-green', green);
    if (green) showQr();
    if (id === 'hem') renderCard();
    window.scrollTo(0, 0);
  }

  // ---------- Start ----------
  $('scan-btn').addEventListener('click', onScan);
  $('reset-demo').addEventListener('click', function () { save(START); renderCard(); });
  $('chips').addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]');
    if (!b) return;
    currentCat = b.dataset.cat;
    renderMenu();
  });
  document.querySelectorAll('.pill[aria-disabled="true"]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });
  window.addEventListener('hashchange', route);
  renderMenu();
  route();
})();
