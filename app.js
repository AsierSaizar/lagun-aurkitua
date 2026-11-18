/* Saizar Familia · Lagun Aurkitua */
(() => {
  "use strict";

  // ── Config ──────────────────────────────────────────────
  const CFG = window.APP_CONFIG || {};
  const PEOPLE = (Array.isArray(CFG.people) ? CFG.people : [])
    .map((p) => String(p).trim())
    .filter(Boolean);
  const CONFIGURED = Boolean(CFG.supabaseUrl && CFG.supabaseKey);
  const MAX_WISHES = 15;

  // ── Texts ───────────────────────────────────────────────
  const T = {
    eu: {
      eyebrow: "Gabonak {year}",
      whoTitle: "Nor zara?",
      whoLead: "Aukeratu zure izena zure opari-zerrenda idazteko eta besteenak ikusteko.",
      hello: "Kaixo, {name}",
      notMe: "Ez naiz ni",
      tabsLabel: "Atalak",
      tabMine: "Nire zerrenda",
      tabOthers: "Besteen zerrendak",
      mineLead: "Kontatu zer gustatuko litzaizukeen. Zure lagun ezkutuak eskertuko dizu.",
      secThemes: "Zer gustatzen zaizu?",
      secThemesHint: "Aukeratu nahi adina.",
      secStyles: "Zer opari mota?",
      secStylesHint: "Aukeratu bat edo gehiago.",
      secColors: "Kolore gogokoenak",
      secColorsHint: "Arropa, osagarri edo dekoraziorako.",
      secSizes: "Neurriak",
      secSizesHint: "Arropa edo oinetakoak oparitzen badizkizute.",
      clothing: "Arropa",
      shoes: "Oinetakoak",
      shoesPh: "Adib.: 42",
      secWishes: "Nire nahiak",
      secWishesHint: "Gauza zehatzak, nahi baduzu esteka batekin.",
      wishLabel: "{n}. nahia",
      wishPh: "Adib.: mahai-joko bat",
      linkPh: "Esteka (aukerakoa)",
      addWish: "Gehitu nahi bat",
      remove: "Kendu",
      secAvoid: "Mesedez, ez…",
      secAvoidHint: "Gustatzen ez zaizuna edo dagoeneko daukazuna.",
      avoidPh: "Adib.: kolonia, gozokiak…",
      secNotes: "Beste ezer?",
      secNotesHint: "Idatzi libreki. Estekak ere jar ditzakezu.",
      notesPh: "Adib.: liburu hau asko gustatuko litzaidake: https://…",
      save: "Gorde",
      saving: "Gordetzen…",
      saved: "Gordeta",
      allSaved: "Dena gordeta",
      unsaved: "Gorde gabeko aldaketak",
      notSavedYet: "Oraindik ez duzu ezer gorde",
      saveError: "Ezin izan da gorde. Saiatu berriro.",
      loadError: "Ezin izan dira datuak kargatu",
      loadErrorLead: "Begiratu Interneteko konexioa eta saiatu berriro.",
      retry: "Saiatu berriro",
      loading: "Kargatzen…",
      othersTitle: "Noren zerrenda ikusi nahi duzu?",
      othersLead: "Aukeratu pertsona bat haren nahiak ikusteko.",
      statusReady: "Zerrenda eginda",
      statusEmpty: "Oraindik ezer ez",
      back: "Atzera",
      listOf: "Nahien zerrenda",
      emptyTitle: "Oraindik ez du ezer idatzi",
      emptyLead: "Itzuli geroago, agian orduan zerbait egongo da.",
      updated: "Azken aldaketa: {date}",
      vWishes: "Nahiak",
      vThemes: "Gustukoak",
      vStyles: "Opari mota",
      vColors: "Kolore gogokoenak",
      vSizes: "Neurriak",
      vAvoid: "Mesedez, ez",
      vNotes: "Oharrak",
      discard: "Gorde gabeko aldaketak galduko dira. Jarraitu?",
      demo: "Proba modua: datuak nabigatzaile honetan bakarrik gordetzen dira. Konfiguratu Supabase config.js fitxategian.",
      noPeople: "Ez dago inor zerrendan",
      noPeopleLead: "Gehitu izenak config.js fitxategian.",
      footer: "Eguberri on",
    },
    es: {
      eyebrow: "Navidad {year}",
      whoTitle: "¿Quién eres?",
      whoLead: "Elige tu nombre para escribir tu lista de deseos y ver las de los demás.",
      hello: "Hola, {name}",
      notMe: "No soy yo",
      tabsLabel: "Secciones",
      tabMine: "Mi lista",
      tabOthers: "Listas de los demás",
      mineLead: "Cuenta qué te gustaría. Tu amigo invisible te lo agradecerá.",
      secThemes: "¿Qué te gusta?",
      secThemesHint: "Elige todos los que quieras.",
      secStyles: "¿Qué tipo de regalo?",
      secStylesHint: "Elige uno o varios.",
      secColors: "Colores favoritos",
      secColorsHint: "Para ropa, complementos o decoración.",
      secSizes: "Tallas",
      secSizesHint: "Por si te regalan ropa o calzado.",
      clothing: "Ropa",
      shoes: "Calzado",
      shoesPh: "Ej.: 42",
      secWishes: "Mis deseos",
      secWishesHint: "Cosas concretas, con enlace si quieres.",
      wishLabel: "Deseo {n}",
      wishPh: "Ej.: un juego de mesa",
      linkPh: "Enlace (opcional)",
      addWish: "Añadir un deseo",
      remove: "Quitar",
      secAvoid: "Por favor, no…",
      secAvoidHint: "Lo que no te gusta o ya tienes.",
      avoidPh: "Ej.: colonias, dulces…",
      secNotes: "¿Algo más?",
      secNotesHint: "Escribe libremente. También puedes poner enlaces.",
      notesPh: "Ej.: este libro me encantaría: https://…",
      save: "Guardar",
      saving: "Guardando…",
      saved: "Guardado",
      allSaved: "Todo guardado",
      unsaved: "Cambios sin guardar",
      notSavedYet: "Aún no has guardado nada",
      saveError: "No se ha podido guardar. Inténtalo de nuevo.",
      loadError: "No se han podido cargar los datos",
      loadErrorLead: "Revisa la conexión a Internet y vuelve a intentarlo.",
      retry: "Reintentar",
      loading: "Cargando…",
      othersTitle: "¿De quién quieres ver la lista?",
      othersLead: "Elige a una persona para ver sus deseos.",
      statusReady: "Lista hecha",
      statusEmpty: "Todavía nada",
      back: "Volver",
      listOf: "Lista de deseos",
      emptyTitle: "Todavía no ha escrito nada",
      emptyLead: "Vuelve más tarde, quizá ya haya algo.",
      updated: "Última actualización: {date}",
      vWishes: "Deseos",
      vThemes: "Le gusta",
      vStyles: "Tipo de regalo",
      vColors: "Colores favoritos",
      vSizes: "Tallas",
      vAvoid: "Mejor no",
      vNotes: "Notas",
      discard: "Se perderán los cambios sin guardar. ¿Continuar?",
      demo: "Modo prueba: los datos solo se guardan en este navegador. Configura Supabase en config.js.",
      noPeople: "No hay nadie en la lista",
      noPeopleLead: "Añade los nombres en config.js.",
      footer: "Feliz Navidad",
    },
  };

  // [id, euskera, castellano]
  const THEMES = [
    ["books", "Liburuak", "Libros"],
    ["music", "Musika", "Música"],
    ["film", "Zinema eta serieak", "Cine y series"],
    ["sport", "Kirola", "Deporte"],
    ["outdoors", "Mendia eta natura", "Monte y naturaleza"],
    ["tech", "Teknologia", "Tecnología"],
    ["games", "Jokoak", "Juegos"],
    ["clothes", "Arropa", "Ropa"],
    ["accessories", "Osagarriak", "Complementos"],
    ["beauty", "Zaintza eta edertasuna", "Cuidado y belleza"],
    ["home", "Etxea eta dekorazioa", "Casa y decoración"],
    ["kitchen", "Sukaldaritza", "Cocina"],
    ["food", "Jakiak eta gozokiak", "Gastronomía y dulces"],
    ["drinks", "Ardoa eta edariak", "Vino y bebidas"],
    ["plants", "Landareak eta baratzea", "Plantas y huerta"],
    ["art", "Artea eta eskulanak", "Arte y manualidades"],
    ["travel", "Bidaiak", "Viajes"],
    ["wellness", "Ongizatea", "Bienestar"],
    ["toys", "Jostailuak", "Juguetes"],
    ["pets", "Maskotak", "Mascotas"],
  ];

  const STYLES = [
    ["practical", "Praktikoa", "Práctico"],
    ["fun", "Dibertigarria", "Divertido"],
    ["experience", "Esperientzia bat", "Una experiencia"],
    ["handmade", "Eskuz egina", "Hecho a mano"],
    ["local", "Bertako produktua", "Producto local"],
    ["sustainable", "Jasangarria", "Sostenible"],
    ["surprise", "Sorpresa", "Sorpresa"],
  ];

  // [id, hex, euskera, castellano]
  const COLORS = [
    ["red", "#C0392B", "Gorria", "Rojo"],
    ["green", "#2E7D4F", "Berdea", "Verde"],
    ["blue", "#2F5DA8", "Urdina", "Azul"],
    ["navy", "#1F2D4D", "Itsas urdina", "Azul marino"],
    ["yellow", "#E9B825", "Horia", "Amarillo"],
    ["orange", "#E07B39", "Laranja", "Naranja"],
    ["pink", "#E58FA8", "Arrosa", "Rosa"],
    ["purple", "#7D4FA3", "Morea", "Morado"],
    ["brown", "#7B5235", "Marroia", "Marrón"],
    ["beige", "#D9C6A5", "Beixa", "Beige"],
    ["grey", "#8A8F98", "Grisa", "Gris"],
    ["black", "#1E1E1E", "Beltza", "Negro"],
    ["white", "#FFFFFF", "Zuria", "Blanco"],
    ["gold", "#C9A54C", "Urre kolorea", "Dorado"],
  ];

  const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

  // Line icons (24px grid, 2px stroke)
  const ICONS = {
    check: '<path d="M20 6 9 17l-5-5"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    external: '<path d="M7 17 17 7M8 7h9v9"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  };
  const icon = (name, cls) =>
    `<svg class="icon${cls ? " " + cls : ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

  const TREE = `<svg class="footer-tree" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3l4.5 6h-2l3.5 4.5h-2.5L19 18H5l3.5-4.5H6L9.5 9h-2L12 3z"/><rect x="11" y="18" width="2" height="3" rx=".5"/></svg>`;

  const BOW = `<svg class="festive-bow" viewBox="0 0 72 48" aria-hidden="true">
      <path class="bow-loop" d="M33 23l-9 21 5-3 2 5 5-22z"/>
      <path class="bow-loop" d="M39 23l9 21-5-3-2 5-5-22z"/>
      <path class="bow-loop" d="M36 20C30 8 14 2 9 9c-5 7 3 17 27 13z"/>
      <path class="bow-loop" d="M36 20c6-12 22-18 27-11 5 7-3 17-27 13z"/>
      <path class="bow-inner" d="M36 21c-8-6-17-9-20-7-3 3 4 8 20 7z"/>
      <path class="bow-inner" d="M36 21c8-6 17-9 20-7 3 3-4 8-20 7z"/>
      <rect class="bow-knot" x="31" y="15" width="10" height="11" rx="3"/>
    </svg>`;

  // ── Small helpers ───────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const app = $("#app");

  const esc = (v) =>
    String(v ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const str = (v) => (typeof v === "string" ? v : v == null ? "" : String(v));
  const arr = (v) => (Array.isArray(v) ? v.map(str).filter(Boolean) : []);
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const blankWish = () => ({ text: "", link: "" });

  const LS = {
    get(k, fallback) {
      try {
        const v = localStorage.getItem(k);
        return v === null ? fallback : JSON.parse(v);
      } catch {
        return fallback;
      }
    },
    set(k, v) {
      try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ }
    },
    del(k) {
      try { localStorage.removeItem(k); } catch { /* ignore */ }
    },
  };
  const KEY = { lang: "la.lang", me: "la.me", demo: "la.demo.lists" };

  // ── State ───────────────────────────────────────────────
  const savedMe = LS.get(KEY.me, null);
  const state = {
    lang: LS.get(KEY.lang, "eu") === "es" ? "es" : "eu",
    me: savedMe && PEOPLE.includes(savedMe) ? savedMe : null,
    lists: {},
    loadedOnce: false,
    loadError: false,
    draft: null,
    dirty: false,
    saving: false,
  };

  function t(key, vars) {
    let s = T[state.lang][key] ?? T.eu[key] ?? key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
    return s;
  }
  // Last two entries of every option tuple are [euskera, castellano].
  const label = (opt) => opt[opt.length - (state.lang === "es" ? 1 : 2)];

  function seasonYear() {
    const d = new Date();
    return d.getMonth() >= 6 ? d.getFullYear() : d.getFullYear() - 1;
  }

  // ── Data layer ──────────────────────────────────────────
  let client = null;
  function sb() {
    if (!client) {
      if (!window.supabase || !window.supabase.createClient) {
        throw new Error("supabase-js could not be loaded");
      }
      // Accept the URL with or without a trailing "/rest/v1/": the client adds that itself.
      const raw = String(CFG.supabaseUrl).trim();
      let url;
      try { url = new URL(raw).origin; } catch { url = raw.replace(/\/+(rest\/v1\/?)?$/i, ""); }
      client = window.supabase.createClient(url, String(CFG.supabaseKey).trim(), {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      });
    }
    return client;
  }

  const api = CONFIGURED
    ? {
        async list() {
          const { data, error } = await sb().from("wishlists").select("*");
          if (error) throw error;
          return data || [];
        },
        async save(row) {
          const { data, error } = await sb()
            .from("wishlists")
            .upsert(row, { onConflict: "person" })
            .select()
            .single();
          if (error) throw error;
          return data;
        },
      }
    : {
        // Demo mode: everything lives in this browser only.
        async list() {
          return Object.values(LS.get(KEY.demo, {}));
        },
        async save(row) {
          const all = LS.get(KEY.demo, {});
          all[row.person] = row;
          LS.set(KEY.demo, all);
          return row;
        },
      };

  function normalize(row, person) {
    const r = row || {};
    return {
      person: person || str(r.person),
      themes: arr(r.themes),
      styles: arr(r.styles),
      colors: arr(r.colors),
      clothing_size: str(r.clothing_size),
      shoe_size: str(r.shoe_size),
      items: Array.isArray(r.items)
        ? r.items.filter(Boolean).map((i) => ({ text: str(i.text), link: str(i.link) }))
        : [],
      avoid: str(r.avoid),
      notes: str(r.notes),
      updated_at: r.updated_at || null,
    };
  }

  function hasContent(r) {
    return Boolean(
      r &&
        (r.themes.length || r.styles.length || r.colors.length || r.clothing_size || r.shoe_size ||
          r.items.some((i) => i.text || i.link) || r.avoid || r.notes)
    );
  }

  let loadPromise = null;
  function loadLists() {
    if (loadPromise) return loadPromise;
    loadPromise = (async () => {
      try {
        const rows = await api.list();
        const map = {};
        rows.forEach((r) => {
          if (r && r.person) map[r.person] = normalize(r);
        });
        state.lists = map;
        state.loadedOnce = true;
        state.loadError = false;
        // Fresh data: rebuild the draft next time "my list" opens (never while typing in it).
        if (!state.dirty && route().name !== "me") state.draft = null;
      } catch (err) {
        console.error("[lagun-aurkitua] load failed:", err);
        if (!state.loadedOnce) state.loadError = true;
      } finally {
        loadPromise = null;
      }
    })();
    return loadPromise;
  }

  function refresh() {
    const wasLoaded = state.loadedOnce;
    return loadLists().then(() => {
      // Don't re-render the form under someone's fingers.
      if (route().name === "me" && wasLoaded) return;
      render();
    });
  }

  // ── URLs & links ────────────────────────────────────────
  function safeHref(s) {
    try {
      const u = new URL(s);
      return u.protocol === "http:" || u.protocol === "https:" ? u.href : null;
    } catch {
      return null;
    }
  }

  function normalizeUrl(raw) {
    const s = str(raw).trim();
    if (!s) return "";
    if (/^https?:\/\//i.test(s)) return safeHref(s) || s;
    if (/^(www\.)?[\w-]+(\.[\w-]+)*\.[a-z]{2,}([/?#:]|$)/i.test(s)) return safeHref("https://" + s) || s;
    return s; // not a link: kept as plain text
  }

  function hostOf(href) {
    try {
      return new URL(href).hostname.replace(/^www\./, "");
    } catch {
      return href;
    }
  }

  // Escape text and turn http(s)/www links into anchors.
  function linkify(text) {
    const re = /(?:https?:\/\/|www\.)[^\s<>"']+/gi;
    let out = "";
    let last = 0;
    let m;
    while ((m = re.exec(text))) {
      let url = m[0];
      const trail = (url.match(/[.,;:!?)\]]+$/) || [""])[0];
      url = url.slice(0, url.length - trail.length);
      const href = safeHref(/^www\./i.test(url) ? "https://" + url : url);
      out += esc(text.slice(last, m.index));
      out += href
        ? `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(url)}</a>`
        : esc(url);
      out += esc(trail);
      last = m.index + m[0].length;
    }
    return out + esc(text.slice(last));
  }

  function fmtDate(iso) {
    try {
      return new Intl.DateTimeFormat(state.lang === "es" ? "es-ES" : "eu-ES", {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(iso));
    } catch {
      return new Date(iso).toLocaleString();
    }
  }

  // ── Routing ─────────────────────────────────────────────
  function route() {
    const h = location.hash.replace(/^#\/?/, "");
    const [name, ...rest] = h.split("/");
    let arg = null;
    if (rest.length) {
      try { arg = decodeURIComponent(rest.join("/")); } catch { arg = rest.join("/"); }
    }
    return { name: name || "", arg };
  }

  function go(hash) {
    if (location.hash === hash) onRoute();
    else location.hash = hash;
  }

  function onRoute() {
    const r = route();
    if (!state.me && r.name !== "") return location.replace("#/");
    if (state.me && !["me", "others", "view"].includes(r.name)) return location.replace("#/me");
    if (r.name === "view" && (!PEOPLE.includes(r.arg) || r.arg === state.me)) return location.replace("#/others");

    render();
    window.scrollTo(0, 0);
    // Keep data fresh when looking at other people's lists.
    if (r.name !== "me" || !state.loadedOnce) refresh();
  }

  // ── Rendering ───────────────────────────────────────────
  function render() {
    document.documentElement.lang = state.lang;
    renderChrome();

    const r = route();
    let html;
    if (!state.me) html = viewWho();
    else if (r.name === "others") html = viewOthers();
    else if (r.name === "view") html = viewPerson(r.arg);
    else html = viewMine();

    app.innerHTML = html;
    if (state.me && r.name === "me") updateSaveBar();
  }

  function renderChrome() {
    document.querySelectorAll("[data-lang]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.lang === state.lang))
    );
    $("#banner").innerHTML = CONFIGURED
      ? ""
      : `<div class="notice" role="note">${icon("info")}<p>${esc(t("demo"))}</p></div>`;
    $("#footer").innerHTML = `${TREE}<span>Saizar Familia · ${esc(t("footer"))}</span>`;
  }

  // Bauble avatars cycle red → green → gold.
  const BAUBLES = ["", " is-green", " is-gold"];
  function avatar(name, large) {
    const initial = ([...name][0] || "?").toUpperCase();
    const tone = BAUBLES[Math.max(0, PEOPLE.indexOf(name)) % BAUBLES.length];
    return `<span class="avatar${tone}${large ? " avatar-lg" : ""}" aria-hidden="true">${esc(initial)}</span>`;
  }

  // Wrapped-gift hero used at the top of every screen.
  function festive({ eyebrow, title, lead, meta, action, avatarHtml }) {
    return `
      <section class="festive">
        <span class="festive-ribbon" aria-hidden="true"></span>
        ${BOW}
        <div class="festive-body">
          ${avatarHtml || ""}
          <div class="festive-main">
            ${eyebrow ? `<p class="festive-eyebrow">${esc(eyebrow)}</p>` : ""}
            <h1 class="festive-title">${esc(title)}</h1>
            ${lead ? `<p class="festive-lead">${esc(lead)}</p>` : ""}
            ${meta ? `<p class="festive-meta">${esc(meta)}</p>` : ""}
            ${action || ""}
          </div>
        </div>
      </section>`;
  }

  function emptyState(iconName, title, text, extra) {
    return `
      <div class="empty">
        <span class="empty-icon">${icon(iconName)}</span>
        <h2 class="empty-title">${esc(title)}</h2>
        ${text ? `<p class="empty-text">${esc(text)}</p>` : ""}
        ${extra || ""}
      </div>`;
  }

  const loadingHtml = () =>
    `<div class="loading" role="status"><span class="spinner" aria-hidden="true"></span><span>${esc(t("loading"))}</span></div>`;

  const errorHtml = () =>
    emptyState(
      "alert",
      t("loadError"),
      t("loadErrorLead"),
      `<button type="button" class="btn btn-secondary" data-action="retry">${esc(t("retry"))}</button>`
    );

  function subHeader(active) {
    const cur = (k) => (k === active ? ' aria-current="page"' : "");
    return `
      ${festive({
        eyebrow: t("eyebrow", { year: seasonYear() }),
        title: t("hello", { name: state.me }),
        action: `<button type="button" class="festive-action" data-action="not-me">${esc(t("notMe"))}</button>`,
      })}
      <nav class="segmented tabs" aria-label="${esc(t("tabsLabel"))}">
        <a class="segment" href="#/me"${cur("me")}>${esc(t("tabMine"))}</a>
        <a class="segment" href="#/others"${cur("others")}>${esc(t("tabOthers"))}</a>
      </nav>`;
  }

  function section(title, hint, body) {
    return `
      <section class="section">
        <div class="section-head">
          <h2 class="section-title">${esc(title)}</h2>
          ${hint ? `<p class="section-hint">${esc(hint)}</p>` : ""}
        </div>
        ${body}
      </section>`;
  }

  // Screen 1 — who are you?
  function viewWho() {
    if (!PEOPLE.length) return emptyState("users", t("noPeople"), t("noPeopleLead"));
    return `
      ${festive({ eyebrow: t("eyebrow", { year: seasonYear() }), title: t("whoTitle"), lead: t("whoLead") })}
      <ul class="person-list" role="list">
        ${PEOPLE.map(
          (p) => `
          <li>
            <button type="button" class="person-row" data-pick="${esc(p)}">
              ${avatar(p)}
              <span class="person-main"><span class="person-name">${esc(p)}</span></span>
              ${icon("chevronRight", "row-chevron")}
            </button>
          </li>`
        ).join("")}
      </ul>`;
  }

  // Screen 2 — my list (editor)
  function chipGroup(field, options, selected, title) {
    return `<div class="chips" role="group" aria-label="${esc(title)}">${options
      .map(
        (o) =>
          `<button type="button" class="chip" data-toggle="${field}" data-value="${o[0]}" aria-pressed="${selected.includes(o[0])}">` +
          `${icon("check", "chip-check")}${esc(label(o))}</button>`
      )
      .join("")}</div>`;
  }

  function colorGroup(selected) {
    return `<div class="chips" role="group" aria-label="${esc(t("secColors"))}">${COLORS.map(
      (c) =>
        `<button type="button" class="chip" data-toggle="colors" data-value="${c[0]}" aria-pressed="${selected.includes(c[0])}">` +
        `${icon("check", "chip-check")}<span class="swatch" style="--swatch:${c[1]}"></span>${esc(label(c))}</button>`
    ).join("")}</div>`;
  }

  function sizesFields(d) {
    return `
      <div class="field-grid">
        <div>
          <span class="field-label" id="lbl-clothing">${esc(t("clothing"))}</span>
          <div class="segmented segmented-fill" role="group" aria-labelledby="lbl-clothing">
            ${SIZES.map(
              (s) =>
                `<button type="button" class="segment" data-single="clothing_size" data-value="${s}" aria-pressed="${d.clothing_size === s}">${s}</button>`
            ).join("")}
          </div>
        </div>
        <div>
          <label class="field-label" for="shoe-size">${esc(t("shoes"))}</label>
          <input id="shoe-size" class="input" data-field="shoe_size" inputmode="decimal" maxlength="10"
            autocomplete="off" placeholder="${esc(t("shoesPh"))}" value="${esc(d.shoe_size)}">
        </div>
      </div>`;
  }

  function wishRows(items) {
    return items
      .map(
        (it, i) => `
        <div class="wish">
          <div class="wish-row">
            <input class="wish-input" data-field="item-text" data-index="${i}" maxlength="200"
              aria-label="${esc(t("wishLabel", { n: i + 1 }))}"
              placeholder="${esc(t("wishPh"))}" value="${esc(it.text)}">
            <button type="button" class="icon-btn" data-action="remove-wish" data-index="${i}"
              aria-label="${esc(t("remove"))}" title="${esc(t("remove"))}">${icon("x")}</button>
          </div>
          <label class="wish-row wish-row-link">
            ${icon("link")}
            <input class="wish-input wish-input-link" data-field="item-link" data-index="${i}" maxlength="800"
              inputmode="url" autocomplete="off" autocapitalize="off" spellcheck="false"
              aria-label="${esc(t("linkPh"))}"
              placeholder="${esc(t("linkPh"))}" value="${esc(it.link)}">
          </label>
        </div>`
      )
      .join("");
  }

  function ensureDraft() {
    if (state.draft && state.draft.person === state.me) return;
    state.draft = clone(normalize(state.lists[state.me], state.me));
    if (!state.draft.items.length) state.draft.items.push(blankWish());
    state.dirty = false;
  }

  function viewMine() {
    const head = subHeader("me");
    if (!state.loadedOnce) return head + (state.loadError ? errorHtml() : loadingHtml());
    ensureDraft();
    const d = state.draft;

    return `${head}
      <p class="intro">${esc(t("mineLead"))}</p>
      <div class="form">
        ${section(t("secThemes"), t("secThemesHint"), chipGroup("themes", THEMES, d.themes, t("secThemes")))}
        ${section(
          t("secWishes"),
          t("secWishesHint"),
          `<div class="wishes" id="wishes">${wishRows(d.items)}</div>
           <button type="button" class="text-btn text-btn-accent add-wish" id="add-wish" data-action="add-wish"${d.items.length >= MAX_WISHES ? " hidden" : ""}>${icon("plus")}${esc(t("addWish"))}</button>`
        )}
        ${section(t("secStyles"), t("secStylesHint"), chipGroup("styles", STYLES, d.styles, t("secStyles")))}
        ${section(t("secColors"), t("secColorsHint"), colorGroup(d.colors))}
        ${section(t("secSizes"), t("secSizesHint"), sizesFields(d))}
        ${section(
          t("secAvoid"),
          t("secAvoidHint"),
          `<textarea class="input textarea textarea-sm" data-field="avoid" rows="2" maxlength="1000" aria-label="${esc(t("secAvoid"))}"
             placeholder="${esc(t("avoidPh"))}">${esc(d.avoid)}</textarea>`
        )}
        ${section(
          t("secNotes"),
          t("secNotesHint"),
          `<textarea class="input textarea" data-field="notes" rows="4" maxlength="3000" aria-label="${esc(t("secNotes"))}"
             placeholder="${esc(t("notesPh"))}">${esc(d.notes)}</textarea>`
        )}
      </div>
      <div class="savebar">
        <p class="save-status" id="save-status"><span class="status-dot" aria-hidden="true"></span><span id="save-status-text"></span></p>
        <button type="button" class="btn btn-primary" id="save-btn" data-action="save">${esc(t("save"))}</button>
      </div>`;
  }

  function updateSaveBar() {
    const s = $("#save-status");
    const txt = $("#save-status-text");
    const b = $("#save-btn");
    if (!s || !txt || !b) return;
    const saved = state.lists[state.me];
    let st = "idle";
    let label_ = t("notSavedYet");
    if (state.dirty) {
      st = "dirty";
      label_ = t("unsaved");
    } else if (saved && saved.updated_at) {
      st = "clean";
      label_ = t("allSaved");
    }
    s.dataset.state = st;
    txt.textContent = label_;
    b.disabled = state.saving;
    b.textContent = state.saving ? t("saving") : t("save");
  }

  // Screen 3 — other people
  function viewOthers() {
    const head = subHeader("others");
    if (!state.loadedOnce) return head + (state.loadError ? errorHtml() : loadingHtml());
    const others = PEOPLE.filter((p) => p !== state.me);
    return `${head}
      <div class="section-head section-head-lg">
        <h2 class="section-title">${esc(t("othersTitle"))}</h2>
        <p class="section-hint">${esc(t("othersLead"))}</p>
      </div>
      <ul class="person-list" role="list">
        ${others
          .map((p) => {
            const ok = hasContent(state.lists[p]);
            return `
            <li>
              <a class="person-row" href="#/view/${encodeURIComponent(p)}">
                ${avatar(p)}
                <span class="person-main">
                  <span class="person-name">${esc(p)}</span>
                  <span class="person-status${ok ? " is-done" : ""}">${ok ? icon("check") : ""}${esc(ok ? t("statusReady") : t("statusEmpty"))}</span>
                </span>
                ${icon("chevronRight", "row-chevron")}
              </a>
            </li>`;
          })
          .join("")}
      </ul>`;
  }

  function tagList(options, ids, isColor) {
    const picked = options.filter((o) => ids.includes(o[0]));
    if (!picked.length) return "";
    return `<div class="chips">${picked
      .map(
        (o) =>
          `<span class="tag">${isColor ? `<span class="swatch" style="--swatch:${o[1]}"></span>` : ""}${esc(label(o))}</span>`
      )
      .join("")}</div>`;
  }

  function wishItem(it) {
    const href = safeHref(normalizeUrl(it.link));
    const text = it.text ? `<p class="wish-item-text">${esc(it.text)}</p>` : "";
    let link = "";
    if (href) {
      link = `<a class="wish-item-link" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(hostOf(href))}${icon("external")}</a>`;
    } else if (it.link) {
      link = `<p class="wish-item-raw">${esc(it.link)}</p>`;
    }
    return `<li class="wish-item">${icon("gift", "wish-item-icon")}<div class="wish-item-main">${text}${link}</div></li>`;
  }

  function viewPerson(name) {
    const back = `<a class="back-link" href="#/others">${icon("chevronLeft")}${esc(t("back"))}</a>`;
    if (!state.loadedOnce) return back + (state.loadError ? errorHtml() : loadingHtml());
    const row = state.lists[name];
    const filled = hasContent(row);

    const top = `
      ${back}
      ${festive({
        eyebrow: t("listOf"),
        title: name,
        meta: filled && row.updated_at ? t("updated", { date: fmtDate(row.updated_at) }) : "",
        avatarHtml: avatar(name, true),
      })}`;

    if (!filled) return top + emptyState("gift", t("emptyTitle"), t("emptyLead"));

    const parts = [];
    const items = row.items.filter((i) => i.text || i.link);
    if (items.length) parts.push(section(t("vWishes"), "", `<ul class="wish-list" role="list">${items.map(wishItem).join("")}</ul>`));
    const themes = tagList(THEMES, row.themes);
    if (themes) parts.push(section(t("vThemes"), "", themes));
    const styles = tagList(STYLES, row.styles);
    if (styles) parts.push(section(t("vStyles"), "", styles));
    const colors = tagList(COLORS, row.colors, true);
    if (colors) parts.push(section(t("vColors"), "", colors));
    if (row.clothing_size || row.shoe_size) {
      parts.push(
        section(
          t("vSizes"),
          "",
          `<dl class="facts">
            ${row.clothing_size ? `<div class="fact"><dt>${esc(t("clothing"))}</dt><dd>${esc(row.clothing_size)}</dd></div>` : ""}
            ${row.shoe_size ? `<div class="fact"><dt>${esc(t("shoes"))}</dt><dd>${esc(row.shoe_size)}</dd></div>` : ""}
          </dl>`
        )
      );
    }
    if (row.avoid) parts.push(section(t("vAvoid"), "", `<p class="prose">${linkify(row.avoid)}</p>`));
    if (row.notes) parts.push(section(t("vNotes"), "", `<p class="prose">${linkify(row.notes)}</p>`));

    return `${top}<div class="details">${parts.join("")}</div>`;
  }

  // ── Actions ─────────────────────────────────────────────
  function markDirty() {
    state.dirty = true;
    updateSaveBar();
  }

  function pick(name) {
    if (!PEOPLE.includes(name)) return;
    state.me = name;
    state.draft = null;
    state.dirty = false;
    LS.set(KEY.me, name);
    go("#/me");
  }

  function notMe() {
    if (state.dirty && !window.confirm(t("discard"))) return;
    state.me = null;
    state.draft = null;
    state.dirty = false;
    LS.del(KEY.me);
    go("#/");
  }

  function setLang(lang) {
    if (lang !== "eu" && lang !== "es") return;
    state.lang = lang;
    LS.set(KEY.lang, lang);
    render();
  }

  function rerenderWishes(focusIndex) {
    const box = $("#wishes");
    if (!box) return;
    box.innerHTML = wishRows(state.draft.items);
    const add = $("#add-wish");
    if (add) add.hidden = state.draft.items.length >= MAX_WISHES;
    if (focusIndex != null) {
      const el = box.querySelector(`[data-field="item-text"][data-index="${focusIndex}"]`);
      if (el) el.focus();
    }
  }

  function cleanRow(d) {
    return {
      person: state.me,
      themes: d.themes.slice(),
      styles: d.styles.slice(),
      colors: d.colors.slice(),
      clothing_size: d.clothing_size.trim(),
      shoe_size: d.shoe_size.trim(),
      items: d.items
        .map((i) => ({ text: i.text.trim(), link: normalizeUrl(i.link) }))
        .filter((i) => i.text || i.link),
      avoid: d.avoid.trim(),
      notes: d.notes.trim(),
      updated_at: new Date().toISOString(),
    };
  }

  async function save() {
    if (state.saving || !state.draft || !state.me) return;
    const who = state.me;
    const row = cleanRow(state.draft);
    state.saving = true;
    updateSaveBar();
    try {
      const saved = normalize(await api.save(row), who);
      state.lists[who] = saved;
      if (state.me === who) {
        state.draft = clone(saved);
        if (!state.draft.items.length) state.draft.items.push(blankWish());
        state.dirty = false;
      }
      state.saving = false;
      if (route().name === "me") render();
      toast(t("saved"));
    } catch (err) {
      console.error("[lagun-aurkitua] save failed:", err);
      state.saving = false;
      updateSaveBar();
      toast(t("saveError"), true);
    }
  }

  // ── Toast ───────────────────────────────────────────────
  let toastTimer;
  function toast(msg, isError) {
    const el = $("#toast");
    el.innerHTML = `${icon(isError ? "alert" : "check")}<span>${esc(msg)}</span>`;
    el.className = "toast show" + (isError ? " error" : "");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.className = "toast" + (isError ? " error" : "");
    }, isError ? 4000 : 2200);
  }

  // ── Events ──────────────────────────────────────────────
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-lang],[data-pick],[data-toggle],[data-single],[data-action]");
    if (!el) return;

    if (el.dataset.lang) return setLang(el.dataset.lang);
    if (el.dataset.pick) return pick(el.dataset.pick);

    if (el.dataset.toggle && state.draft) {
      const list = state.draft[el.dataset.toggle];
      const i = list.indexOf(el.dataset.value);
      if (i >= 0) list.splice(i, 1);
      else list.push(el.dataset.value);
      el.setAttribute("aria-pressed", String(i < 0));
      return markDirty();
    }

    if (el.dataset.single && state.draft) {
      const field = el.dataset.single;
      state.draft[field] = state.draft[field] === el.dataset.value ? "" : el.dataset.value;
      el.parentElement.querySelectorAll("[data-single]").forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.value === state.draft[field]))
      );
      return markDirty();
    }

    switch (el.dataset.action) {
      case "not-me":
        return notMe();
      case "save":
        return save();
      case "retry":
        state.loadError = false;
        render();
        return refresh();
      case "add-wish":
        if (!state.draft || state.draft.items.length >= MAX_WISHES) return;
        state.draft.items.push(blankWish());
        return rerenderWishes(state.draft.items.length - 1);
      case "remove-wish": {
        if (!state.draft) return;
        state.draft.items.splice(Number(el.dataset.index), 1);
        if (!state.draft.items.length) state.draft.items.push(blankWish());
        rerenderWishes();
        return markDirty();
      }
    }
  });

  app.addEventListener("input", (e) => {
    const el = e.target;
    const field = el.dataset && el.dataset.field;
    if (!field || !state.draft) return;
    if (field === "item-text" || field === "item-link") {
      const item = state.draft.items[Number(el.dataset.index)];
      if (!item) return;
      item[field === "item-text" ? "text" : "link"] = el.value;
    } else {
      state.draft[field] = el.value;
    }
    markDirty();
  });

  // Enter in a wish → jump to the next field / add a new wish.
  app.addEventListener("keydown", (e) => {
    const el = e.target;
    if (e.key !== "Enter" || !state.draft || !el.dataset || !el.dataset.field || !el.dataset.field.startsWith("item-")) return;
    e.preventDefault();
    const i = Number(el.dataset.index);
    if (el.dataset.field === "item-text") {
      const link = app.querySelector(`[data-field="item-link"][data-index="${i}"]`);
      if (link) link.focus();
    } else if (i === state.draft.items.length - 1 && state.draft.items.length < MAX_WISHES) {
      state.draft.items.push(blankWish());
      rerenderWishes(i + 1);
    } else {
      const next = app.querySelector(`[data-field="item-text"][data-index="${i + 1}"]`);
      if (next) next.focus();
    }
  });

  // Ctrl/Cmd + S saves.
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s" && state.me && route().name === "me") {
      e.preventDefault();
      save();
    }
  });

  window.addEventListener("beforeunload", (e) => {
    if (state.dirty) {
      e.preventDefault();
      e.returnValue = "";
    }
  });

  window.addEventListener("hashchange", onRoute);

  // ── Boot ────────────────────────────────────────────────
  onRoute();
})();
