<?php
session_start();
require 'conexion.php';
header('Content-Type: application/json');

// Verificar si es alumno
if (!isset($_SESSION['user_id']) || $_SESSION['user_rol'] !== 'alumno') {
    echo json_encode(['success' => false, 'message' => 'Debes iniciar sesión como alumno.']);
    exit;
}

$id_alumno = $_SESSION['user_id'];
$input = json_decode(file_get_contents('php://input'), true);
$id_curso = $input['id_curso'] ?? '';

if (empty($id_curso)) {
    echo json_encode(['success' => false, 'message' => 'Error: Curso no identificado.']);
    exit;
}

try {
    // Verificar si YA está inscrito
    $check = $pdo->prepare("SELECT id FROM inscripciones WHERE id_alumno = :alumno AND id_curso = :curso");
    $check->execute([':alumno' => $id_alumno, ':curso' => $id_curso]);

    if ($check->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'Ya estás inscrito en este curso.']);
        exit;
    }

    // Inscribir
    $sql = "INSERT INTO inscripciones (id_alumno, id_curso) VALUES (:alumno, :curso)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':alumno' => $id_alumno, ':curso' => $id_curso]);

    echo json_encode(['success' => true, 'message' => '¡Inscripción exitosa!']);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error BD: ' . $e->getMessage()]);
}
?>