// Mobile hamburger menu, shared by every page.
(function () {
    var nav = document.querySelector('.navbar');
    var btn = nav && nav.querySelector('.nav-toggle');
    if (!btn) return;

    function setOpen(open) {
        nav.classList.toggle('nav-open', open);
        document.body.classList.toggle('nav-locked', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    btn.addEventListener('click', function () {
        setOpen(!nav.classList.contains('nav-open'));
    });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
        a.addEventListener('click', function () { setOpen(false); });
    });
    nav.querySelector('.nav-links').addEventListener('click', function (e) {
        if (e.target === e.currentTarget) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) setOpen(false);
    });
})();
