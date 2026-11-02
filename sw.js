/* Trabajador del navegador de Mantenimientos BRC.
   En los teléfonos las notificaciones solo se pueden mostrar a través de él. */
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (ev) { ev.waitUntil(self.clients.claim()); });

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
