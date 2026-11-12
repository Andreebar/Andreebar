// Small progressive enhancements: light/dark toggle and a client-side search.
// Nothing here is required to read the site; links work without JavaScript.
(function () {
  var root = document.documentElement;

  // Theme toggle. The theme is remembered in localStorage when available.
  var themeButton = document.getElementById('theme-toggle');
  function currentTheme() {
    if (root.dataset.theme === 'dark' || root.dataset.theme === 'light') return root.dataset.theme;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  if (themeButton) {
    themeButton.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // Search over the index.json built by Hugo.
  var toggle = document.getElementById('search-toggle');
  var panel = document.getElementById('search-panel');
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var index = null;

  function loadIndex() {
    if (index) return Promise.resolve(index);
    return fetch(root.dataset.index)
      .then(function (r) { return r.json(); })
      .then(function (data) { index = data || []; return index; })
      .catch(function () { index = []; return index; });
  }

  function render(query) {
    results.textContent = '';
    var q = query.trim().toLowerCase();
    if (!q) return;
    var hits = (index || []).filter(function (item) {
      return (item.title || '').toLowerCase().indexOf(q) !== -1 ||
             (item.text || '').toLowerCase().indexOf(q) !== -1;
    }).slice(0, 10);
    if (!hits.length) {
      var none = document.createElement('li');
      none.textContent = 'No results';
      results.appendChild(none);
      return;
    }
    hits.forEach(function (item) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = item.url;
      a.textContent = item.title;
      li.appendChild(a);
      if (item.section) {
        var s = document.createElement('span');
        s.textContent = item.section;
        li.appendChild(s);
      }
      results.appendChild(li);
    });
  }

  if (toggle && panel && input) {
    toggle.addEventListener('click', function () {
      var opening = panel.hidden;
      panel.hidden = !opening;
      toggle.setAttribute('aria-expanded', String(opening));
      if (opening) {
        input.focus();
        loadIndex().then(function () { render(input.value); });
      }
    });
    input.addEventListener('input', function () {
      loadIndex().then(function () { render(input.value); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) {
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
