<?php
// Credenciales
$host = 'localhost';
$dbname = 'Edunova';
$username = 'root';
$password = '';

try {
    //Crear coneccion con PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);

    //Configurar PDO para lanzar excepciones en caso de error
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "¡Conexión exitosa a la base de datos Edunova!";

} catch (PDOException $e) {
    // Si algo falla, mostramos el error (en producción no debes mostrar detalles técnicos)
    die("Error de conexión: " . $e->getMessage());
}
?>