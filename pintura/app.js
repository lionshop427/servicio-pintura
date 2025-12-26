// Número de WhatsApp de Multiservicios Huánuco (cámbialo si deseas:)
const WHATSAPP_NUMBER = "51958799539"; // cambio de numero:

document.addEventListener("DOMContentLoaded", () => {
  const btnsCotizar = document.querySelectorAll(".btn-cotizar");
  const selectServicio = document.getElementById("tipoServicio");
  const formCotizacion = document.getElementById("formCotizacion");

  // 1. Botones "Cotizacion de servicio" 
  btnsCotizar.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".service-card");
      const servicio = card.getAttribute("data-servicio");

      if (selectServicio) {
        selectServicio.value = servicio;
        // Si no encuentra la opción exacta, no pasa nada, solo evitamos error
      }

      // Hacer scroll suave al formulario
      const seccionCotizacion = document.getElementById("cotizacion");
      if (seccionCotizacion) {
        seccionCotizacion.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // 2. Envío del formulario -> abrir WhatsApp
  formCotizacion.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const telefonoCliente = document.getElementById("telefonoCliente").value.trim();
    const servicio = document.getElementById("tipoServicio").value;
    const metros = document.getElementById("metros").value.trim();
    const ubicacion = document.getElementById("ubicacion").value.trim();
    const detalle = document.getElementById("detalle").value.trim();

    if (!nombre || !servicio) {
      alert("Por favor, completa al menos tu nombre y el tipo de servicio.");
      return;
    }

    let mensaje = `Hola, soy ${nombre}. Quisiera una cotización para:\n\n`;
    mensaje += `• Servicio: ${servicio}\n`;

    if (metros) mensaje += `• Metros aproximados: ${metros} m²\n`;
    if (ubicacion) mensaje += `• Ubicación: ${ubicacion}\n`;
    if (telefonoCliente) mensaje += `• Mi WhatsApp: ${telefonoCliente}\n`;

    if (detalle) {
      mensaje += `\nDetalle del trabajo:\n${detalle}\n`;
    }

    mensaje += `\nEnviado desde el catálogo web de Multiservicios Huánuco.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
  });
});
