<?php
require 'conexion.php';
header('Content-Type: application/json');

try {
    // Total de Usuarios
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM usuarios");
    $totalUsuarios = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Cursos Activos
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM cursos WHERE estado = 'activo'");
    $cursosActivos = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Inscripciones
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM inscripciones");
    $totalInscripciones = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Interacción Total (Comentarios)
    $stmtResenas = $pdo->query("SELECT COUNT(*) as total FROM resenas");
    $countResenas = $stmtResenas->fetch(PDO::FETCH_ASSOC)['total'];

    // Contamos Hilos del Foro (Temas nuevos)
    $stmtHilos = $pdo->query("SELECT COUNT(*) as total FROM foro_hilos");
    $countHilos = $stmtHilos->fetch(PDO::FETCH_ASSOC)['total'];

    // Contamos Posts del Foro (Respuestas)
    $stmtPosts = $pdo->query("SELECT COUNT(*) as total FROM foro_posts");
    $countPosts = $stmtPosts->fetch(PDO::FETCH_ASSOC)['total'];

    // Sumamos todo para tener el "Total de Comentarios/Interacciones"
    $totalInteraccion = $countResenas + $countHilos + $countPosts;

    echo json_encode([
        'success' => true,
        'stats' => [
            'usuarios' => $totalUsuarios,
            'cursos' => $cursosActivos,
            'inscripciones' => $totalInscripciones,
            'comentarios' => $totalInteraccion
        ]
    ]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error BD: ' . $e->getMessage()]);
}
?>