<?php
require 'conexion.php';
header('Content-Type: application/json');

try {
    // Obtenemos ID, Nombre, Email y Rol de todos los usuarios
    $sql = "SELECT id, nombre, email, rol FROM usuarios ORDER BY id DESC";
    $stmt = $pdo->query($sql);
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'usuarios' => $usuarios]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>