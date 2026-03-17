/* ================================
   VARIABLES GENERALES
================================ */

let currentStep = 0

const steps = document.querySelectorAll(".step")

const nextBtn = document.getElementById("next")
const prevBtn = document.getElementById("prev")
const submitBtn = document.getElementById("submit")

const progress = document.getElementById("progress")

const radiosAnonimo = document.querySelectorAll("input[name='anonimo']")
const datos = document.getElementById("datos_personales")

const nombreInput = document.querySelector("input[name='nombre']")
const apellidoInput = document.querySelector("input[name='apellido']")

const noDatosDenunciado = document.getElementById("no-datos-denunciado")

const nombreDenunciado = document.getElementById("nombre_denunciado")
const apellidoDenunciado = document.getElementById("apellido_denunciado")
const sectorDenunciado = document.getElementById("sector_denunciado")
const cargoDenunciado = document.getElementById("cargo_denunciado")

const camposDenunciado = [
nombreDenunciado,
apellidoDenunciado,
sectorDenunciado,
cargoDenunciado
]


const nombreDenunciadoInput = document.getElementById("nombre_denunciado")
const apellidoDenunciadoInput = document.getElementById("apellido_denunciado")
const sectorDenunciadoInput = document.getElementById("sector_denunciado")
const cargoDenunciadoInput = document.getElementById("cargo_denunciado")




const empresaInput = document.getElementById("empresa")
const sucursalInput = document.getElementById("sucursal")
const sucursalList = document.getElementById("sucursales")




const sector = document.getElementById("sector_denunciado")
const sectorOtro = document.getElementById("sector_otro")

sector.addEventListener("change",function(){

if(this.value === "Otro"){

sectorOtro.style.display = "block"

}else{

sectorOtro.style.display = "none"

}

})


const cargo = document.getElementById("cargo_denunciado")
const cargoOtro = document.getElementById("cargo_otro")

cargo.addEventListener("change",function(){

if(this.value === "Otro"){

cargoOtro.style.display = "block"

}else{

cargoOtro.style.display = "none"

}

})









const cuestionarios = {

acoso: {

titulo: "ACOSO",

descripcion: "Incluye reportes de acoso laboral, acoso sexual y cualquier tipo de discriminación en el entorno laboral. Cuanta mayor cantidad de información brinde, el Comité Receptor podrá llevar a cabo una mejor investigación.",

preguntas: [

"¿En qué consistió el hecho? ¿Se trata de un acoso físico y/o verbal?",

"¿Cómo se lleva o llevó a cabo el hecho? Por favor describa lo ocurrido.",

"¿Dónde y cuándo sucede o sucedió el hecho?",

"¿A qué otras personas afecta el hecho y de qué manera?",

"¿Además del denunciado existen otras personas involucradas? Indique nombre/s, cargo/s y sector/es."

]

},

fraude: {

titulo: "FRAUDE",

descripcion: 
"Fraude económico (lavado de dinero, robo de mercancías, bienes o valores, gastos y compras sin autorización, etc.). Cuanta mayor cantidad de información brinde, el Comité Receptor podrá llevar a cabo una mejor investigación.",

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

"¿Con qué proveedor? Indique nombre de la empresa, de la persona de contacto, su cargo y sector.",

"¿Dónde y cuándo sucede o sucedió el hecho?",

"¿Cómo se lleva o llevó a cabo la irregularidad? Por favor describa lo ocurrido.",

"¿Además del denunciado existen otras personas involucradas? Indique nombre/s, cargo/s y sector/es."

]

},

conflicto_intereses: {

   titulo: "CONFLICTO DE INTERESES",

   descripcion: "Situaciones en las que se reporta a colaboradores por estar involucrados en actividades que generan un conflicto de intereses con sus responsabilidades laborales.",

   preguntas: [
      "¿En qué consistió el hecho?.",

      "¿Cómo se llevó a cabo el hecho? Por favor describa lo ocurrido.",

      "¿Dónde y cuándo sucede o sucedió la irregularidad?",

      "¿Además del denunciado existen otras personas involucradas? Indique nombre/s, cargo/s y sector/es."
   ]
},

adulteracion: {

   titulo: "ADULTERACION",

   descripcion: "Adulteración de información contable, operativa y financiera, documentos legales y elusión de controles internos de la empresa. Cuanta mayor cantidad de información brinde, el Comité Receptor podrá llevar a cabo una mejor investigación.",

   preguntas: [

      "¿En qué consistió el hecho?",

      "¿Cómo se llevó a cabo?",

      "¿Dónde y cuándo sucede o sucedió el hecho?",

      "¿Considera que existen otros involucrados en el hecho? Por favor menciónelos."
   ]

},

mal_desempeno: {

   titulo: "MAL DESEMPEÑO",

   descripcion: "Mal desempeño de empleados/colaboradores, supervisores y/o gerentes (incluye abusos de poder, favoritismo, amenaza y mal comportamiento). Cuanta mayor cantidad de información brinde, el Comité Receptor podrá llevar a cabo una mejor investigación.",

   preguntas: [

      "En qué consistió el hecho",  

      "¿Cómo se llevó a cabo el hecho? Por favor describa lo ocurrido.",

      "¿Dónde y cuándo sucede o sucedió la irregularidad?",

      "¿Además del denunciado existen otras personas involucradas? Indique nombre/s, cargo/s y sector/es."

   ]
},

mal_uso_bienes: {

   titulo: "MAL USO DE BIENES",

   descripcion: "Descuido o utilización inapropiada de los bienes, servicios y/o información de la organización. Cuanta mayor cantidad de información brinde, el Comité Receptor podrá llevar a cabo una mejor investigación.",

   preguntas: [

      "¿En qué consistió el hecho?",

      "¿Cómo se lleva o llevó a cabo la irregularidad? Por favor describa lo ocurrido.",

      "¿Dónde y cuándo sucede o sucedió el hecho?",

      "¿Además del denunciado existen otras personas involucradas? Indique nombre/s, cargo/s y sector/es."

   ]
},

robo_informacion: {

   titulo: "ROBO DE INFORMACION",

   descripcion: "Robo o sustracción de información interna de la empresa. Cuanta mayor cantidad de información brinde, el Comité Receptor podrá llevar a cabo una mejor investigación.",

   preguntas: [

      "¿En qué consistió el hecho?",

      "¿Cómo se llevó a cabo la irregularidad? Por favor describa lo ocurrido.",

      "¿Dónde y cuándo sucede o sucedió el hecho?",

      "¿A qué persona u organización está entregando información? Por favor detalle nombre/s, cargo/s y sector/es.",

      "¿El implicado recibe dinero, bienes o algún premio como contraprestación? Por favor señale, si es posible, datos objetivos como objeto, fecha, monto y cómo se hace la entrega.",

      "¿Qué tipo de información transmite a terceros? ¿Datos de clientes, precios, costos, productos, marcas, proveedores u otros? Detalle por favor el concepto y tipo de información.",

      "¿Además del denunciado existen otras personas involucradas? Indique nombre/s, cargo/s y sector/es."

   ]
},

mejora_procesos: {

   titulo: "MEJORA DE PROCESOS",

   descripcion: "Sugerencia para mejorar procesos. Cuanta mayor cantidad de información brinde, el Comité Receptor podrá llevar a cabo una mejor investigación.",

   preguntas: [

      "¿Qué proceso considera que debe mejorar o está fallando?",

      "¿Qué falla observa dentro del proceso reportado?",

      "¿Qué problemas le causa a la empresa?",

      "¿Qué mejora considera que se debe implementar?",

      "¿Quién considera responsable de la falla y de llevar adelante la mejora?"
   ]
},

reporte_libre: {

   titulo: "REPORTE LIBRE",

   descripcion: "Descripcion libre",

   preguntas: [
      "Describa detalladamente el hecho que desea reportar. Incluya fechas, lugares, personas involucradas y cualquier dato relevante."
   ]

}

}


function cargarCuestionario(){

const seleccionado = document.querySelector("input[name='tipo_irregularidad']:checked")

if(!seleccionado) return

const tipo = seleccionado.value

const data = cuestionarios[tipo]

if(!data) return

const titulo = document.getElementById("titulo-cuestionario")
const descripcion = document.getElementById("descripcion-cuestionario")
const contenedor = document.getElementById("preguntas-container")

titulo.innerText = data.titulo
descripcion.innerText = data.descripcion

contenedor.innerHTML = ""

data.preguntas.forEach((pregunta,index)=>{

const bloque = document.createElement("div")

bloque.classList.add("pregunta-item")

bloque.innerHTML = `
<label class="pregunta-label">${pregunta}</label>
<textarea 
class="pregunta-textarea" 
name="respuesta_${tipo}_${index}" 
rows="4" 
required></textarea>
`

contenedor.appendChild(bloque)

})

}








/* ================================
   BASE DE DATOS EMPRESAS
================================ */

const empresasSucursales = {

"Mc Donalds":[
"Mc Donalds Caballito",
"Mc Donalds Parque Patricios",
"Mc Donalds Avellaneda"
],

"Mostaza":[
"Mostaza Palermo",
"Mostaza Abasto",
"Mostaza Córdoba"
],

"Cerrajeria Leonardo":[
"Caballito",
"Colegiales",
"Boedo",
"Recoleta"
],

"Acceso":[
    "Sede Central"
]

}
/* ================================
   SOLO LETRAS
================================ */

function soloLetras(input){

    if(!input){
        console.warn("Input no encontrado");
        return;
    }

    input.addEventListener("input",()=>{
        input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,'')
    })

}

soloLetras(nombreInput)
soloLetras(apellidoInput)
soloLetras(empresaInput)
soloLetras(nombreDenunciadoInput)
soloLetras(apellidoDenunciadoInput)

/* ================================
   NAVEGACION DE PASOS
================================ */

function showStep(){

    steps.forEach((step,index)=>{

        step.classList.remove("active")

        if(index === currentStep){
            step.classList.add("active")
        }

    })

    updateProgress()

    // CAMBIO DE TEXTO DEL BOTON
    if(currentStep === steps.length - 1){
        nextBtn.textContent = "Enviar denuncia"
    }else{
        nextBtn.textContent = "Siguiente"
    }

}

/* ================================
   BOTON SIGUIENTE
================================ */
   
nextBtn.addEventListener("click",()=>{

    /* ================= VALIDAR ANONIMATO ================= */
    if(currentStep === 0){

        const selected = document.querySelector("input[name='anonimo']:checked")

        if(!selected){

            const radioGroup = document.querySelector(".radio-group")

            if(!radioGroup.querySelector(".error-message")){

                const error = document.createElement("span")
                error.className = "error-message"
                error.innerText = "Debe seleccionar una opción"

                radioGroup.appendChild(error)
            }

            return
        }
    }

    /* ================= VALIDAR EMPRESA ================= */
    if(currentStep === 1){
        if(!validarEmpresa()) return
    }

    /* ================= VALIDAR SUCURSAL ================= */
    if(currentStep === 2){
        if(!validarSucursal()) return
    }

    /* ================= VALIDACION GENERAL ================= */
    if(!validateStep()) return

    /* ================= AVANZAR ================= */
    if(currentStep < steps.length - 1){

        currentStep++

        const stepActual = steps[currentStep]

        /* ✅ CARGAR CUESTIONARIO EN EL MOMENTO CORRECTO */
        if(stepActual.id === "cuestionario"){
            cargarCuestionario()
        }

        /* ✅ GENERAR RESUMEN EN EL ULTIMO PASO */
        if(stepActual.id === "resumen-step"){
            generarResumen()
            nextBtn === "Enviar denuncia"
        }

        showStep()
    }

})



function generarResumen(){

    const form = document.getElementById("formDenuncia")
    const resumen = document.getElementById("resumen-contenido")

    const data = new FormData(form)

    let html = ""

    // 👇 detectar anonimato
    const anonimo = form.querySelector("input[name='anonimo']:checked")?.value

    data.forEach((valor, clave)=>{

        let mostrarValor = valor

        // 🚫 OCULTAR DATOS PERSONALES SI ES ANONIMO
        if(anonimo === "si"){
            const camposPersonales = [
                "nombre",
                "apellido",
                "email",
                "telefono",
                "dni",
                "genero"
            ]

            if(camposPersonales.includes(clave)){
                return
            }
        }

        // 📎 ARCHIVOS
        if(valor instanceof File){

            if(valor.name === ""){
                mostrarValor = "🚫 No se adjuntó ningún archivo"
            }else{
                mostrarValor = "📎 " + valor.name
            }

        }

        // 🚫 IGNORAR VACÍOS
        if(mostrarValor === "" || mostrarValor === null || mostrarValor === undefined){
            return
        }

        let label = clave
            .replaceAll("_"," ")
            .replace(/\b\w/g, l => l.toUpperCase())

        html += `
            <div class="resumen-item">
                <span class="resumen-label">${label}</span>
                <span class="resumen-valor">${mostrarValor}</span>
            </div>
        `

    })

    resumen.innerHTML = html
}

/* ================================
   BOTON ANTERIOR
================================ */

prevBtn.addEventListener("click",()=>{

    if(currentStep > 0){
        currentStep--
        showStep()
    }

})

/* ================================
   NO CONOCE DATOS
================================ */

if(noDatosDenunciado){

    noDatosDenunciado.addEventListener("change",()=>{

        if(noDatosDenunciado.checked){

            camposDenunciado.forEach(campo=>{
                campo.removeAttribute("required")
                campo.value = ""
                removeError(campo)
            })

        }else{

            camposDenunciado.forEach(campo=>{
                campo.setAttribute("required","required")
            })

        }

    })

}

/* ================================
   ANONIMATO
================================ */

radiosAnonimo.forEach(radio=>{

    radio.addEventListener("change",()=>{

        const selected = document.querySelector("input[name='anonimo']:checked")

        if(!datos || !selected) return

        if(selected.value === "si"){

            datos.style.display = "none"

            datos.querySelectorAll("input").forEach(input=>{
                input.removeAttribute("required")
            })

        }else{

            datos.style.display = "block"

            datos.querySelectorAll("input").forEach(input=>{
                input.setAttribute("required","required")
            })

        }

    })

})

/* ================================
   VALIDACION GENERAL
================================ */

function validateStep(){

    let valid = true

    const currentFields = steps[currentStep].querySelectorAll("input, textarea, select")

    currentFields.forEach(field=>{

        removeError(field)

        if(field.offsetParent === null) return

        if(field.hasAttribute("required") && field.value.trim() === ""){
            showError(field,"Campo obligatorio")
            valid = false
        }

    })

    return valid
}

/* ================================
   ERRORES (UNIFICADO)
================================ */

function showError(field,message){

    field.classList.add("input-error")

    let error = field.parentNode.querySelector(".error-message")

    if(!error){
        error = document.createElement("span")
        error.className = "error-message"
        field.parentNode.appendChild(error)
    }

    error.innerText = message
}

function removeError(field){

    field.classList.remove("input-error")

    const error = field.parentNode.querySelector(".error-message")

    if(error){
        error.remove()
    }
}

/* LIMPIAR ERROR */

document.querySelectorAll("input, textarea, select").forEach(field=>{

    field.addEventListener("input",()=>{
        removeError(field)
    })

})

/* ================================
   EMPRESA → SUCURSALES
================================ */

empresaInput.addEventListener("input",()=>{

    const empresa = empresaInput.value.trim()

    sucursalInput.value = ""
    sucursalList.innerHTML = ""

    if(empresasSucursales[empresa]){

        empresasSucursales[empresa].forEach(sucursal=>{

            const option = document.createElement("option")
            option.value = sucursal

            sucursalList.appendChild(option)
        })
    }

})

/* ================================
   VALIDACIONES ESPECIFICAS
================================ */

function validarEmpresa(){

    const empresa = empresaInput.value.trim()

    if(!empresasSucursales.hasOwnProperty(empresa)){
        showError(empresaInput,"Por favor ingrese una empresa válida")
        return false
    }

    removeError(empresaInput)
    return true
}

function validarSucursal(){

    const empresa = empresaInput.value.trim()
    const sucursal = sucursalInput.value.trim()

    if(!empresasSucursales[empresa]){
        showError(empresaInput,"Seleccione primero una empresa válida")
        return false
    }

    if(!empresasSucursales[empresa].includes(sucursal)){
        showError(sucursalInput,"Por favor ingrese una sucursal válida")
        return false
    }

    removeError(sucursalInput)
    return true
}

/* ================================
   FECHA MAXIMA
================================ */

document.getElementById("fecha_hecho").max = new Date().toISOString().split("T")[0]

/* ================================
   MENU MOBILE
================================ */

const toggle = document.querySelector(".menu-toggle")
const menu = document.querySelector(".nav-menu")

if(toggle && menu){

    toggle.addEventListener("click",()=>{
        menu.classList.toggle("active")
    })

}

/* ================================
   INICIO
================================ */

showStep()
