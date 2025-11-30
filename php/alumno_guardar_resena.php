<?php
session_start();
require 'conexion.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['user_rol'] !== 'alumno') {
    echo json_encode(['success' => false, 'message' => 'Debes ser alumno para opinar.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$id_curso = $input['id_curso'] ?? '';
$comentario = trim($input['comentario'] ?? '');
$id_alumno = $_SESSION['user_id'];

if (empty($id_curso) || empty($comentario)) {
    echo json_encode(['success' => false, 'message' => 'Escribe un comentario.']);
    exit;
}

try {
    // Verificar si ya compró el curso (Solo alumnos inscritos pueden opinar)
    $check = $pdo->prepare("SELECT id FROM inscripciones WHERE id_alumno = :a AND id_curso = :c");
    $check->execute([':a' => $id_alumno, ':c' => $id_curso]);

    if ($check->rowCount() === 0) {
        echo json_encode(['success' => false, 'message' => 'Debes inscribirte para dejar una reseña.']);
        exit;
    }

    // Guardar reseña
    $sql = "INSERT INTO resenas (id_curso, id_alumno, comentario, estado) VALUES (:c, :a, :msg, 'Pendiente')";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':c' => $id_curso, ':a' => $id_alumno, ':msg' => $comentario]);

    echo json_encode(['success' => true, 'message' => 'Reseña enviada. Esperando aprobación.']);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>