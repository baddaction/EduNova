<?php
require 'conexion.php';
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'] ?? '';
$accion = $input['accion'] ?? ''; // 'aprobar' o 'rechazar'

if (empty($id) || empty($accion)) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos.']);
    exit;
}

try {
    $nuevoEstado = ($accion === 'aprobar') ? 'Aprobada' : 'Rechazada';

    $sql = "UPDATE resenas SET estado = :estado WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':estado' => $nuevoEstado, ':id' => $id]);

    echo json_encode(['success' => true, 'message' => "Reseña $nuevoEstado."]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>