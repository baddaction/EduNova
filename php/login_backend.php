<?php

session_start();

// conexion con base de datos
require 'conexion.php'; 

// Obtener datos del formulario
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

// Respuesta por defecto
$response = array(
    'success' => false,
    'message' => 'Error desconocido.'
);

if ($_SERVER['REQUEST_METHOD'] === 'POST'){

    $correo = $input['email'] ?? '';
    $password = $input['password'] ?? '';

    if (empty($correo) || empty($password)) {
        $response['message'] = 'Faltan datos.';
        echo json_encode($response);
        exit;
    }

    try{
        $sql = "SELECT id, nombre, contrasena, rol, estado FROM usuarios WHERE correo = :correo";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':correo' => $correo]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verificar contraseña
        if($usuario && $usuario['contrasena'] === $password){
            
            // Si el estado NO es activo (!==), entonces mandamos error.
            if($usuario['estado'] !== 'activo'){
                $response['message'] = 'Tu cuenta está suspendida.';
            }
            else{
                // Login exitoso
                $_SESSION['user_id'] = $usuario['id'];
                $_SESSION['user_nombre'] = $usuario['nombre'];
                $_SESSION['user_rol'] = $usuario['rol'];

                $response['success'] = true;
                $response['message'] = 'Bienvenido ' . $usuario['nombre'];
                $response['rol'] = $usuario['rol'];
            }
        } else {
            $response['message'] = 'Correo o contraseña incorrectos.';
        }

    } catch(Exception $e){
        $response['message'] = 'Error en la base de datos: ' . $e->getMessage();
    }
}

// Devolver respuesta en JSON a JS
header('Content-Type: application/json');
echo json_encode($response);
?>