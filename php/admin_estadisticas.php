<?php
require 'conexion.php';
header('Content-Type: application/json');

// Si el admin envía un dato por POST, actualizamos la tabla configuracion
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (isset($input['precio'])) {
        try {
            $sql = "UPDATE configuracion SET valor = :v WHERE clave = 'precio_suscripcion'";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([':v' => $input['precio']]);
            echo json_encode(['success' => true, 'message' => 'Precio actualizado correctamente.']);
            exit; // Terminamos aquí para no devolver las estadísticas
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Error al actualizar: ' . $e->getMessage()]);
            exit;
        }
    }
}

// LÓGICA PARA LEER ESTADÍSTICAS Y PRECIO
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

    // Contamos Hilos del Foro 
    $stmtHilos = $pdo->query("SELECT COUNT(*) as total FROM foro_hilos");
    $countHilos = $stmtHilos->fetch(PDO::FETCH_ASSOC)['total'];

    // Contamos Posts del Foro 
    $stmtPosts = $pdo->query("SELECT COUNT(*) as total FROM foro_posts");
    $countPosts = $stmtPosts->fetch(PDO::FETCH_ASSOC)['total'];

    // Sumamos todo
    $totalInteraccion = $countResenas + $countHilos + $countPosts;

    // --- NUEVO: LEER EL PRECIO ACTUAL ---
    $stmtPrecio = $pdo->query("SELECT valor FROM configuracion WHERE clave = 'precio_suscripcion'");
    $precioActual = $stmtPrecio->fetchColumn();
    // Si no existe, ponemos 0 o un default
    if ($precioActual === false)
        $precioActual = "0";

    echo json_encode([
        'success' => true,
        'stats' => [
            'usuarios' => $totalUsuarios,
            'cursos' => $cursosActivos,
            'inscripciones' => $totalInscripciones,
            'comentarios' => $totalInteraccion,
            'precio' => $precioActual // <--- Agregamos esto al JSON
        ]
    ]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error BD: ' . $e->getMessage()]);
}
?>