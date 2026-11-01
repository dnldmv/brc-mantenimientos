/* =====================================================================
   Buffalo Ribs Company · Mantenimientos y proyectos
   Conexión con el servidor.

   Los dos primeros valores salen del panel de Supabase:
     - supabaseUrl      = botón "Connect", arriba: el "Project URL"
     - supabaseAnonKey  = Settings -> API Keys: la clave "publishable"
                          (o la antigua "anon public", si es la que ves)

   Esa clave es pública a propósito: por sí sola no da acceso a nada.
   Quien manda son las reglas del archivo esquema.sql, que exigen haber
   iniciado sesión y comprueban el perfil en el servidor.
   ===================================================================== */
window.CONFIG = {
  supabaseUrl: "https://pphihisjhqxsnapfmtzj.supabase.co",
  supabaseAnonKey: "sb_publishable_tdmcMt1d2h539NQnwzgItg_8C32eryV",

  /* Los dos usuarios que creaste en Authentication -> Users.
     Si usaste otros correos, cámbialos aquí y también en esquema.sql. */
  correoCoordinador: "coordinador@buffaloribs.app",
  correoGerencia: "gerencia@buffaloribs.app"
};
