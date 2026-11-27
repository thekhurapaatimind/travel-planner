/*
 * Kerala Escape '26 — timeline cards + memory envelopes
 *
 * Every card with data-memory="<slug>" becomes an envelope. When it opens,
 * two polaroids drop out, loaded from:
 *   assets/memories/<slug>-1.jpg   and   assets/memories/<slug>-2.jpg
 * (.jpeg / .png / .webp also work). Missing photos show an empty polaroid.
 *
 * Optional captions live in assets/memories/captions.json:
 *   { "d1-jatayu": ["On top of the eagle", "Squad at the summit"] }
 */

const MEMORY_DIR = 'assets/memories/';
const EXTENSIONS = ['webp', 'jpg', 'jpeg', 'png'];
const TILTS = [[-7, 5], [4, -6], [-4, 8], [6, -3]];
let captions = {};

fetch(MEMORY_DIR + 'captions.json', { cache: 'no-cache' })
    .then(r => (r.ok ? r.json() : {}))
    .then(data => { captions = data || {}; refreshCaptions(); })
    .catch(() => {});

function toggleCard(element) {
    const opening = !element.classList.contains('active');
    element.classList.toggle('active');
    if (opening) loadMemories(element);
}

function buildEnvelopes() {
    document.querySelectorAll('.info-card[data-memory]').forEach((card, i) => {
        const details = card.querySelector('.card-details');
        if (!details || details.querySelector('.memory-envelope')) return;

        const tilt = TILTS[i % TILTS.length];
        const env = document.createElement('div');
        env.className = 'memory-envelope';
        env.innerHTML = `
            <div class="envelope-label"><i class="fa-regular fa-envelope-open"></i> Memories</div>
            <div class="envelope">
                <div class="envelope-back"></div>
                <div class="envelope-flap"></div>
            </div>
            <div class="polaroids">
                ${[1, 2].map((n, k) => `
                <figure class="polaroid empty" style="--tilt:${tilt[k]}deg; --delay:${0.35 + k * 0.22}s" data-n="${n}">
                    <div class="polaroid-photo">
                        <img alt="" loading="lazy">
                        <div class="polaroid-placeholder"><i class="fa-solid fa-camera-retro"></i><span>Photo ${n} coming soon</span></div>
                    </div>
                    <figcaption></figcaption>
                </figure>`).join('')}
            </div>`;
        details.appendChild(env);

        env.querySelectorAll('.polaroid').forEach(p => {
            p.addEventListener('click', e => {
                e.stopPropagation();
                if (!p.classList.contains('empty')) openLightbox(p);
            });
        });
    });
    // Links and buttons inside a card should not close it.
    document.querySelectorAll('.info-card a').forEach(a =>
        a.addEventListener('click', e => e.stopPropagation()));
    refreshCaptions();
}

function captionFor(card, n) {
    const slug = card.dataset.memory;
    const list = captions[slug];
    if (list && list[n - 1]) return list[n - 1];
    const title = card.querySelector('h4');
    return title ? title.textContent.trim() : '';
}

function refreshCaptions() {
    document.querySelectorAll('.info-card[data-memory]').forEach(card => {
        card.querySelectorAll('.polaroid').forEach(p => {
            p.querySelector('figcaption').textContent = captionFor(card, Number(p.dataset.n));
        });
    });
}

function loadMemories(card) {
    if (card.dataset.memoriesLoaded) return;
    card.dataset.memoriesLoaded = '1';
    const slug = card.dataset.memory;
    card.querySelectorAll('.polaroid').forEach(p => {
        const img = p.querySelector('img');
        tryLoad(img, `${MEMORY_DIR}${slug}-${p.dataset.n}`, 0, () => p.classList.remove('empty'));
    });
}

function tryLoad(img, base, i, onSuccess) {
    if (i >= EXTENSIONS.length) return;
    const probe = new Image();
    probe.onload = () => { img.src = probe.src; onSuccess(); };
    probe.onerror = () => tryLoad(img, base, i + 1, onSuccess);
    probe.src = `${base}.${EXTENSIONS[i]}`;
}

function openLightbox(polaroid) {
    const box = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = polaroid.querySelector('img').src;
    document.getElementById('lightbox-cap').textContent = polaroid.querySelector('figcaption').textContent;
    box.classList.add('open');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
document.addEventListener('DOMContentLoaded', buildEnvelopes);
