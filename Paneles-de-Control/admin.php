<?php
$ruta = '../';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Administrador</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <link rel="stylesheet" href="<?php echo $ruta; ?>css/style.css">
</head>

<body>
    <!-- Navegador -->
    <?php include '../php/navbar.php'; ?>

    <!-- Dashboard -->
    <div class="container my-5">

        <h2 class="mb-4">Panel del Administrador</h2>

        <!-- Tabs -->
        <ul class="nav nav-tabs" id="adminTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="usuarios-tab" data-bs-toggle="tab" data-bs-target="#usuarios"
                    type="button" role="tab">Gestión de Usuarios</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="cursos-tab" data-bs-toggle="tab" data-bs-target="#cursos" type="button"
                    role="tab">Validación de Cursos</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="reseñas-tab" data-bs-toggle="tab" data-bs-target="#reseñas" type="button"
                    role="tab">Moderación de Reseñas</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="stats-tab" data-bs-toggle="tab" data-bs-target="#stats" type="button"
                    role="tab">Estadísticas Globales</button>
            </li>
        </ul>

        <!-- Content -->
        <div class="tab-content p-4 border border-top-0 bg-white" id="adminTabsContent">

            <!-- Gestión de usuarios -->
            <div class="tab-pane fade show active" id="usuarios" role="tabpanel">
                <h4 class="mb-3">Gestión de Usuarios</h4>

                <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#modalUsuario">
                    + Agregar Usuario
                </button>

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody id="tablaUsuarios">
                        <!-- Aquí se agregan usuarios -->
                    </tbody>
                </table>

                <!-- Modal Usuarios -->
                <div class="modal fade" id="modalUsuario" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Agregar Usuario</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">

                                <form id="formUsuario">
                                    <input type="hidden" id="usuarioId">

                                    <div class="mb-3">
                                        <label>Nombre</label>
                                        <input type="text" class="form-control" id="usuarioNombre" required>
                                    </div>

                                    <div class="mb-3">
                                        <label>Email</label>
                                        <input type="email" class="form-control" id="usuarioEmail" required>
                                    </div>

                                    <div class="mb-3">
                                        <label>Rol</label>
                                        <select class="form-select" id="usuarioRol">
                                            <option>Administrador</option>
                                            <option>Instructor</option>
                                            <option>Alumno</option>
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                        <label>Contraseña (opcional al editar)</label>
                                        <input type="password" class="form-control" id="usuarioPassword">
                                    </div>

                                    <button class="btn btn-success" type="submit">Guardar</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Validación de cursos -->
            <div class="tab-pane fade" id="cursos" role="tabpanel">
                <div class="validacion-container">
                    <h2>Validación de Cursos</h2>

                    <table class="tabla-validacion">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Maestro</th>
                                <th>Fecha de creación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody id="lista-cursos">
                        </tbody>
                    </table>
                </div>


                <!-- Modal Ver detalles -->
                <div id="modalDetalles" class="modal">
                    <div class="modal-content">
                        <span class="cerrar">&times;</span>
                        <h3>Detalles del curso</h3>
                        <p><strong>ID:</strong> <span id="det-id"></span></p>
                        <p><strong>Título:</strong> <span id="det-titulo"></span></p>
                        <p><strong>Maestro:</strong> <span id="det-maestro"></span></p>
                        <p><strong>Archivos enviados:</strong></p>
                        <ul id="det-archivos"></ul>
                    </div>
                </div>

                <!-- Modal Rechazar -->
                <div id="modalRechazar" class="modal">
                    <div class="modal-content">
                        <span class="cerrarR">&times;</span>
                        <h3>Motivo de rechazo</h3>
                        <textarea id="motivoRechazo" placeholder="Escribe la razón..." rows="4"></textarea>
                        <button class="btn-rechazar-confirm" id="btnConfirmarRechazo">Enviar</button>
                    </div>
                </div>


            </div>

            <!-- Moderación de reseñas -->
            <div class="tab-pane fade" id="reseñas" role="tabpanel">
                <div class="p-4">
                    <h3 class="mb-4">Moderación de Reseñas</h3>

                    <!-- Filtros -->
                    <div class="row mb-3">
                        <div class="col-md-4 mb-2">
                            <input type="text" class="form-control" placeholder="Buscar por curso..." id="buscarCurso">
                        </div>
                        <div class="col-md-4 mb-2">
                            <input type="text" class="form-control" placeholder="Buscar por alumno..."
                                id="buscarAlumno">
                        </div>
                        <div class="col-md-4 mb-2">
                            <select class="form-select" id="filtrarEstado">
                                <option value="">Filtrar por estado</option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="Aprobada">Aprobada</option>
                                <option value="Rechazada">Rechazada</option>
                            </select>
                        </div>
                    </div>

                    <!-- Tabla -->
                    <div class="table-responsive border rounded shadow-sm">
                        <table class="table align-middle mb-0">
                            <thead class="table-dark">
                                <tr>
                                    <th>Curso</th>
                                    <th>Alumno</th>
                                    <th>Comentario</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody id="tablaResenas">
                                <!-- Reseñas se cargan aquí -->
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <!-- Estadísticas -->
            <div class="tab-pane fade" id="stats" role="tabpanel">
                <div class="estadisticas-container">
                    <h1>Estadísticas Globales</h1>

                    <div class="stats-grid">
                        <div class="stat-card">
                            <span id="usuariosRegistrados" class="stat-number">0</span>
                            <p>Usuarios Registrados</p>
                        </div>

                        <div class="stat-card">
                            <span id="cursosActivos" class="stat-number">0</span>
                            <p>Cursos Activos</p>
                        </div>

                        <div class="stat-card">
                            <span id="suscripcionesActivas" class="stat-number">0</span>
                            <p>Suscripciones Activas</p>
                        </div>

                        <div class="stat-card">
                            <span id="comentariosTotales" class="stat-number">0</span>
                            <p>Comentarios Totales</p>
                        </div>
                    </div>

                    <div class="precio-card">
                        <h2 id="precioActual" class="precio">$0 MXN</h2>
                        <p>Precio actual de la suscripción</p>

                        <input type="number" id="nuevoPrecio" placeholder="Nuevo precio" />
                        <button onclick="actualizarPrecio()">Actualizar</button>
                    </div>
                </div>


            </div>

        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>


    <script> const basePath = "<?php echo $ruta; ?>"; </script>
    <script src="<?php echo $ruta; ?>js/navbar.js"></script>

    <script src="<?php echo $ruta; ?>js/adminValidacion.js?v=2"></script>
    <script src="<?php echo $ruta; ?>js/adminUsuarios.js?v=2"></script>
    <script src="<?php echo $ruta; ?>js/adminResenas.js?v=2"></script>
    <script src="<?php echo $ruta; ?>js/adminEstadisticas.js?v=2"></script>

</body>

</html>