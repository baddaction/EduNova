<?php
require 'conexion.php';

$input = json_decode(file_get_contents('php://input'), TRUE);
$email = $input['email'] ?? '';
$pass  = $input['password'] ?? '';

if (empty($pass) || empty($email)) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos.']);
    exit;
}

// Actualizar contraseña y borrar el código usado
$sql = "UPDATE usuarios SET contrasena = :pass, reset_code = NULL, reset_expires = NULL WHERE correo = :correo";
$stmt = $pdo->prepare($sql);

if ($stmt->execute([':pass' => $pass, ':correo' => $email])) {
    echo json_encode(['success' => true, 'message' => 'Contraseña actualizada correctamente.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar.']);
}
?>