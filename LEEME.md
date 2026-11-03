# Buffalo Ribs Company · Mantenimientos y proyectos

Tablero de control de los mantenimientos de los cinco puntos de venta.

Son archivos sueltos: no hay nada que compilar ni instalar.

```
index.html      la aplicación entera
config.js       dirección y clave del servidor  <- el único archivo que editas
vendor/         librería de Supabase, incluida en el proyecto
img/            logotipos
```

> **Lo que no está aquí, y por qué.** El esquema de la base, los datos de
> octubre y los 9 PDF de soportes **no** van en este repositorio. Todo lo que
> esté aquí queda publicado en internet y cualquiera con la dirección exacta
> podría descargarlo, sin contraseña. Esos archivos se cargan una sola vez,
> directamente en Supabase, y viven solo ahí.

---

## Montaje, una sola vez

### 1. Crear el proyecto en Supabase

1. Entra a <https://supabase.com> y crea una cuenta gratuita.
2. **New project**, de nombre `brc-mantenimientos`.
3. Región **East US (North Virginia)**, la más cercana a Colombia.
4. Guarda la contraseña de base de datos que te pide. No es ninguna de las dos
   del tablero; es la del servidor y casi no se usa.

### 2. Crear los dos usuarios

**Authentication → Users → Add user**, marcando **Auto Confirm User**:

| Correo | Perfil |
|---|---|
| `coordinador@buffaloribs.app` | Coordinación de mantenimiento |
| `gerencia@buffaloribs.app` | Gerencia |

Las contraseñas las eliges tú: son las que pedirá el tablero. Mínimo 8
caracteres.

> Los correos no tienen que existir de verdad, son la identificación interna de
> cada perfil. Si usas otros, cámbialos en `config.js` y en `esquema.sql`.

### 3. Cargar el esquema

**SQL Editor → New query**, pega `esquema.sql` completo y pulsa **Run**.

Al final debe mostrar dos filas, una por perfil. Si sale vacío, los correos del
paso 2 no coinciden con los del archivo.

### 4. Subir los soportes

**Storage → soportes → Create folder**, llámala `historico`. Entra y arrastra
los 9 PDF de la carpeta `soportes/`. Los nombres deben quedar tal cual.

### 5. Cargar los mantenimientos

**SQL Editor → New query**, pega `migracion.sql` y pulsa **Run**. Debe
responder 14.

### 6. Conectar el tablero

Supabase quitó la página «Settings → API». Ahora son dos sitios distintos:

**La dirección del proyecto.** Botón **Connect**, arriba del todo en el panel.
Se abre una ventana con un bloque de código donde aparece el **Project URL**,
algo como `https://abcdefgh.supabase.co`. Ese valor va en `supabaseUrl`.

**La clave.** Menú lateral **Settings → API Keys**. Copia la clave
**publishable** (empieza por `sb_publishable_`). Si tu proyecto todavía
muestra la antigua **anon public**, esa también sirve. Va en
`supabaseAnonKey`.

> Esa clave queda a la vista en el código del sitio, y está bien: por sí sola
> no abre nada. Quien decide qué puede hacer cada quien son las reglas del
> paso 3, que corren en el servidor. La clave **secret** o `service_role`
> **nunca** va aquí.

### 7. Publicar el sitio

1. Entra a <https://dash.cloudflare.com> y crea una cuenta gratuita.
2. **Workers & Pages → Create → Pages → Connect to Git**, elige este
   repositorio.
3. Configuración de compilación, todo vacío:
   - Framework preset: `None`
   - Build command: *(vacío)*
   - Build output directory: `/`
4. **Save and Deploy**.

Queda en una dirección tipo `brc-mantenimientos.pages.dev`, y a partir de ahí
cada versión nueva que se suba al repositorio se publica sola en un par de
minutos.

---

## Uso diario

Al entrar se elige perfil y se escribe su contraseña.

- **Coordinador**: registra, edita, cierra mantenimientos, adjunta soportes,
  marca pagos y cambia su estado y ubicación.
- **Gerencia**: consulta todo y abre los soportes. No modifica nada.

Que la gerencia no pueda modificar **no depende de la página**: lo impide el
servidor. Aunque alguien manipulara el navegador, la base rechaza la escritura.

### Cambiar contraseñas

- **La tuya**: en el tablero, **Opciones → Cambiar mi contraseña**.
- **La de gerencia**: en Supabase, **Authentication → Users**, los tres puntos
  del usuario → **Reset password**.

No se pueden consultar en ningún lado, solo reemplazar. Es lo correcto, aunque
sea menos cómodo que antes.

---

## Cosas que conviene saber

**El proyecto gratuito de Supabase se suspende** si pasa una semana entera sin
usarse. Se reactiva con un clic, sin perder nada. Con uso normal no ocurre.

**Los límites del plan gratuito** quedan lejos de lo que necesitas: 500 MB de
base y 1 GB de archivos. Los 9 soportes actuales ocupan 1,2 MB.

**No hay copias de seguridad** en el plan gratuito. Descarga el CSV de vez en
cuando, o pídeme que montemos una copia automática.

**Para poner tu propio dominio** (`mantenimiento.buffaloribs.com` o similar):
Cloudflare Pages → **Custom domains → Set up a custom domain**. No cuesta nada,
pero hay que tener el dominio y poder tocar su configuración.

---

## Para actualizar la aplicación

Me pides el cambio, yo lo subo al repositorio y Cloudflare publica la versión
nueva sola.

Los datos no se tocan al actualizar: viven en Supabase, no en el código.

Si un cambio no aparece en la app después de unos minutos (por ejemplo, por una falla de
los builds de Cloudflare), en el panel de Cloudflare: Workers & Pages › brc-mantenimientos ›
Deployments › Retry. El estado de Cloudflare se consulta en https://www.cloudflarestatus.com.
