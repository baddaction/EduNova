<?php
// php/admin_eliminar_usuario.php
require 'conexion.php';
header('Content-Type: application/json');
session_start();

$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'] ?? '';

if (empty($id)) {
    echo json_encode(["success" => false, "message" => "ID no recibido."]);
    exit;
}

// Evitar que un admin se desactive a sí mismo
$currentUserId = $_SESSION['user_id'] ?? null;
if ($currentUserId && intval($currentUserId) === intval($id)) {
    echo json_encode(["success" => false, "message" => "No puedes desactivar tu propia cuenta."]);
    exit;
}

// Evitar desactivar a otro admin
$roleCheck = $pdo->prepare("SELECT rol FROM usuarios WHERE id = ?");
$roleCheck->execute([$id]);
$targetRole = $roleCheck->fetchColumn();

if ($targetRole === 'admin') {
    echo json_encode(["success" => false, "message" => "No puedes desactivar a otro administrador."]);
    exit;
}

try {
    // Verificar existencia
    $check = $pdo->prepare("SELECT id, estado FROM usuarios WHERE id = ?");
    $check->execute([$id]);
    if ($check->rowCount() === 0) {
        echo json_encode(["success" => false, "message" => "Usuario no encontrado."]);
        exit;
    }

    $row = $check->fetch(PDO::FETCH_ASSOC);
    if ($row['estado'] === 'inactivo') {
        echo json_encode(["success" => false, "message" => "Usuario ya está inactivo."]);
        exit;
    }

    // Soft delete: marcar como inactivo
    $stmt = $pdo->prepare("UPDATE usuarios SET estado = 'inactivo' WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(["success" => true, "message" => "Usuario marcado como inactivo."]);

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
