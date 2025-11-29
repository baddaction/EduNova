<?php
session_start();
session_destroy();
// Redirigir al inicio
header("Location: ../login.html");
exit;
?>