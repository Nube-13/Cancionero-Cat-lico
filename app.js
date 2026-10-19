(function () {
  "use strict";
  const songs = Array.isArray(window.CANCIONERO_SONGS) ? window.CANCIONERO_SONGS : [];
  const availableMoments = Array.isArray(window.CANCIONERO_MOMENTS) ? window.CANCIONERO_MOMENTS : [];
  const availableSeasons = Array.isArray(window.CANCIONERO_SEASONS) ? window.CANCIONERO_SEASONS : [];
  const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const flats = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  const pitch = { C:0, "B#":0, "C#":1, Db:1, D:2, "D#":3, Eb:3, E:4, Fb:4, "E#":5, F:5, "F#":6, Gb:6, G:7, "G#":8, Ab:8, A:9, "A#":10, Bb:10, B:11, Cb:11 };
  const state = { query: "", moment: "", season: "", favoritesOnly: false, currentId: songs[0]?.id ?? null, shift: 0, showChords: true, fontSize: 1 };
  const $ = id => document.getElementById(id);
  const safe = value => String(value ?? "").replace(/[&<>"']/g, chr => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[chr]));
  const normalize = value => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const loadFavorites = () => { try { return new Set(JSON.parse(localStorage.getItem("canticos-favorites") || "[]")); } catch (_) { return new Set(); } };
  const favorites = loadFavorites();
  function saveFavorites() { try { localStorage.setItem("canticos-favorites", JSON.stringify([...favorites])); } catch (_) {} }
  function songText(s) { return [s.title, s.author, s.description, ...(s.keywords || []), ...(s.moments || []), ...(s.seasons || []), ...(s.sections || []).flatMap(x => (x.lines || []).map(line => typeof line === "string" ? line.replace(/\[[^\]]+\]/g, "") : (line.text || "")))].join(" "); }
  function filteredSongs() { return songs.filter(s =>
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
  function decodeLine(line) {
    // Support legacy ChordPro strings and precise Word-position objects.
    if (typeof line !== "string") return { text: String(line.text || ""), chords: line.chords || [] };
    const chords = [];
    let text = "";
    let last = 0;
    for (const match of line.matchAll(/\[([^\]]+)\]/g)) {
      text += line.slice(last, match.index);
      chords.push({ at: text.length, name: match[1] });
      last = match.index + match[0].length;
    }
    return { text: text + line.slice(last), chords };
  }
  function lineHtml(line, song) {
    const { text, chords } = decodeLine(line);
    const parts = [];
    // Group letters in words to preserve natural wrapping on mobile.
    // The absolutely positioned chord pin does NOT push letters sideways.
    const tokens = text.match(/\s+|\S+/gu) || [];
    let index = 0;
    for (const token of tokens) {
      const start = index;
      index += token.length;
      if (/^\s+$/u.test(token)) continue;
      const wordChords = chords.filter(c => c.at >= start && c.at < index).sort((a,b)=>a.at-b.at);
      let wordHtml = "", pos = 0;
      for (const c of wordChords) {
        const charPos = Math.max(0, Math.min(token.length, c.at - start));
        wordHtml += safe(token.slice(pos, charPos));
        if (state.showChords) wordHtml += `<span class="chord-pin" aria-label="Acorde ${safe(transposeChord(c.name, state.shift, song.preferredAccidentals))}"><span class="chord-name">${safe(transposeChord(c.name, state.shift, song.preferredAccidentals))}</span></span>`;
        pos = charPos;
      }
      wordHtml += safe(token.slice(pos));
      parts.push(`<span class="lyric-word">${wordHtml}</span>`);
    }
    // Accommodate any chord anchored at line end.
    const endChords = chords.filter(c=>c.at>=text.length);
    if (endChords.length && state.showChords) parts.push(endChords.map(c=>`<span class="chord-pin"><span class="chord-name">${safe(transposeChord(c.name,state.shift,song.preferredAccidentals))}</span></span>`).join(""));
    return parts.join("");
  }
  function createFilterOptions(select, items) {
    [...new Set(items)].sort((a, b) => a.localeCompare(b, "es")).forEach(value => {
      const opt = document.createElement("option"); opt.value = value; opt.textContent = value; select.appendChild(opt);
    });
  }
  createFilterOptions($("momentFilter"), [...availableMoments, ...songs.flatMap(s => s.moments || [])]);
  createFilterOptions($("seasonFilter"), songs.flatMap(s => s.seasons || []));
  $("libraryCount").textContent = `${songs.length} ${songs.length === 1 ? "canto disponible" : "cantos disponibles"}`;

  function renderList() {
    const found = filteredSongs();
    $("resultCount").textContent = `${found.length} ${found.length === 1 ? "canto encontrado" : "cantos encontrados"}`;
    if (!found.some(s => s.id === state.currentId)) { state.currentId = found[0]?.id ?? null; state.shift = 0; }
    $("songList").innerHTML = found.length ? found.map(s => `
      <button class="song-card ${s.id === state.currentId ? "selected" : ""}" type="button" data-action="select" data-id="${safe(s.id)}" aria-current="${s.id === state.currentId ? "true" : "false"}">
        <span class="song-card-top"><span class="card-category">${safe((s.moments || [])[0] || "Canto")}</span><span class="song-key">${safe(s.key)}</span></span>
        <span class="song-card-title">${safe(s.title)}</span>
        <span class="song-card-moments">${safe((s.moments || []).length ? s.moments.join(" · ") : "Sin clasificar")}</span>
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
        <div class="detail-topline"><span class="label-top">Canción / Repertorio</span><button type="button" class="heart-button ${isFav ? "saved" : ""}" data-action="favorite" aria-label="${isFav ? "Quitar de favoritas" : "Guardar en favoritas"}" aria-pressed="${isFav}">${isFav ? "♥" : "♡"}</button></div>
        <h3>${safe(s.title)}</h3>
        <p class="author">${safe(s.author || "Autor no indicado")}</p>
        <div class="tags">${(s.moments || []).length ? s.moments.map(tag => `<span class="tag moment-tag">${safe(tag)}</span>`).join("") : `<span class="tag moment-tag">Sin clasificar</span>`}${(s.seasons || []).map(tag => `<span class="tag season-tag">${safe(tag)}</span>`).join("")}${s.reviewStatus ? `<span class="tag status-tag">${safe(s.reviewStatus)}</span>` : ""}</div>
        ${s.description ? `<p class="detail-description">${safe(s.description)}</p>` : ""}${s.capo ? `<p class="detail-description">Cejilla indicada: traste ${s.capo}. Los acordes visibles son los escritos en el documento.</p>` : ""}${s.sourcePageCount > 1 ? `<p class="source-notice">Se importó únicamente la primera página de este Word. Comprueba si alguna estrofa continúa en la página siguiente.</p>` : ""}${s.warnings?.some(w=>!w.startsWith("Varias páginas")) ? `<p class="source-notice">Importación automática pendiente de revisar: ${safe(s.warnings.filter(w=>!w.startsWith("Varias páginas")).join(" · "))}</p>` : ""}
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
  function resetFilters() { state.query = ""; state.moment = ""; state.season = ""; state.favoritesOnly = false; $("searchInput").value = ""; $("momentFilter").value = ""; $("seasonFilter").value = ""; updateFilterButtons(); renderList(); }
  function updateFilterButtons() {
    document.querySelectorAll(".category-tab").forEach(b => { const on = b.dataset.moment === state.moment; b.classList.toggle("active", on); b.setAttribute("aria-pressed", String(on)); });
    $("favoritesFilter").classList.toggle("active", state.favoritesOnly);
    $("favoritesFilter").setAttribute("aria-pressed", String(state.favoritesOnly));
  }
  $("searchInput").addEventListener("input", e => { state.query = e.target.value.trim(); renderList(); });
  $("momentFilter").addEventListener("change", e => { state.moment = e.target.value; updateFilterButtons(); renderList(); });
  $("seasonFilter").addEventListener("change", e => { state.season = e.target.value; renderList(); });
  $("favoritesFilter").addEventListener("click", () => { state.favoritesOnly = !state.favoritesOnly; updateFilterButtons(); renderList(); });
  $("momentTabs").addEventListener("click", e => { const btn = e.target.closest("[data-moment]"); if (!btn) return; state.moment = btn.dataset.moment; $("momentFilter").value = state.moment; updateFilterButtons(); renderList(); });
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
