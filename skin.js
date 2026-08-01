/* Onyes 小站 · 统一主题切换（新工具页共用） */
(function () {
    'use strict';
    var root = document.documentElement;
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    var initial = 'light';
    if (saved === 'dark' || saved === 'light') initial = saved;
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) initial = 'dark';
    root.setAttribute('data-theme', initial);

    var btn = document.getElementById('themeToggle');
    if (btn) {
        btn.textContent = initial === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
        btn.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
            btn.textContent = next === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
        });
    }
})();
