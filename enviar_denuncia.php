<?php

$conexion = new mysqli("localhost","root","","denuncias");

if($conexion->connect_error){
    die("Error de conexión");
}

/* =========================
RECIBIR DATOS
========================= */

$anonimo = $_POST['anonimo'] ?? "";

$nombre = $_POST['nombre'] ?? "";
$apellido = $_POST['apellido'] ?? "";
$email = $_POST['email'] ?? "";
$telefono = $_POST['telefono'] ?? "";

$empresa = $_POST['empresa'] ?? "";
$sucursal = $_POST['sucursal'] ?? "";

$nombre_denunciado = $_POST['nombre_denunciado'] ?? "";
$apellido_denunciado = $_POST['apellido_denunciado'] ?? "";
$sector_denunciado = $_POST['sector_denunciado'] ?? "";
$cargo_denunciado = $_POST['cargo_denunciado'] ?? "";

$sector_otro = $_POST['sector_otro'] ?? "";
$cargo_otro = $_POST['cargo_otro'] ?? "";

/* si elige "Otro", usar el texto ingresado */

if($sector_denunciado === "Otro" && !empty($sector_otro)){
    $sector_denunciado = $sector_otro;
}

if($cargo_denunciado === "Otro" && !empty($cargo_otro)){
    $cargo_denunciado = $cargo_otro;
}

$tipo_irregularidad = $_POST['tipo_irregularidad'] ?? "";

$fecha_hecho = $_POST['fecha_hecho'] ?? "";
$observacion = $_POST['observacion'] ?? "";


/* =========================
VALIDACIONES
========================= */

if($anonimo != "si" && $anonimo != "no"){
    die("Error en anonimato");
}

if($anonimo == "no"){

    if(!preg_match("/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,30}$/",$nombre)){
        die("Nombre inválido");
    }

    if(!preg_match("/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,30}$/",$apellido)){
        die("Apellido inválido");
    }

}

if(empty($empresa)){
    die("Empresa obligatoria");
}

if(empty($sucursal)){
    die("Sucursal obligatoria");
}

if(empty($tipo_irregularidad)){
    die("Debe seleccionar tipo de irregularidad");
}


/* =========================
SUBIR ARCHIVO
========================= */

$archivo_nombre = "";

if(isset($_FILES['archivo']) && $_FILES['archivo']['error'] == 0){

    $ext = strtolower(pathinfo($_FILES['archivo']['name'],PATHINFO_EXTENSION));

    $permitidos = ["jpg","jpeg","png","pdf","doc","docx","xls","xlsx","zip"];

    if(!in_array($ext,$permitidos)){
        die("Tipo de archivo no permitido");
    }

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $_FILES['archivo']['tmp_name']);
    finfo_close($finfo);

    $mime_permitidos = [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/zip"
    ];

    if(!in_array($mime,$mime_permitidos)){
        die("Tipo de archivo no permitido");
    }




    $tamano_max = 25 * 1024 * 1024; // 25MB

    if($_FILES['archivo']['size'] > $tamano_max){
        die("El archivo es demasiado grande. Máximo 25MB");
    }

    $archivo_nombre = time().".".$ext;

    move_uploaded_file(
        $_FILES['archivo']['tmp_name'],
        "uploads/".$archivo_nombre
    );
}




$respuestas = [];

foreach($_POST as $clave => $valor){

    if(strpos($clave,"respuesta_") === 0){

        $respuestas[$clave] = $valor;

    }

}

$respuestas_json = json_encode($respuestas);


/* =========================
INSERT SEGURO
========================= */

$stmt = $conexion->prepare("
INSERT INTO denuncias (
anonimo,
nombre,
apellido,
email,
telefono,
empresa,
sucursal,
nombre_denunciado,
apellido_denunciado,
sector_denunciado,
cargo_denunciado,
tipo_irregularidad,
fecha_hecho,
observacion,
archivo,
respuestas
) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
");

$stmt->bind_param(
"ssssssssssssssss",
$anonimo,
$nombre,
$apellido,
$email,
$telefono,
$empresa,
$sucursal,
$nombre_denunciado,
$apellido_denunciado,
$sector_denunciado,
$cargo_denunciado,
$tipo_irregularidad,
$fecha_hecho,
$observacion,
$archivo_nombre,
$respuestas_json
);

$stmt->execute();

echo "<h2>Denuncia enviada correctamente</h2>";

$stmt->close();
$conexion->close();