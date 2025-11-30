<?php
session_start(); // Iniciamos sesión para saber quién ve la página
require 'conexion.php';
header('Content-Type: application/json');

$id_curso = $_GET['id'] ?? null;
$id_usuario = $_SESSION['user_id'] ?? null; // ID del usuario actual (si existe)

if (!$id_curso) {
    echo json_encode(['success' => false, 'message' => 'Falta el ID']);
    exit;
}

try {
    // Datos del Curso
    $sql = "SELECT c.id, c.titulo, c.descripcion, c.imagen, u.nombre as instructor 
            FROM cursos c
            JOIN usuarios u ON c.id_instructor = u.id
            WHERE c.id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':id' => $id_curso]);
    $curso = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$curso) {
        echo json_encode(['success' => false, 'message' => 'Curso no encontrado']);
        exit;
    }

    // Validacion para saber si el usuario está inscrito
    $inscrito = false;
    if ($id_usuario) {
        $sqlCheck = "SELECT id FROM inscripciones WHERE id_alumno = :alumno AND id_curso = :curso";
        $stmtCheck = $pdo->prepare($sqlCheck);
        $stmtCheck->execute([':alumno' => $id_usuario, ':curso' => $id_curso]);
        if ($stmtCheck->rowCount() > 0) {
            $inscrito = true;
        }
    }

    // Temas 
    $sqlTemas = "SELECT titulo, descripcion, archivo FROM temas WHERE id_curso = :id ORDER BY id ASC";
    $stmtT = $pdo->prepare($sqlTemas);
    $stmtT->execute([':id' => $id_curso]);
    $temas = $stmtT->fetchAll(PDO::FETCH_ASSOC);

    // 4. RESEÑAS
    $sqlRes = "SELECT r.comentario, r.fecha, u.nombre as usuario 
               FROM resenas r
               JOIN usuarios u ON r.id_alumno = u.id
               WHERE r.id_curso = :id AND r.estado = 'Aprobada'
               ORDER BY r.fecha DESC";
    $stmtR = $pdo->prepare($sqlRes);
    $stmtR->execute([':id' => $id_curso]);
    $resenas = $stmtR->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'curso' => $curso,
        'inscrito' => $inscrito,
        'temas' => $temas,
        'resenas' => $resenas
    ]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error BD: ' . $e->getMessage()]);
}
?>