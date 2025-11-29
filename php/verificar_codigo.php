<?php
require 'conexion.php';

$input = json_decode(file_get_contents('php://input'), TRUE);
$email = $input['email'] ?? '';
$code  = $input['code'] ?? '';

// Verificar que coincida correo, código y que la fecha de expiración sea mayor a AHORA
$sql = "SELECT id FROM usuarios WHERE correo = :correo AND reset_code = :code AND reset_expires > NOW()";
$stmt = $pdo->prepare($sql);
$stmt->execute([':correo' => $email, ':code' => $code]);

if ($stmt->rowCount() > 0) {
    echo json_encode(['success' => true, 'message' => 'Código correcto.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Código inválido o expirado.']);
}
?>