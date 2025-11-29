<?php

require 'conexion.php';

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$response = array(
    'success' => false,
    'message' => 'Error desconocido.'
);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $nombre = $input['nombre'] ?? '';
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';
    $rol = $input['rol'] ?? 'alumno'; 

    //Validar que el rol sea válido
    // Si intentan enviar 'admin' u otra cosa, lo forzamos a ser 'alumno'
    $roles_permitidos = ['alumno', 'maestro'];
    
    if (!in_array($rol, $roles_permitidos)) {
        $rol = 'alumno'; 
    }

    if (empty($nombre) || empty($email) || empty($password)) {
        $response['message'] = 'Por favor llena todos los campos.';
        echo json_encode($response);
        exit;
    }

    try {
        // Verificar correo duplicado
        $checkSql = "SELECT id FROM usuarios WHERE correo = :correo";
        $stmtCheck = $pdo->prepare($checkSql);
        $stmtCheck->execute([':correo' => $email]);

        if ($stmtCheck->rowCount() > 0) {
            $response['message'] = 'Este correo ya está registrado.';
        } else {
            // INSERTAR CON EL ROL ELEGIDO
            $sql = "INSERT INTO usuarios (nombre, correo, contrasena, rol, estado) VALUES (:nombre, :correo, :pass, :rol, 'activo')";
            $stmt = $pdo->prepare($sql);
            
            if ($stmt->execute([
                ':nombre' => $nombre,
                ':correo' => $email,
                ':pass' => $password,
                ':rol' => $rol 
            ])) {
                $response['success'] = true;
                $response['message'] = '¡Cuenta de ' . $rol . ' creada con éxito!';
            } else {
                $response['message'] = 'No se pudo registrar el usuario.';
            }
        }

    } catch (Exception $e) {
        $response['message'] = 'Error de base de datos: ' . $e->getMessage();
    }
}

header('Content-Type: application/json');
echo json_encode($response);
?>