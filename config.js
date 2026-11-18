// ─────────────────────────────────────────────────────────────
//  Configuración de la web — este es el único archivo que tienes
//  que tocar.
// ─────────────────────────────────────────────────────────────
window.APP_CONFIG = {
  // 1) Supabase (mira README.md, paso 4).
  //    Si los dejas vacíos, la web funciona en "modo prueba" y guarda
  //    los datos solo en tu navegador (sirve para probarla).
  supabaseUrl: "https://ehnhdyjnejttkyikgccs.supabase.co/rest/v1/",   // ej: "https://abcdefghijkl.supabase.co"
  supabaseKey: "sb_publishable_xK2r0z2zHMUeqMs9Bo-p5w_xe1ZGqvY",   // la "Publishable key" (sb_publishable_...) o la "anon public"

  // 2) Personas de la familia (en el orden en que quieres que salgan).
  people: [
    "Amona",
    "Ana",
    "Attona",
    "Axi",
    "Ekhi",
    "Enaitz",
    "Eñaut",
    "Ioseba",
    "Jone",
    "Josu",
    "Laida",
    "Mikel",
    "Oier",
    "Onintze",
    "Silvia",
    "Urtzi",
    "Xabier",
    "Yolanda",
  ],
};
