{
  //  document
  // .getElementById("formularioregistrate")
  //   .addEventListener("submit", function (e) {
  //     e.preventDefault();

  //   const mensaje = document.getElementById("mensajeEnviado");
  ///mensaje.style.display = "block";

  //   this.reset();

  //    setTimeout(() => {
  //      mensaje.style.display = "none";
  //    }, 5000);
  //   });

  // VALIDACION DE FORMULARIO
  const form = document.querySelector('form[name="frm"]');

  form.addEventListener("submit", (event) => {
    const fname = form.elements["nombres"].value.trim();
    const flastname = form.elements["apellidos"].value.trim();
    const fphone = form.elements["telefono"].value.trim();
    const femail = form.elements["email"].value.trim();
    const fcontra = form.elements["contraseña"].value.trim();

    // Validar campos vacíos
    if (!fname || !flastname || !fphone || !fcontra || !femail) {
      event.preventDefault();
      alert("Por favor, complete todos los campos del formulario");
      return;
    }

    // Validar correo
    if (!validateEmail(femail)) {
      event.preventDefault();
      alert("Por favor, ingrese un correo válido");
      return;
    }

    // Confirmación final del usuario
    const confirmation = confirm(
      "Está a punto de enviar el formulario, ¿Desea continuar?"
    );
    if (!confirmation) {
      event.preventDefault();
      return;
    }

    // ✅ Mensaje de éxito
    alert("¡Registro exitoso!");
  });

  // Función para validar correo electrónico
  function validateEmail(femail) {
    const re = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    return re.test(String(femail).toLowerCase());
  }

  let estudiantes = [];
  // Arreglo global de fans
  const fans = [];

  // Evento del formulario
  document.getElementById("fansForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener datos
    const idFan = document.getElementById("idFan").value.trim();
    const nombreFan = document.getElementById("nombreFan").value.trim();
    const correoFan = document.getElementById("correoFan").value.trim();
    const frecuenciaStr = document.getElementById("frecuencia").value.trim();
    const frecuencia = Number(frecuenciaStr);
    const comentario = document.getElementById("comentario").value.trim();

    // Validaciones personalizadas
    if (!idFan || !nombreFan || !correoFan || !frecuenciaStr) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (!validateEmail(correoFan)) {
      alert("Por favor, ingresa un correo válido.");
      return;
    }

    if (isNaN(frecuencia) || frecuencia < 0) {
      alert("La cantidad de visitas debe ser un número mayor o igual a 0.");
      return;
    }

    // Agregar fan
    const nuevoFan = { idFan, nombreFan, correoFan, frecuencia, comentario };
    fans.push(nuevoFan);

    // Orden descendente por frecuencia
    fans.sort((a, b) => b.frecuencia - a.frecuencia);

    // Mostrar lista
    mostrarRankingFans();

    // Limpiar formulario
    this.reset();
  });

  // Función para validar email
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  // Mostrar lista ordenada de fans con barra visual
  function mostrarRankingFans() {
    const lista = document.getElementById("listaFans");
    lista.innerHTML = "";

    fans.forEach((fan) => {
      const li = document.createElement("li");
      li.className = "barra-progreso";

      const barra = document.createElement("div");
      barra.className = "progreso";
      barra.style.width = `${(fan.frecuencia / 30) * 100}%`;

      const texto = document.createElement("span");
      texto.textContent = `${fan.nombreFan} – Visitas: ${fan.frecuencia} ${
        fan.comentario ? `| "${fan.comentario}"` : ""
      }`;

      li.appendChild(barra);
      li.appendChild(texto);
      lista.appendChild(li);
    });
  }

  //PEDIDOS
  const pedidos = [];

  document
    .getElementById("formCarrito")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const cliente = document.getElementById("cliente").value.trim();
      const combo = document.getElementById("combo").value;
      const cantidadStr = document.getElementById("cantidad").value.trim();
      const cantidad = Number(cantidadStr);

      // Validación manual con alertas
      if (
        !cliente ||
        !combo ||
        !cantidadStr ||
        isNaN(cantidad) ||
        cantidad <= 0
      ) {
        alert(
          "Por favor, complete todos los campos del formulario correctamente."
        );
        return;
      }

      // Confirmación del usuario
      const confirmar = confirm("¿Desea agregar este pedido al carrito?");
      if (!confirmar) return;

      // Lógica de precios
      let precioUnitario = 0;
      if (combo === "Clásico") precioUnitario = 25;
      else if (combo === "Familiar") precioUnitario = 45;
      else if (combo === "Extra") precioUnitario = 35;

      const total = precioUnitario * cantidad;
      pedidos.push({ cliente, combo, cantidad, total });

      // Mostrar pedidos
      mostrarPedidos();

      // Limpiar campos
      this.reset();
    });

  // Función para mostrar pedidos en lista
  function mostrarPedidos() {
    const lista = document.getElementById("listaPedidos");
    lista.innerHTML = "";

    pedidos.forEach((pedido) => {
      const li = document.createElement("li");
      li.textContent = `${pedido.cliente} pidió ${pedido.cantidad} x Combo ${
        pedido.combo
      } = S/ ${pedido.total.toFixed(2)}`;
      lista.appendChild(li);
    });
  }
}
