/* ==========================================================
   Proveeduría UdeC — Prototipo navegable
   Encabezado, pie, menú con submenús, ventanas, mensajes
   e interacciones (pestañas, acordeones, rubros, carga).
   Sin backend: todo es simulado en el navegador.
   ========================================================== */
(function () {
  "use strict";

  /* ---------- Íconos (Material Icons, 24×24) ---------- */
  var P = {
    chevR: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
    chevL: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z",
    back: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
    phone: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
    mail: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
    search: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
    image: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z",
    payment: "M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z",
    personAdd: "M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    renew: "M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z",
    gavel: "M1 21h12v2H1zM5.245 8.07l2.83-2.827 14.14 14.142-2.828 2.828zM12.317 1l5.657 5.656-2.83 2.83-5.654-5.66zM3.825 9.485l5.657 5.657-2.828 2.828-5.657-5.657z",
    verified: "M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-13 5l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
    check: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
    tick: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
    doc: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",
    download: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z",
    place: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    close: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
    filter: "M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z",
    upload: "M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z",
    cloud: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z",
    ext: "M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z",
    info: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
    event: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z",
    groups: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
    eye: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",
    bank: "M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z",
    store: "M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z",
    warning: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z",
    clock: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",
    plus: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
    folder: "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z",
    lock: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
    expand: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z",
    business: "M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z",
    person: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    excel: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.2 14h-2.1L12 14.6 11.3 17H9.2l1.75-5L9.2 7h2.1L12 9.4l.7-2.4h2.1l-1.75 5 1.75 5z"
  };
  function icon(name, cls) {
    var d = P[name] || P.info;
    return '<span class="ic' + (cls ? " " + cls : "") + '" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="' + d + '"/></svg></span>';
  }
  window.icon = icon;
  function paintIcons(root) {
    (root || document).querySelectorAll("i[data-ic]").forEach(function (el) {
      var tmp = document.createElement("span");
      tmp.innerHTML = icon(el.getAttribute("data-ic"), el.className);
      if (el.getAttribute("style")) tmp.firstChild.setAttribute("style", el.getAttribute("style"));
      el.replaceWith(tmp.firstChild);
    });
  }

  /* ---------- Mapa del sitio ---------- */
  var NAV = [
    { id: "inicio", label: "Inicio", href: "index.html" },
    { id: "nosotros", label: "Nosotros", href: "nosotros-mision.html", foto: "Fotografía · Nosotros", sub: [
      ["Misión y visión", "nosotros-mision.html"], ["Política de calidad", "nosotros-calidad.html"],
      ["Funciones", "nosotros-funciones.html"], ["Directorio", "nosotros-directorio.html"],
      ["Ubicación y contacto", "nosotros-ubicacion.html"]] },
    { id: "marco", label: "Marco Normativo", href: "marco-universitaria.html", foto: "Fotografía · Marco Normativo", sub: [
      ["Normativa universitaria", "marco-universitaria.html"], ["Normativa estatal", "marco-estatal.html"],
      ["Normativa federal", "marco-federal.html"], ["Montos para solicitud de dictámenes", "marco-montos.html"]] },
    { id: "licitaciones", label: "Licitaciones", href: "licitaciones.html" },
    { id: "concursos", label: "Concursos", href: "concursos.html" },
    { id: "proveedores", label: "Proveedores", href: "requisitos.html", foto: "Fotografía · Proveedores", sub: [
      ["Registrarse como proveedor", "registro-paso1.html"], ["Renovación de registro", "renovacion.html"],
      ["Catálogo de proveedores vigentes", "catalogo.html"], ["Requisitos", "requisitos.html"]] },
    { id: "formatos", label: "Formatos", href: "formatos-proveedores.html", foto: "Fotografía · Formatos", sub: [
      ["Formatos para proveedores", "formatos-proveedores.html"], ["Formatos para dependencias", "formatos-dependencias.html"],
      ["Contratos", "formatos-contratos.html"], ["Transparencia", "formatos-transparencia.html"]] }
  ];
  var here = location.pathname.split("/").pop() || "index.html";

  function headerHTML(active) {
    var items = NAV.map(function (n) {
      var sub = "";
      if (n.sub) {
        sub = '<div class="submenu" role="menu"><div class="submenu__img">' + icon("image", "ic-40") +
          "<div>" + n.foto + "<br>(se cambia desde el CMS › Biblioteca de medios)</div></div>" +
          '<div class="submenu__ops">' + n.sub.map(function (s) {
            return '<a href="' + s[1] + '"' + (s[1] === here ? ' class="is-here"' : "") + ">" + s[0] + "</a>";
          }).join("") + "</div></div>";
      }
      return '<div class="nav__item' + (n.id === active ? " is-active" : "") + '"><a class="nav__btn" href="' + n.href + '">' + n.label + "</a>" + sub + "</div>";
    }).join("");
    return '' +
      '<div class="topbar"><div class="wrap">' +
        '<div class="topbar__l"><button data-toast="externo">Portal UdeC</button><button data-toast="externo">Transparencia</button><button data-toast="externo">Directorio institucional</button></div>' +
        '<div class="topbar__r"><button>' + icon("phone", "ic-14") + "(312) 316 11 18</button>" +
        '<button data-toast="correo">' + icon("mail", "ic-14") + "proveedores@ucol.mx</button></div>" +
      "</div></div>" +
      '<div class="mainbar"><div class="wrap">' +
        '<a class="logo" href="index.html"><img src="assets/img/escudo.png" alt="Universidad de Colima"><span class="logo__div"></span><span class="logo__txt">Dirección de Proveeduría<br>y Servicios</span></a>' +
        '<div class="mainbar__r"><button class="buscador" data-modal="buscar">' + icon("search") + "Buscar convocatoria, formato…</button>" +
        '<a class="btn" href="registro-paso1.html">Registrarse como proveedor' + icon("chevR") + "</a></div>" +
      "</div></div>" +
      '<nav class="nav" aria-label="Menú principal"><div class="wrap"><div class="nav__items">' + items + "</div></div></nav>";
  }

  function footerHTML() {
    return '' +
      '<div class="footer__franja"></div>' +
      '<div class="wrap footer__cols">' +
        '<div class="footer__marca">' +
          '<a class="logo" href="index.html"><img src="assets/img/escudo-blanco.png" alt="Universidad de Colima"><span class="logo__div"></span><span class="logo__txt">Dirección de Proveeduría<br>y Servicios</span></a>' +
          "<p>La Dirección de Proveeduría y Servicios atiende con transparencia los procesos de adquisición de bienes, arrendamientos y servicios de la Universidad de Colima.</p>" +
          '<img class="footer__frase" src="assets/img/pertinencia.png" alt="Pertinencia que transforma">' +
          '<a class="sello" href="nosotros-calidad.html">' + icon("verified") + "Proceso certificado ISO 9001:2015</a>" +
        "</div>" +
        '<div class="footer__col"><p class="overline">El sitio</p><a href="nosotros-mision.html">Nosotros</a><a href="marco-universitaria.html">Marco Normativo</a><a href="licitaciones.html">Licitaciones</a><a href="concursos.html">Concursos</a><a href="formatos-proveedores.html">Formatos</a></div>' +
        '<div class="footer__col"><p class="overline">Proveedores</p><a href="registro-paso1.html">Registrarse como proveedor</a><a href="renovacion.html">Renovación de registro</a><a href="catalogo.html">Catálogo de proveedores vigentes</a><a href="requisitos.html">Requisitos</a></div>' +
        '<div class="footer__col"><p class="overline">Contacto</p>' +
          '<a class="fila" href="https://www.google.com/maps/search/?api=1&query=Av.+Universidad+333,+Las+V%C3%ADboras,+28040+Colima,+Col." target="_blank" rel="noopener">' + icon("place") + '<span class="subr">Av. Universidad 333, Col. Las Víboras, C.P. 28040, Colima, Col.</span></a>' +
          '<button class="fila">' + icon("phone") + "(312) 316 11 18</button>" +
          '<button class="fila" data-toast="correo">' + icon("mail") + "proveedores@ucol.mx</button>" +
        "</div>" +
      "</div>" +
      '<div class="footer__legal"><div class="wrap"><span>© 2026 Universidad de Colima. Todos los derechos reservados.</span>' +
        '<span><button data-toast="externo">Aviso de privacidad</button>&nbsp;&nbsp; · &nbsp;&nbsp;<button data-toast="externo">Accesibilidad</button>&nbsp;&nbsp; · &nbsp;&nbsp;<button data-toast="externo">Mapa del sitio</button></span></div></div>';
  }

  /* Burbujas decorativas: coordenadas del marco de 1440 px de Figma */
  function deco(x, y, size, alpha) {
    return '<span class="deco" style="left:calc(50% + ' + (x - 720) + "px);top:" + y + "px;width:" + size + "px;height:" + size + "px;opacity:" + alpha + '"></span>';
  }

  function heroHTML(el) {
    var crumbs = (el.getAttribute("data-crumbs") || "").split("|").map(function (c) {
      var p = c.split("::");
      return p[1] ? '<a href="' + p[1] + '">' + p[0] + "</a>" : "<span>" + p[0] + "</span>";
    });
    crumbs.unshift('<a href="index.html">Inicio</a>');
    return deco(1080, -60, 260, .14) + deco(1250, 90, 160, .2) + deco(980, 140, 90, .18) + deco(1360, -20, 70, .25) +
      '<span class="curva" style="left:calc(50% - 1100px);top:212px;width:2200px;height:160px"></span>' +
      '<div class="wrap"><p class="crumbs">' + crumbs.join("  ›  ") + "</p><h1>" + el.getAttribute("data-title") + "</h1>" +
      (el.getAttribute("data-desc") ? '<p class="desc">' + el.getAttribute("data-desc") + "</p>" : "") + "</div>";
  }

  /* ---------- Mensajes (toasts) ---------- */
  var TOASTS = {
    descarga: ["download", "Descarga iniciada", "El archivo se guardará en tu equipo."],
    correo: ["mail", "Abriendo tu correo", "Se redactará un mensaje para proveedores@ucol.mx."],
    filtros: ["filter", "Filtros aplicados", "Los resultados se actualizaron."],
    pagina: ["doc", "Página cargada", "Mostrando la página de resultados seleccionada."],
    exportacion: ["download", "Exportación lista", "Se descargó el archivo con los datos públicos."],
    borrador: ["check", "Borrador guardado", "Puedes continuar después con tu RFC y correo."],
    archivo: ["upload", "Archivo cargado", "documentos_empresa.zip · 8.4 MB"],
    externo: ["ext", "Enlace externo", "Se abriría en una nueva pestaña del navegador."],
    aqui: ["info", "Ya estás en esta sección", "Continúa con los pasos de esta página."],
    cambio: ["check", "Cambio aplicado", "El formulario se actualizó."],
    encontrado: ["check", "Registro encontrado", "Mostrando el estatus de tu registro."],
    renovacion: ["check", "Renovación enviada", "Te avisaremos por correo cuando se valide tu expediente."]
  };
  var zona;
  function toast(key) {
    var t = TOASTS[key]; if (!t) return;
    if (!zona) { zona = document.createElement("div"); zona.className = "toast-zona"; zona.setAttribute("aria-live", "polite"); document.body.appendChild(zona); }
    var el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = '<div class="toast__ic">' + icon(t[0]) + "</div><div><b>" + t[1] + "</b><span>" + t[2] + "</span></div>";
    zona.appendChild(el);
    while (zona.children.length > 3) zona.firstChild.remove();
    setTimeout(function () { el.classList.add("is-out"); setTimeout(function () { el.remove(); }, 260); }, 3200);
  }
  window.toast = toast;

  /* ---------- Ventanas ---------- */
  function check(t) { return '<div class="row gap-8 ai-s small body-700">' + icon("check", "ic-16") + "<span>" + t + "</span></div>"; }
  var MODALS = {
    buscar: function () {
      var r = [
        ["licitacion-detalle.html", "LP-UCOL-012/2026 · Equipo de cómputo", "Licitación vigente"],
        ["formatos-proveedores.html", "Manifiesto bajo protesta (Art. 48)", "Formato · DOCX"],
        ["registro-paso1.html", "Registrarse como proveedor", "Proveedores"],
        ["marco-universitaria.html", "Reglamento de Adquisición de Bienes", "Marco Normativo"]
      ];
      return '<div class="modal"><div class="modal__hd"><h3>Buscar en el sitio</h3><button class="modal__x" data-close aria-label="Cerrar">' + icon("close") + "</button></div>" +
        '<div class="modal__bd"><label class="buscador" style="height:44px;background:var(--g100);border:0">' + icon("search") +
        '<input value="licitación equipo de cómputo" aria-label="Buscar" style="font-size:16px"></label><p class="caption muted">4 resultados</p>' +
        r.map(function (x) { return '<a class="resultado" href="' + x[0] + '">' + icon("doc") + '<div class="f1"><b>' + x[1] + "</b><small>" + x[2] + "</small></div>" + icon("chevR") + "</a>"; }).join("") +
        "</div></div>";
    },
    documentos: function () {
      return '<div class="modal"><div class="modal__hd"><h3>Documentos requeridos</h3><button class="modal__x" data-close aria-label="Cerrar">' + icon("close") + "</button></div>" +
        '<div class="modal__bd"><p class="overline">Persona física</p>' +
        ["Identificación oficial vigente (INE o pasaporte)", "CURP", "Constancia de situación fiscal", "Comprobante de domicilio fiscal", "Opinión de cumplimiento SAT (32-D)", "Carátula de estado de cuenta"].map(check).join("") +
        '<p class="overline">Persona moral</p>' +
        ["Acta constitutiva o póliza y modificaciones", "Poder notarial del representante", "INE del representante", "Constancia de situación fiscal", "Comprobante de domicilio fiscal", "Opinión de cumplimiento SAT (32-D)"].map(check).join("") +
        '<div><button class="btn btn--sm" data-close>Entendido</button></div></div></div>';
    },
    vista: function (titulo) {
      var w = [520, 500, 540, 460, 520, 380, 500, 440];
      return '<div class="modal modal--640"><div class="modal__hd"><h3>Vista del documento</h3><button class="modal__x" data-close aria-label="Cerrar">' + icon("close") + "</button></div>" +
        '<div class="modal__bd"><div class="pdf-pagina"><b>' + (titulo || "REGLAMENTO DE ADQUISICIÓN DE BIENES, CONTRATACIÓN DE SERVICIOS Y ARRENDAMIENTOS") + "</b>" +
        w.map(function (x) { return '<i style="width:' + x + 'px"></i>'; }).join("") + "</div>" +
        '<div class="row jc-e"><button class="btn btn--sm" data-toast="descarga" data-close>' + icon("download", "ic-16") + "Descargar PDF</button></div></div></div>";
    },
    importante: function () {
      return '<div class="modal"><div class="modal__hd"><h3 class="row ai-c gap-8" style="font-size:18px;line-height:26px;color:var(--rojo)">' + icon("warning", "ic-22") + "IMPORTANTE</h3>" +
        '<button class="modal__x" data-close aria-label="Cerrar">' + icon("close") + "</button></div>" +
        '<div class="modal__bd" style="gap:24px"><p class="body-700">Al dar clic en "Acepto" declaro bajo protesta de decir verdad que no me encuentro en ninguno de los supuestos del Artículo 48 del Reglamento de Adquisición de Bienes, Contratación de Servicios y Arrendamientos de la Universidad de Colima, y que la información que proporcionaré en esta solicitud es cierta y vigente.</p>' +
        '<div class="row jc-e gap-12"><button class="btn btn--contorno" data-close>Cancelar</button><a class="btn" href="registro-paso2.html">Acepto' + icon("chevR") + "</a></div></div></div>";
    }
  };
  var fondo;
  function openModal(key, arg) {
    if (!MODALS[key]) return;
    closeModal();
    fondo = document.createElement("div");
    fondo.className = "modal-fondo";
    fondo.innerHTML = MODALS[key](arg);
    document.body.appendChild(fondo);
    document.body.style.overflow = "hidden";
    var x = fondo.querySelector(".modal__x"); if (x) x.focus();
  }
  function closeModal() { if (fondo) { fondo.remove(); fondo = null; document.body.style.overflow = ""; } }
  window.openModal = openModal;

  /* ---------- Delegación de eventos ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (fondo && t === fondo) { closeModal(); return; }
    var el;
    if ((el = t.closest("[data-toast]"))) { toast(el.getAttribute("data-toast")); }
    if ((el = t.closest("[data-close]"))) { closeModal(); }
    if ((el = t.closest("[data-modal]"))) { e.preventDefault(); openModal(el.getAttribute("data-modal"), el.getAttribute("data-doc")); return; }
    if ((el = t.closest("[data-go]"))) { location.href = el.getAttribute("data-go"); return; }

    // Pestañas: [data-tabs] contiene .tab[data-tab]; los paneles [data-panel] están en el mismo [data-tabs-scope]
    if ((el = t.closest(".tab[data-tab]"))) {
      var scope = el.closest("[data-tabs-scope]") || document;
      scope.querySelectorAll(".tab[data-tab]").forEach(function (b) { b.classList.toggle("is-active", b === el); b.setAttribute("aria-selected", b === el); });
      scope.querySelectorAll("[data-panel]").forEach(function (p) { p.hidden = p.getAttribute("data-panel") !== el.getAttribute("data-tab"); });
      return;
    }
    // Acordeones
    if ((el = t.closest(".acordeon__hd"))) { var a = el.parentElement; a.classList.toggle("is-open"); el.setAttribute("aria-expanded", a.classList.contains("is-open")); return; }
    // Rubros (chips)
    if ((el = t.closest(".chip"))) {
      el.classList.toggle("is-on");
      var box = el.closest("[data-chips]");
      if (box) { var n = box.querySelectorAll(".chip.is-on").length; document.querySelectorAll("[data-chip-count]").forEach(function (c) { c.textContent = n + (n === 1 ? " rubro seleccionado" : " rubros seleccionados"); }); }
      return;
    }
    // Paginación
    if ((el = t.closest(".paginacion button[data-p]"))) {
      var pag = el.parentElement, act = pag.querySelector(".is-active"), num = pag.querySelectorAll("button[data-p]:not([data-p='prev']):not([data-p='next']):not([data-p='x'])");
      var i = Array.prototype.indexOf.call(num, act);
      if (el.dataset.p === "prev") i = Math.max(0, i - 1); else if (el.dataset.p === "next") i = Math.min(num.length - 1, i + 1); else i = Array.prototype.indexOf.call(num, el);
      num.forEach(function (b, k) { b.classList.toggle("is-active", k === i); });
      toast("pagina");
      return;
    }
    // Zona de carga simulada
    if ((el = t.closest(".dropzone"))) {
      var lista = document.querySelector(el.getAttribute("data-target") || "#archivo-cargado");
      if (lista) lista.hidden = false;
      toast("archivo");
      return;
    }
    // Tipo de persona (registro, paso 2)
    if ((el = t.closest(".pt[data-tipo]"))) {
      el.parentElement.querySelectorAll(".pt").forEach(function (b) { b.classList.toggle("is-on", b === el); });
      document.querySelectorAll("[data-solo-moral]").forEach(function (x) { x.hidden = el.getAttribute("data-tipo") !== "moral"; });
      toast("cambio");
      return;
    }
    // Agregar persona autorizada (registro, paso 4)
    if ((el = t.closest("[data-add-autorizada]"))) {
      var bloques = document.querySelectorAll(".autorizada");
      var base = bloques[bloques.length - 1] || bloques[0];
      if (base) {
        var nuevo = base.cloneNode(true), letra = String.fromCharCode(65 + bloques.length);
        nuevo.hidden = false;
        nuevo.querySelector("b").textContent = "Representante de venta " + letra;
        nuevo.querySelectorAll("input").forEach(function (i) { if (i.type === "radio") { i.name = "id" + letra; } else { i.value = ""; } });
        if (!nuevo.querySelector("[data-remove]")) nuevo.querySelector(".row").insertAdjacentHTML("beforeend", '<button class="lnk" data-remove=".autorizada">' + icon("close", "ic-16") + "Quitar</button>");
        el.before(nuevo);
        toast("cambio");
      }
      return;
    }
    if ((el = t.closest("[data-remove]"))) { var q = el.closest(el.getAttribute("data-remove")); if (q) q.hidden = true; return; }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  // Menú: submenú también con teclado / toque
  function bindNav() {
    document.querySelectorAll(".nav__item").forEach(function (item) {
      if (!item.querySelector(".submenu")) return;
      item.addEventListener("focusin", function () { item.classList.add("is-open"); });
      item.addEventListener("focusout", function (e) { if (!item.contains(e.relatedTarget)) item.classList.remove("is-open"); });
      item.addEventListener("mouseleave", function () { item.classList.remove("is-open"); });
    });
  }

  /* ---------- Montaje ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var active = document.body.getAttribute("data-nav") || "";
    var h = document.querySelector("[data-header]");
    if (h) { h.outerHTML = "<header>" + headerHTML(active) + "</header>"; }
    var f = document.querySelector("[data-footer]");
    if (f) { var ft = document.createElement("footer"); ft.className = "footer"; ft.innerHTML = footerHTML(); f.replaceWith(ft); }
    document.querySelectorAll("[data-hero]").forEach(function (el) { el.classList.add("page-hero"); el.innerHTML = heroHTML(el); });
    document.querySelectorAll("[data-deco]").forEach(function (el) {
      el.insertAdjacentHTML("afterbegin", el.getAttribute("data-deco").split(";").map(function (s) { var v = s.split(",").map(Number); return deco(v[0], v[1], v[2], v[3]); }).join(""));
    });
    paintIcons();
    bindNav();
    // Estados de demostración por URL, p. ej. ?estado=submenu:nosotros, ?estado=modal:buscar, ?estado=toast:descarga
    var est = (location.search.match(/estado=([^&]+)/) || [])[1];
    if (est) {
      var kv = decodeURIComponent(est).split(":");
      if (kv[0] === "submenu") { var it = document.querySelector('.nav__btn[href="' + (NAV.filter(function (n) { return n.id === kv[1]; })[0] || {}).href + '"]'); if (it) it.parentElement.classList.add("is-open"); }
      if (kv[0] === "modal") openModal(kv[1]);
      if (kv[0] === "toast") toast(kv[1]);
      if (kv[0] === "tab") { var tb = document.querySelector('.tab[data-tab="' + kv[1] + '"]'); if (tb) tb.click(); }
    }
  });
})();
