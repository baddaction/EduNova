<nav class="navbar navbar-expand-lg bg-white py-3">
    <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="<?php echo $ruta; ?>index.php">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" width="28" class="me-2">
            <strong>EduNova</strong>
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarMain">
            <form class="d-flex mx-lg-auto my-3 my-lg-0" style="width: 55%;">
                <input class="form-control rounded-pill px-3" type="search" placeholder="🔍 Search products..." />
            </form>

            <ul class="navbar-nav ms-lg-auto mb-2 mb-lg-0 d-flex align-items-center">
                
                <li class="nav-item d-flex align-items-center" id="role-link-container"></li>

                <div id="guest-links" class="d-flex">
                    <li class="nav-item">
                        <a class="nav-link" href="<?php echo $ruta; ?>login.html"><i class="bi bi-person"></i> Iniciar Sesión</a>
                    </li>
                    <li class="nav-item ms-2">
                        <a class="nav-link" href="<?php echo $ruta; ?>Signup.html">Registrarse</a>
                    </li>
                </div>

                <div id="user-links" class="d-none dropdown ms-2">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                        <i class="bi bi-person-circle"></i> <span id="user-name-display">Perfil</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="<?php echo $ruta; ?>perfil.php">Mi Perfil</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="<?php echo $ruta; ?>php/logout.php">Cerrar Sesión</a></li>
                    </ul>
                </div>
            </ul>
        </div>
    </div>
</nav>

<nav class="bg-white border-top border-bottom">
    <div class="container">
        <ul class="nav justify-content-evenly py-2 small fw-semibold">
            <li class="nav-item"><a class="nav-link text-dark" href="#">Cocina</a></li>
            <li class="nav-item"><a class="nav-link text-dark" href="#">Contabilidad</a></li>
            <li class="nav-item"><a class="nav-link text-dark" href="#">Diseño</a></li>
            <li class="nav-item"><a class="nav-link text-dark" href="#">Programación</a></li>
            <li class="nav-item"><a class="nav-link text-dark" href="<?php echo $ruta; ?>masCursos.php">Más Cursos</a></li>
        </ul>
    </div>
</nav>