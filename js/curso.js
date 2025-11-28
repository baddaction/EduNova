// Obtener id desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Buscar el curso
const curso = cursosFalsos.find(c => c.id == id);

// Si no existe, mostrar error
if (!curso) {
    document.body.innerHTML = "<h1>Curso no encontrado</h1>";
    throw new Error("Curso no existe");
}

// Llenar datos del curso
document.getElementById("cursoNombre").textContent = curso.nombre;
document.getElementById("cursoDescripcion").textContent = curso.descripcion;
document.getElementById("cursoImagen").src = curso.imagen;

// Instructor
document.getElementById("instructorNombre").textContent = curso.instructor.nombre;
document.getElementById("instructorBio").textContent = curso.instructor.bio;
document.getElementById("instructorImagen").src = curso.instructor.imagen;

// Temario
const temarioUl = document.getElementById("cursoTemario");
curso.temario.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    temarioUl.appendChild(li);
});

// Reseñas
const reseñasDiv = document.getElementById("cursoReseñas");
curso.reseñas.forEach(r => {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${r.usuario}:</strong> ${r.comentario}`;
    reseñasDiv.appendChild(p);
});
