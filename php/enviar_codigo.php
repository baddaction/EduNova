<?php
require 'conexion.php';

$input = json_decode(file_get_contents('php://input'), TRUE);
$email = $input['email'] ?? '';
$response = ['success' => false, 'message' => ''];

if (empty($email)) {
    echo json_encode(['success' => false, 'message' => 'Falta el correo.']);
    exit;
}

// Verificar si existe el usuario
$stmt = $pdo->prepare("SELECT id FROM usuarios WHERE correo = :correo");
$stmt->execute([':correo' => $email]);

if ($stmt->rowCount() > 0) {
    // Generar código de 6 dígitos
    $code = rand(100000, 999999);
    
    // Guardar código en la BD (Expira en 15 minutos)
    $sql = "UPDATE usuarios SET reset_code = :code, reset_expires = DATE_ADD(NOW(), INTERVAL 15 MINUTE) WHERE correo = :correo";
    $update = $pdo->prepare($sql);
    $update->execute([':code' => $code, ':correo' => $email]);

    $response['success'] = true;
    // Devolver el codigo ahi mismo
    $response['message'] = 'Código generado (SIMULACIÓN CORREO): ' . $code;
} else {
    $response['message'] = 'Este correo no está registrado.';
}

header('Content-Type: application/json');
echo json_encode($response);
?>