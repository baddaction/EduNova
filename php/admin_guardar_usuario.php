<?php
// php/admin_guardar_usuario.php (Versión Final Compatible con tu BD)
require 'conexion.php';
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

$id = $input['id'] ?? ''; 
$nombre = trim($input['nombre'] ?? '');
$email = trim($input['email'] ?? '');
$rol = $input['rol'] ?? 'alumno';
$password = trim($input['password'] ?? ''); 

if (empty($nombre) || empty($email)) {
    echo json_encode(['success' => false, 'message' => 'Nombre y Email requeridos.']);
    exit;
}

try {
    if (empty($id)) {
        // --- CREAR ---
        if (empty($password)) {
            echo json_encode(['success' => false, 'message' => 'Falta contraseña.']);
            exit;
        }
        $passHash = password_hash($password, PASSWORD_DEFAULT);
        
        // CORREGIDO: Usamos 'email', 'contrasena' y agregamos 'estado'='activo'
        $sql = "INSERT INTO usuarios (nombre, email, contrasena, rol, estado) VALUES (:nombre, :email, :pass, :rol, 'activo')";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':nombre' => $nombre, ':email' => $email, ':pass' => $passHash, ':rol' => $rol]);
        
        echo json_encode(['success' => true, 'message' => 'Usuario creado.']);
    } else {
        // --- EDITAR ---
        if (!empty($password)) {
            $passHash = password_hash($password, PASSWORD_DEFAULT);
            $sql = "UPDATE usuarios SET nombre=:n, email=:e, rol=:r, contrasena=:p WHERE id=:id";
            $params = [':n'=>$nombre, ':e'=>$email, ':r'=>$rol, ':p'=>$passHash, ':id'=>$id];
        } else {
            $sql = "UPDATE usuarios SET nombre=:n, email=:e, rol=:r WHERE id=:id";
            $params = [':n'=>$nombre, ':e'=>$email, ':r'=>$rol, ':id'=>$id];
        }
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        echo json_encode(['success' => true, 'message' => 'Usuario actualizado.']);
    }

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>