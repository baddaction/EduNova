<?php
// checador de sesion
session_start();

header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    // Si hay sesión, devolvemos los datos seguros
    echo json_encode([
        'logged_in' => true,
        'nombre' => $_SESSION['user_nombre'],
        'rol' => $_SESSION['user_rol']
    ]);
} else {
    // Si no hay sesión
    echo json_encode(['logged_in' => false]);
}
?>