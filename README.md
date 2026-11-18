# Saizar Familia · Lagun Aurkitua 🎁

Web sencilla para el amigo invisible de la familia: cada uno elige quién es, escribe su lista de deseos y puede ver la de los demás. En euskera (por defecto) y castellano. Sin login.

```
index.html     → la página
styles.css     → el diseño
app.js         → la lógica
config.js      → ⚙️ LO ÚNICO QUE TIENES QUE EDITAR (nombres + claves de Supabase)
supabase.sql   → el script para crear la tabla en Supabase
```

---

## 0. Probarla ya mismo (sin Supabase)

Con `config.js` sin claves, la web funciona en **modo prueba**: guarda los datos solo en tu navegador.

```bash
cd lagunAurkitua
python3 -m http.server 8000
```

Abre <http://localhost:8000>.

---

## 1. Pon los nombres de la familia

En `config.js`, cambia la lista `people` por los nombres reales, en el orden en que quieras que salgan:

```js
people: ["Amona", "Aitona", "Ane", "Jon"],
```

> ⚠️ El nombre es la "clave" de cada lista. Si cambias un nombre cuando esa persona ya ha escrito algo, su lista se queda con el nombre antiguo (se puede renombrar en Supabase → Table Editor).

---

## 2. Crear la cuenta y el proyecto en Supabase (gratis)

1. Entra en <https://supabase.com> y pulsa **Start your project**. Lo más fácil es registrarte con tu cuenta de **GitHub**.
2. Si te lo pide, crea una **organización** (nombre cualquiera, plan **Free**).
3. Pulsa **New project**:
   - **Name:** `lagun-aurkitua`
   - **Database password:** genera una y guárdala (esta web no la necesita, pero no la pierdas).
   - **Region:** una de Europa (p. ej. *West EU (Ireland)* o *Central EU (Frankfurt)*).
   - Deja activada la opción **Data API** si aparece.
4. Pulsa **Create new project** y espera 1–2 minutos a que esté listo.

## 3. Crear la tabla

1. En el menú de la izquierda, ve a **SQL Editor**.
2. Pulsa **New query** (o "+").
3. Copia **todo** el contenido de `supabase.sql`, pégalo y pulsa **Run**.
4. Debería salir *"Success. No rows returned"*. Puedes comprobarlo en **Table Editor**: verás la tabla `wishlists` (vacía).

## 4. Copiar la URL y la clave a `config.js`

1. Pulsa el botón **Connect** de arriba, o ve a **Project Settings** (⚙️) → **API Keys** / **Data API**.
2. Copia:
   - **Project URL**: algo como `https://abcdefghijkl.supabase.co`
   - **Publishable key**: empieza por `sb_publishable_...`
     (si solo ves "Legacy API keys", usa la que se llama **anon / public**).
3. Pégalas en `config.js`:

```js
supabaseUrl: "https://abcdefghijkl.supabase.co",
supabaseKey: "sb_publishable_xxxxxxxxxxxxxxxx",
```

4. Recarga <http://localhost:8000>. El aviso amarillo de "modo prueba" desaparece. Escribe algo, guarda, y verás la fila en **Table Editor → wishlists**.

> 🔒 La *publishable / anon key* **está pensada para ir en la web** y puede subirse a GitHub sin problema. **Nunca** pongas la *secret key* ni la *service_role key*.

---

## 5. Publicarla en GitHub Pages

**Opción fácil (desde la web de GitHub, sin comandos):**

1. En <https://github.com/new> crea un repositorio, p. ej. `lagun-aurkitua`. Tiene que ser **Public** (GitHub Pages gratis lo necesita).
2. En el repo vacío: **Add file → Upload files**. Arrastra `index.html`, `styles.css`, `app.js`, `config.js` (y si quieres `README.md` y `supabase.sql`). **Commit changes**.
3. Ve a **Settings → Pages**:
   - **Source:** *Deploy from a branch*
   - **Branch:** `main` y carpeta `/ (root)` → **Save**.
4. En 1–2 minutos estará en `https://TU-USUARIO.github.io/lagun-aurkitua/`. Esa es la URL que mandas al grupo de la familia.

**Opción con git:**

```bash
cd lagunAurkitua
git init -b main
git add .
git commit -m "Lagun Aurkitua"
git remote add origin https://github.com/TU-USUARIO/lagun-aurkitua.git
git push -u origin main
```

y luego el paso 3 de arriba.

---

## Cosas a tener en cuenta

- **Sin login = confianza.** Cualquiera con el enlace puede escribir en la lista de cualquiera (aunque no borrarla). Para la familia vale; simplemente no compartas el enlace fuera.
- **La web recuerda quién eres** en cada móvil/ordenador. Si alguien usa un dispositivo compartido, tiene el botón **"Ez naiz ni / No soy yo"**.
- **Pausa de Supabase:** en el plan gratis, si nadie entra durante **7 días**, el proyecto se pausa. Si pasa, entra en el panel de Supabase y pulsa **Restore project**. Los datos no se pierden.
- **Ver/editar los datos a mano:** Supabase → **Table Editor → wishlists**.
- **Cambiar las opciones** (temáticas, tipos de regalo, colores, tallas): están al principio de `app.js` (`THEMES`, `STYLES`, `COLORS`, `SIZES`), cada una con su texto en euskera y castellano.

Eguberri on! ✦
