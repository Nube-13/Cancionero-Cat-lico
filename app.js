(function () {
  "use strict";
  const songs = Array.isArray(window.CANCIONERO_SONGS) ? window.CANCIONERO_SONGS : [];
  const categories = { misa: "Misa", alabanza: "Alabanza", adoracion: "Adoración", mariano: "Mariano" };
  const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const flats = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  const pitch = { C:0, "B#":0, "C#":1, Db:1, D:2, "D#":3, Eb:3, E:4, Fb:4, "E#":5, F:5, "F#":6, Gb:6, G:7, "G#":8, Ab:8, A:9, "A#":10, Bb:10, B:11, Cb:11 };
  const state = { query: "", category: "todas", moment: "", season: "", favoritesOnly: false, currentId: songs[0]?.id ?? null, shift: 0, showChords: true, fontSize: 1 };
  const $ = id => document.getElementById(id);
  const safe = value => String(value ?? "").replace(/[&<>"']/g, chr => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[chr]));
  const normalize = value => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const loadFavorites = () => { try { return new Set(JSON.parse(localStorage.getItem("canticos-favorites") || "[]")); } catch (_) { return new Set(); } };
  const favorites = loadFavorites();
  function saveFavorites() { try { localStorage.setItem("canticos-favorites", JSON.stringify([...favorites])); } catch (_) {} }
  function songText(s) { return [s.title, s.author, s.description, ...(s.keywords || []), ...(s.moments || []), ...(s.seasons || []), ...(s.sections || []).flatMap(x => x.lines || [])].join(" "); }
  function filteredSongs() { return songs.filter(s =>
    (state.category === "todas" || s.category === state.category) &&
    (!state.moment || (s.moments || []).includes(state.moment)) &&
    (!state.season || (s.seasons || []).includes(state.season)) &&
    (!state.favoritesOnly || favorites.has(s.id)) &&
    (!state.query || normalize(songText(s)).includes(normalize(state.query)))
  ); }
  function getCurrentSong() { return songs.find(s => s.id === state.currentId) || null; }
  function prettyKey(key, offset, preference) { return transposeChord(key, offset, preference); }
  function transposePart(part, offset, preference) {
    return part.replace(/^([A-G])([#b]?)(.*)$/, (_, letter, accidental, suffix) => {
      const original = letter + accidental;
      if (!(original in pitch)) return part;
      const shifted = ((pitch[original] + offset) % 12 + 12) % 12;
      const palette = preference === "flat" || (preference !== "sharp" && accidental === "b") ? flats : names;
      return palette[shifted] + suffix;
    });
  }
  function transposeChord(chord, offset, preference) {
    return String(chord).split("/").map(x => transposePart(x, offset, preference)).join("/");
  }
  function lineHtml(line, song) {
    // En cada [acorde] se conserva el fragmento de texto al que pertenece.
    const pattern = /\[([^\]]+)\]/g;
    let pieces = [], cursor = 0, match, activeChord = null;
    while ((match = pattern.exec(line)) !== null) {
      if (match.index > cursor || activeChord !== null) pieces.push({ chord: activeChord, words: line.slice(cursor, match.index) });
      activeChord = match[1];
      cursor = pattern.lastIndex;
    }
    pieces.push({ chord: activeChord, words: line.slice(cursor) });
    return pieces.map(p => {
      const chord = p.chord && state.showChords ? `<span class="chord-name">${safe(transposeChord(p.chord, state.shift, song.preferredAccidentals))}</span>` : '<span class="chord-name empty-chord"></span>';
      return `<span class="chord-segment">${chord}<span class="lyric-part">${safe(p.words) || '&nbsp;'}</span></span>`;
    }).join("");
  }
  function createFilterOptions(select, items) {
    [...new Set(items)].sort((a, b) => a.localeCompare(b, "es")).forEach(value => {
      const opt = document.createElement("option"); opt.value = value; opt.textContent = value; select.appendChild(opt);
    });
  }
  createFilterOptions($("momentFilter"), songs.flatMap(s => s.moments || []));
  createFilterOptions($("seasonFilter"), songs.flatMap(s => s.seasons || []));
  $("libraryCount").textContent = `${songs.length} cantos de muestra`;

  function renderList() {
    const found = filteredSongs();
    $("resultCount").textContent = `${found.length} ${found.length === 1 ? "canto encontrado" : "cantos encontrados"}`;
    if (!found.some(s => s.id === state.currentId)) { state.currentId = found[0]?.id ?? null; state.shift = 0; }
    $("songList").innerHTML = found.length ? found.map(s => `
      <button class="song-card ${s.id === state.currentId ? "selected" : ""}" type="button" data-action="select" data-id="${safe(s.id)}" aria-current="${s.id === state.currentId ? "true" : "false"}">
        <span class="song-card-top"><span class="card-category">${safe(categories[s.category] || s.category)}</span><span class="song-key">${safe(s.key)}</span></span>
        <span class="song-card-title">${safe(s.title)}</span>
        <span class="song-card-moments">${safe((s.moments || []).join(" · "))}</span>
        <span class="song-card-foot"><span>Ver letra y acordes →</span>${favorites.has(s.id) ? '<span class="mini-heart" aria-label="Favorita">♥</span>' : ""}</span>
      </button>`).join("") : '<div class="no-results"><span>♫</span><strong>No encontramos cantos</strong><p>Prueba otro título o cambia los filtros.</p><button type="button" data-action="clear-filters">Limpiar filtros</button></div>';
    renderDetail();
  }
  function renderDetail() {
    const s = getCurrentSong();
    if (!s || !filteredSongs().some(x => x.id === s.id)) {
      $("songDetail").innerHTML = `<div class="detail-placeholder"><span>✦</span><strong>Tu próxima canción te espera.</strong><p>Selecciona una canción de la biblioteca.</p></div>`;
      return;
    }
    const isFav = favorites.has(s.id);
    $("songDetail").innerHTML = `
      <div class="detail-header">
        <button class="back-mobile" type="button" data-action="back">← Volver al listado</button>
        <div class="detail-topline"><span class="label-top">${safe(categories[s.category] || "Canción")} / Repertorio</span><button type="button" class="heart-button ${isFav ? "saved" : ""}" data-action="favorite" aria-label="${isFav ? "Quitar de favoritas" : "Guardar en favoritas"}" aria-pressed="${isFav}">${isFav ? "♥" : "♡"}</button></div>
        <h3>${safe(s.title)}</h3>
        <p class="author">${safe(s.author || "Autor no indicado")}</p>
        <div class="tags">${(s.moments || []).map(tag => `<span class="tag moment-tag">${safe(tag)}</span>`).join("")}${(s.seasons || []).map(tag => `<span class="tag season-tag">${safe(tag)}</span>`).join("")}</div>
        ${s.description ? `<p class="detail-description">${safe(s.description)}</p>` : ""}
      </div>
      <div class="player-toolbar">
        <div class="transpose"><span class="tool-label">TONALIDAD</span><button data-action="transpose-down" type="button" aria-label="Bajar medio tono">−</button><span class="current-key" aria-live="polite">${safe(prettyKey(s.key, state.shift, s.preferredAccidentals))}</span><button data-action="transpose-up" type="button" aria-label="Subir medio tono">+</button><button class="original-button" type="button" data-action="reset-tonality" ${state.shift === 0 ? "disabled" : ""}>Original</button></div>
        <div class="reading-tools"><button data-action="toggle-chords" type="button" class="text-control" aria-pressed="${state.showChords}">${state.showChords ? "Ocultar acordes" : "Ver acordes"}</button><button data-action="font-down" type="button" class="font-control" aria-label="Reducir tamaño de texto">A−</button><button data-action="font-up" type="button" class="font-control" aria-label="Aumentar tamaño de texto">A+</button><button data-action="print" type="button" class="print-control" aria-label="Imprimir canción">⎙</button></div>
      </div>
      <div class="score" style="--font-scale:${state.fontSize}">
        ${(s.sections || []).map(sec => `<div class="score-section"><h4>${safe(sec.heading)}</h4>${(sec.lines || []).map(line => `<div class="song-line ${state.showChords ? "" : "hide-chords"}">${lineHtml(line, s)}</div>`).join("")}</div>`).join("")}
      </div>
      <div class="detail-bottom"><span>♫ &nbsp; Tonalidad original: <strong>${safe(s.key)}</strong></span><span>Usa + y − para transponer de semitono en semitono.</span></div>`;
  }
  function chooseSong(id) { if (!songs.some(s => s.id === id)) return; if (state.currentId !== id) { state.currentId = id; state.shift = 0; } renderList(); document.body.classList.add("mobile-detail-open"); if (window.matchMedia("(max-width: 670px)").matches) requestAnimationFrame(() => $("explorar").scrollIntoView({ behavior: "smooth", block: "start" })); }
  function resetFilters() { state.query = ""; state.category = "todas"; state.moment = ""; state.season = ""; state.favoritesOnly = false; $("searchInput").value = ""; $("momentFilter").value = ""; $("seasonFilter").value = ""; updateFilterButtons(); renderList(); }
  function updateFilterButtons() {
    document.querySelectorAll(".category-tab").forEach(b => { const on = b.dataset.category === state.category; b.classList.toggle("active", on); b.setAttribute("aria-pressed", String(on)); });
    $("favoritesFilter").classList.toggle("active", state.favoritesOnly);
    $("favoritesFilter").setAttribute("aria-pressed", String(state.favoritesOnly));
  }
  $("searchInput").addEventListener("input", e => { state.query = e.target.value.trim(); renderList(); });
  $("momentFilter").addEventListener("change", e => { state.moment = e.target.value; renderList(); });
  $("seasonFilter").addEventListener("change", e => { state.season = e.target.value; renderList(); });
  $("favoritesFilter").addEventListener("click", () => { state.favoritesOnly = !state.favoritesOnly; updateFilterButtons(); renderList(); });
  $("categoryTabs").addEventListener("click", e => { const btn = e.target.closest("[data-category]"); if (!btn) return; state.category = btn.dataset.category; updateFilterButtons(); renderList(); });
  document.body.addEventListener("click", e => {
    const btn = e.target.closest("[data-action]"); if (!btn) return;
    const action = btn.dataset.action;
    if (action === "select") return chooseSong(btn.dataset.id);
    if (action === "back") { document.body.classList.remove("mobile-detail-open"); return; }
    if (action === "clear-filters") return resetFilters();
    const s = getCurrentSong(); if (!s) return;
    if (action === "favorite") { if (favorites.has(s.id)) favorites.delete(s.id); else favorites.add(s.id); saveFavorites(); renderList(); }
    if (action === "transpose-down") { state.shift -= 1; renderDetail(); }
    if (action === "transpose-up") { state.shift += 1; renderDetail(); }
    if (action === "reset-tonality") { state.shift = 0; renderDetail(); }
    if (action === "toggle-chords") { state.showChords = !state.showChords; renderDetail(); }
    if (action === "font-down") { state.fontSize = Math.max(0.8, +(state.fontSize - 0.1).toFixed(1)); renderDetail(); }
    if (action === "font-up") { state.fontSize = Math.min(1.7, +(state.fontSize + 0.1).toFixed(1)); renderDetail(); }
    if (action === "print") window.print();
  });
  updateFilterButtons(); renderList();
})();
