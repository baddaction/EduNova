<?php
session_start();
require 'conexion.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'No logueado']);
    exit;
}

$id_usuario = $_SESSION['user_id'];

try {
    // Obtener fecha actual de vencimiento
    $stmt = $pdo->prepare("SELECT fecha_vencimiento FROM usuarios WHERE id = :id");
    $stmt->execute([':id' => $id_usuario]);
    $fechaActual = $stmt->fetchColumn();

    $ahora = date('Y-m-d H:i:s');

    // Si ya venció o es nula, empezamos desde HOY. Si no, sumamos desde la fecha que tenía.
    if (!$fechaActual || $fechaActual < $ahora) {
        $base = $ahora;
    } else {
        $base = $fechaActual;
    }

    // Sumar 30 días
    $nuevaFecha = date('Y-m-d H:i:s', strtotime($base . ' + 30 days'));

    // Actualizar en BD
    $update = $pdo->prepare("UPDATE usuarios SET fecha_vencimiento = :f WHERE id = :id");
    $update->execute([':f' => $nuevaFecha, ':id' => $id_usuario]);

    echo json_encode(['success' => true, 'message' => '¡Pago exitoso! Suscripción activa hasta ' . $nuevaFecha]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>