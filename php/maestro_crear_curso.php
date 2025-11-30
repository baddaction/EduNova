<?php
session_start();
require 'conexion.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['user_rol'] !== 'maestro') {
    echo json_encode(['success' => false, 'message' => 'No autorizado']);
    exit;
}

$id_maestro = $_SESSION['user_id'];
$titulo = $_POST['titulo'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';

// Validaciones básicas
if (empty($titulo) || empty($descripcion)) {
    echo json_encode(['success' => false, 'message' => 'Título y descripción obligatorios.']);
    exit;
}

try {
    // Manejo de la Imagen
    $rutaImagen = null;
    
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $nombreArchivo = time() . '_' . basename($_FILES['imagen']['name']);
        $directorioDestino = '../img/cursos/';
        $rutaGuardar = 'img/cursos/' . $nombreArchivo; // Ruta para la BD (sin ../)

        // Mover imagen a la carpeta
        if (move_uploaded_file($_FILES['imagen']['tmp_name'], $directorioDestino . $nombreArchivo)) {
            $rutaImagen = $rutaGuardar;
        } else {
            throw new Exception("Error al subir la imagen.");
        }
    }

    // Insertar en BD (Estado por defecto: 'pendiente' -> Admin debe aprobar)
    $sql = "INSERT INTO cursos (titulo, descripcion, imagen, id_instructor, estado) 
            VALUES (:titulo, :desc, :img, :instructor, 'pendiente')"; // OJO: 'pendiente' en minúscula
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':titulo' => $titulo,
        ':desc' => $descripcion,
        ':img' => $rutaImagen,
        ':instructor' => $id_maestro
    ]);

    echo json_encode(['success' => true, 'message' => 'Curso creado. Esperando aprobación del admin.']);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error BD: ' . $e->getMessage()]);
}
?>