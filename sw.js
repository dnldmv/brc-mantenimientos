/* Trabajador del navegador de Mantenimientos BRC.
   En los teléfonos las notificaciones solo se pueden mostrar a través de él. */
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (ev) { ev.waitUntil(self.clients.claim()); });

/* Aviso push del servidor: llega aunque la app esté cerrada. */
self.addEventListener("push", function (ev) {
  var d = {};
  try {
    d = ev.data ? ev.data.json() : {};
  } catch (e) {
    d = { cuerpo: ev.data ? ev.data.text() : "" };
  }
  ev.waitUntil(self.registration.showNotification(d.titulo || "Mantenimientos BRC", {
    body: d.cuerpo || "",
    tag: d.etiqueta || undefined,
    icon: "img/brc-logo-color.svg"
  }));
});

/* Al tocar la notificación se abre (o se trae al frente) el tablero. */
self.addEventListener("notificationclick", function (ev) {
  ev.notification.close();
  ev.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (lista) {
      for (var i = 0; i < lista.length; i++) {
        if ("focus" in lista[i]) return lista[i].focus();
      }
      return self.clients.openWindow("./");
    })
  );
});
