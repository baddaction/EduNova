<?php
session_start();
require 'conexion.php';
header('Content-Type: application/json');

// Seguridad: Solo maestros
if (!isset($_SESSION['user_id']) || $_SESSION['user_rol'] !== 'maestro') {
    echo json_encode(['success' => false, 'message' => 'No autorizado']);
    exit;
}

$id_curso = $_POST['id_curso'] ?? '';
$titulo = $_POST['titulo'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';

// Validar datos obligatorios
if (empty($id_curso) || empty($titulo)) {
    echo json_encode(['success' => false, 'message' => 'El título es obligatorio.']);
    exit;
}

try {
    // Manejo del Archivo (PDF, Video, Imagen)
    $rutaArchivo = null;
    
    // Verificamos si enviaron un archivo y si no hubo errores
    if (isset($_FILES['archivo']) && $_FILES['archivo']['error'] === UPLOAD_ERR_OK) {
        
        // Creamos nombre único: tiempo_nombreOriginal
        $nombreArchivo = time() . '_' . basename($_FILES['archivo']['name']);
        
        // Carpeta donde se guardará físicamente
        $directorioDestino = '../materiales/';
        
        // Ruta que se guardará en la BD
        $rutaBD = 'materiales/' . $nombreArchivo;

        // Intentamos mover el archivo
        if (move_uploaded_file($_FILES['archivo']['tmp_name'], $directorioDestino . $nombreArchivo)) {
            $rutaArchivo = $rutaBD;
        } else {
            throw new Exception("No se pudo guardar el archivo en la carpeta 'materiales'. Revisa permisos.");
        }
    }

    // Insertar en la Base de Datos
    $sql = "INSERT INTO temas (id_curso, titulo, descripcion, archivo) VALUES (:id_curso, :titulo, :desc, :archivo)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':id_curso' => $id_curso,
        ':titulo' => $titulo,
        ':desc' => $descripcion,
        ':archivo' => $rutaArchivo
    ]);

    echo json_encode(['success' => true, 'message' => 'Tema agregado correctamente.']);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>