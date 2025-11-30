<?php
session_start();
require 'conexion.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || $_SESSION['user_rol'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Acceso denegado.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$id_curso = $input['id_curso'] ?? null;
$estado = $input['estado'] ?? null; // Debe ser 'activo' o 'rechazado'
$motivo = $input['motivo'] ?? null; // Capturamos el motivo

// Validación de datos mínimos
if (!$id_curso || !in_array($estado, ['activo', 'rechazado'])) {
    echo json_encode(['success' => false, 'message' => 'Datos de validación incompletos o inválidos.']);
    exit;
}

try {
    // PREPARACIÓN DINÁMICA DE LA CONSULTA
    $set_clause = "estado = :estado";
    $params = [':estado' => $estado, ':id_curso' => $id_curso];

    // Si la acción es rechazar, añadimos el campo motivo_rechazo
    if ($estado === 'rechazado') {
        $set_clause .= ", motivo_rechazo = :motivo";
        $params[':motivo'] = $motivo;

        // Si el rechazo está vacío, forzamos un mensaje
        if (empty($motivo)) {
            $params[':motivo'] = "Motivo no especificado por el administrador.";
        }
    }

    // CONSTRUCCIÓN Y EJECUCIÓN ÚNICA
    $sql = "UPDATE cursos SET {$set_clause} WHERE id = :id_curso AND estado = 'pendiente'";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    // RESPUESTA
    if ($stmt->rowCount() > 0) {
        $accion = ($estado === 'activo') ? 'Aprobado' : 'Rechazado';
        echo json_encode(['success' => true, 'message' => "Curso actualizado. Estado: {$accion}."]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: El curso no existe o ya fue validado por otro administrador.']);
    }

} catch (PDOException $e) {
    // Error de columna (42S22) significa que 'motivo_rechazo' no existe en tu tabla.
    echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
}
?>