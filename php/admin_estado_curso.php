<?php
session_start();
require 'conexion.php';
header('Content-Type: application/json');

// Seguridad: Solo admin
if (!isset($_SESSION['user_id']) || $_SESSION['user_rol'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'No autorizado']);
    exit;
}

// Recibir datos JSON
$input = json_decode(file_get_contents('php://input'), true);
$id_curso = $input['id'] ?? '';
$accion = $input['accion'] ?? ''; // 'aprobar' o 'rechazar'

if (empty($id_curso) || empty($accion)) {
    echo json_encode(['success' => false, 'message' => 'Faltan datos.']);
    exit;
}

try {
    $nuevoEstado = ($accion === 'aprobar') ? 'activo' : 'rechazado';

    $sql = "UPDATE cursos SET estado = :estado WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':estado' => $nuevoEstado,
        ':id' => $id_curso
    ]);

    echo json_encode(['success' => true, 'message' => "Curso $nuevoEstado correctamente."]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error BD: ' . $e->getMessage()]);
}
?>