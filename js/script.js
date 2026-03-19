let currentStep = 0;

const steps = document.querySelectorAll(".step");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const submitBtn = document.getElementById("submit");
const progress = document.getElementById("progress");
const stepIndicator = document.getElementById("step-indicator");

const radiosAnonimo = document.querySelectorAll("input[name='anonimo']");
const datosPersonales = document.getElementById("datos_personales");

const nombreInput = document.querySelector("input[name='nombre']");
const apellidoInput = document.querySelector("input[name='apellido']");
const empresaInput = document.getElementById("empresa");
const sucursalInput = document.getElementById("sucursal");
const sucursalList = document.getElementById("sucursales");

const nombreDenunciadoInput = document.getElementById("nombre_denunciado");
const apellidoDenunciadoInput = document.getElementById("apellido_denunciado");

const sector = document.getElementById("sector_denunciado");
const sectorOtro = document.getElementById("sector_otro");
const cargo = document.getElementById("cargo_denunciado");
const cargoOtro = document.getElementById("cargo_otro");
const fechaHecho = document.getElementById("fecha_hecho");

const empresasSucursales = {
  "Mc Donalds": [
    "Mc Donalds Caballito",
    "Mc Donalds Parque Patricios",
    "Mc Donalds Avellaneda"
  ],
  "Mostaza": [
    "Mostaza Palermo",
    "Mostaza Abasto",
    "Mostaza Córdoba"
  ],
  "Cerrajeria Leonardo": [
    "Caballito",
    "Colegiales",
    "Boedo",
    "Recoleta"
  ],
  "Acceso": [
    "Sede Central"
  ]
};

const cuestionarios = {
  acoso: {
    titulo: "ACOSO",
    descripcion: "Incluye reportes de acoso laboral, acoso sexual y cualquier tipo de discriminación en el entorno laboral.",
    preguntas: [
      "¿En qué consistió el hecho? ¿Se trató de un acoso físico o verbal?",
      "¿Cómo se llevó a cabo el hecho? Describa lo ocurrido.",
      "¿Dónde y cuándo ocurrió?",
      "¿A qué otras personas afecta el hecho y de qué manera?",
      "¿Además del denunciado existen otras personas involucradas? Indique nombres, cargos y sectores."
    ]
  },
  fraude: {
    titulo: "FRAUDE",
    descripcion: "Fraude económico, robo de mercancías, bienes o valores, gastos y compras sin autorización, entre otros.",
    preguntas: [
      "¿Qué tipo de fraude o irregularidad detectó?",
      "¿Cómo se llevó a cabo la acción?",
      "¿Qué personas están involucradas?",
      "¿Desde cuándo ocurre la situación?"
    ]
  },
  corrupcion: {
    titulo: "CORRUPCIÓN",
    descripcion: "Reportes relacionados con sobornos, acuerdos irregulares o beneficios indebidos.",
    preguntas: [
      "¿En qué consistió el hecho?",
      "¿Con qué proveedor? Indique empresa, persona de contacto, cargo y sector.",
      "¿Dónde y cuándo ocurrió?",
      "¿Cómo se llevó a cabo la irregularidad?",
      "¿Existen otras personas involucradas? Indique nombres, cargos y sectores."
    ]
  },
  conflicto_intereses: {
    titulo: "CONFLICTO DE INTERESES",
    descripcion: "Situaciones en las que existen intereses personales incompatibles con responsabilidades laborales.",
    preguntas: [
      "¿En qué consistió el hecho?",
      "¿Cómo se llevó a cabo?",
      "¿Dónde y cuándo ocurrió?",
      "¿Existen otras personas involucradas? Indique nombres, cargos y sectores."
    ]
  },
  adulteracion: {
    titulo: "ADULTERACIÓN",
    descripcion: "Adulteración de información contable, operativa o financiera, documentación legal o elusión de controles internos.",
    preguntas: [
      "¿En qué consistió el hecho?",
      "¿Cómo se llevó a cabo?",
      "¿Dónde y cuándo ocurrió?",
      "¿Considera que existen otros involucrados? Menciónelos."
    ]
  },
  mal_desempeno: {
    titulo: "MAL DESEMPEÑO",
    descripcion: "Incluye abuso de poder, favoritismo, amenazas y comportamientos inapropiados.",
    preguntas: [
      "¿En qué consistió el hecho?",
      "¿Cómo se llevó a cabo?",
      "¿Dónde y cuándo ocurrió?",
      "¿Existen otras personas involucradas? Indique nombres, cargos y sectores."
    ]
  },
  mal_uso_bienes: {
    titulo: "MAL USO DE BIENES",
    descripcion: "Descuido o utilización inapropiada de bienes, servicios o información de la organización.",
    preguntas: [
      "¿En qué consistió el hecho?",
      "¿Cómo se llevó a cabo la irregularidad?",
      "¿Dónde y cuándo ocurrió?",
      "¿Existen otras personas involucradas? Indique nombres, cargos y sectores."
    ]
  },
  robo_informacion: {
    titulo: "ROBO DE INFORMACIÓN",
    descripcion: "Robo o sustracción de información interna de la empresa.",
    preguntas: [
      "¿En qué consistió el hecho?",
      "¿Cómo se llevó a cabo la irregularidad?",
      "¿Dónde y cuándo ocurrió?",
      "¿A qué persona u organización se entrega información?",
      "¿El implicado recibe dinero, bienes o premios como contraprestación?",
      "¿Qué tipo de información transmite a terceros?",
      "¿Existen otras personas involucradas? Indique nombres, cargos y sectores."
    ]
  },
  mejora_procesos: {
    titulo: "MEJORA DE PROCESOS",
    descripcion: "Sugerencias para mejorar procesos o reportar fallas operativas.",
    preguntas: [
      "¿Qué proceso considera que debe mejorar o está fallando?",
      "¿Qué falla observa?",
      "¿Qué problemas le causa a la empresa?",
      "¿Qué mejora considera necesaria?",
      "¿Quién considera responsable de la falla y de llevar adelante la mejora?"
    ]
  },
  reporte_libre: {
    titulo: "REPORTE LIBRE",
    descripcion: "Descripción libre del hecho.",
    preguntas: [
      "Describa detalladamente el hecho que desea reportar. Incluya fechas, lugares, personas involucradas y cualquier dato relevante."
    ]
  }
};

function soloLetras(input) {
  if (!input) return;

  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
  });
}

soloLetras(nombreInput);
soloLetras(apellidoInput);
soloLetras(empresaInput);
soloLetras(nombreDenunciadoInput);
soloLetras(apellidoDenunciadoInput);

function updateProgress() {
  const percent = ((currentStep + 1) / steps.length) * 100;
  progress.style.width = `${percent}%`;
}

function showStep() {
  steps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });

  updateProgress();
  stepIndicator.textContent = `${currentStep + 1}/${steps.length}`;

  prevBtn.style.display = currentStep === 0 ? "none" : "inline-block";

  if (currentStep === steps.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
  } else {
    nextBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showError(field, message) {
  field.classList.add("input-error");

  let error = field.parentNode.querySelector(".error-message");
  if (!error) {
    error = document.createElement("span");
    error.className = "error-message";
    field.parentNode.appendChild(error);
  }

  error.textContent = message;
}

function removeError(field) {
  field.classList.remove("input-error");

  const error = field.parentNode.querySelector(".error-message");
  if (error) {
    error.remove();
  }
}

function validateStep() {
  let valid = true;
  const currentFields = steps[currentStep].querySelectorAll("input, textarea, select");

  currentFields.forEach((field) => {
    removeError(field);

    if (field.offsetParent === null) return;

    const value = field.value.trim();

    if (field.hasAttribute("required") && !value) {
      showError(field, "Campo obligatorio");
      valid = false;
      return;
    }
    // validar fecha futura
    if (field.id === "fecha_hecho" && value !== "") {
        const fechaIngresada = new Date(value + "T00:00:00");
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if (fechaIngresada > hoy) {
            showError(field, "No puede seleccionar una fecha futura");
            valid = false;
            return;
        }
    }

    if (field.type === "email" && value && !field.checkValidity()) {
      showError(field, "Ingrese un correo válido");
      valid = false;
      return;
    }

    if (field.pattern && value && !field.checkValidity()) {
      showError(field, "Formato inválido");
      valid = false;
    }
  });

  return valid;
}

function validarEmpresa() {
  const empresa = empresaInput.value.trim();

  if (!Object.prototype.hasOwnProperty.call(empresasSucursales, empresa)) {
    showError(empresaInput, "Seleccione una empresa válida");
    return false;
  }

  removeError(empresaInput);
  return true;
}

function validarSucursal() {
  const empresa = empresaInput.value.trim();
  const sucursal = sucursalInput.value.trim();

  if (!empresasSucursales[empresa]) {
    showError(empresaInput, "Seleccione primero una empresa válida");
    return false;
  }

  if (!empresasSucursales[empresa].includes(sucursal)) {
    showError(sucursalInput, "Seleccione una sucursal válida");
    return false;
  }

  removeError(sucursalInput);
  return true;
}

function cargarSucursales() {
  const empresa = empresaInput.value.trim();
  sucursalInput.value = "";
  sucursalList.innerHTML = "";

  if (!empresasSucursales[empresa]) return;

  empresasSucursales[empresa].forEach((sucursal) => {
    const option = document.createElement("option");
    option.value = sucursal;
    sucursalList.appendChild(option);
  });
}

function cargarCuestionario() {
  const seleccionado = document.querySelector("input[name='tipo_irregularidad']:checked");
  if (!seleccionado) return;

  const data = cuestionarios[seleccionado.value];
  if (!data) return;

  document.getElementById("titulo-cuestionario").textContent = data.titulo;
  document.getElementById("descripcion-cuestionario").textContent = data.descripcion;

  const contenedor = document.getElementById("preguntas-container");
  contenedor.innerHTML = "";

  data.preguntas.forEach((pregunta, index) => {
    const bloque = document.createElement("div");
    bloque.className = "pregunta-item";
    bloque.innerHTML = `
      <label class="pregunta-label" for="respuesta_${seleccionado.value}_${index}">${pregunta}</label>
      <textarea
        class="pregunta-textarea"
        id="respuesta_${seleccionado.value}_${index}"
        name="respuesta_${seleccionado.value}_${index}"
        rows="4"
        required
      ></textarea>
    `;
    contenedor.appendChild(bloque);
  });
}

function generarResumen() {
  const form = document.getElementById("formDenuncia");
  const resumen = document.getElementById("resumen-contenido");
  const data = new FormData(form);
  const anonimo = form.querySelector("input[name='anonimo']:checked")?.value;

  const labelsPersonalizados = {
    anonimo: "Anonimato",
    empresa: "Empresa",
    sucursal: "Sucursal",
    nombre_denunciado: "Nombre del denunciado",
    apellido_denunciado: "Apellido del denunciado",
    sector_denunciado: "Sector del denunciado",
    cargo_denunciado: "Cargo del denunciado",
    tipo_irregularidad: "Tipo de irregularidad",
    fecha_hecho: "Fecha del hecho",
    archivo: "Archivo adjunto"
  };

  const camposPersonales = ["nombre", "apellido", "email", "telefono", "dni", "genero"];
  let html = "";

  data.forEach((valor, clave) => {
    if (anonimo === "si" && camposPersonales.includes(clave)) return;
    if (valor === "" || valor == null) return;

    let mostrarValor = valor;

    if (valor instanceof File) {
      mostrarValor = valor.name ? `📎 ${valor.name}` : "No se adjuntó ningún archivo";
    }

    let label = labelsPersonalizados[clave] || clave.replaceAll("_", " ");
    label = label.charAt(0).toUpperCase() + label.slice(1);

    if (clave.startsWith("respuesta_")) {
      label = "Respuesta";
    }

    html += `
      <div class="resumen-item">
        <span class="resumen-label">${label}</span>
        <span class="resumen-valor">${mostrarValor}</span>
      </div>
    `;
  });

  resumen.innerHTML = html;
}

radiosAnonimo.forEach((radio) => {
  radio.addEventListener("change", () => {
    const selected = document.querySelector("input[name='anonimo']:checked");
    if (!selected) return;

    const mostrarDatos = selected.value === "no";
    datosPersonales.style.display = mostrarDatos ? "flex" : "none";
    datosPersonales.setAttribute("aria-hidden", mostrarDatos ? "false" : "true");

    datosPersonales.querySelectorAll("input").forEach((input) => {
      if (mostrarDatos) {
        input.setAttribute("required", "required");
      } else {
        input.removeAttribute("required");
        input.value = "";
        removeError(input);
      }
    });

    const radioGroupError = document.querySelector(".radio-group .error-message");
    if (radioGroupError) radioGroupError.remove();
  });
});

sector.addEventListener("change", function () {
  const mostrar = this.value === "Otro";
  sectorOtro.style.display = mostrar ? "block" : "none";
  sectorOtro.toggleAttribute("required", mostrar);
  if (!mostrar) sectorOtro.value = "";
});

cargo.addEventListener("change", function () {
  const mostrar = this.value === "Otro";
  cargoOtro.style.display = mostrar ? "block" : "none";
  cargoOtro.toggleAttribute("required", mostrar);
  if (!mostrar) cargoOtro.value = "";
});

empresaInput.addEventListener("input", cargarSucursales);

document.querySelectorAll("input, textarea, select").forEach((field) => {
  field.addEventListener("input", () => removeError(field));
  field.addEventListener("change", () => removeError(field));
});

nextBtn.addEventListener("click", () => {
  if (currentStep === 0) {
    const selected = document.querySelector("input[name='anonimo']:checked");

    if (!selected) {
      const radioGroup = document.querySelector(".radio-group");
      if (!radioGroup.querySelector(".error-message")) {
        const error = document.createElement("span");
        error.className = "error-message";
        error.textContent = "Debe seleccionar una opción";
        radioGroup.appendChild(error);
      }
      return;
    }
  }

  if (currentStep === 1 && !validarEmpresa()) return;
  if (currentStep === 2 && !validarSucursal()) return;

  if (currentStep === 4) {
    const irregularidadSeleccionada = document.querySelector("input[name='tipo_irregularidad']:checked");

    if (!irregularidadSeleccionada) {
      const contenedor = document.querySelector(".irregularidades");
      if (!contenedor.querySelector(".error-message")) {
        const error = document.createElement("span");
        error.className = "error-message";
        error.textContent = "Debe seleccionar un tipo de irregularidad";
        contenedor.appendChild(error);
      }
      return;
    }
  }

  if (!validateStep()) return;

  if (currentStep < steps.length - 1) {
    currentStep++;

    const stepActual = steps[currentStep];

    if (stepActual.id === "cuestionario") {
      cargarCuestionario();
    }

    if (stepActual.id === "resumen-step") {
      generarResumen();
    }

    showStep();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep();
  }
});

if (fechaHecho) {
  fechaHecho.max = new Date().toISOString().split("T")[0];
}

const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

showStep();

/* ================================
   BLOQUEAR ENVIO CON ENTER
================================ */

const formDenuncia = document.getElementById("formDenuncia");

if (formDenuncia) {
    formDenuncia.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault();
        }
    });
}

/* ================================
   VALIDAR ENVIO FINAL
================================ */

if (formDenuncia) {
    formDenuncia.addEventListener("submit", (e) => {
        if (!validateStep()) {
            e.preventDefault();
            return;
        }

        // opcional: asegurarse de que esté en el último paso
        if (currentStep !== steps.length - 1) {
            e.preventDefault();
        }
    });
}