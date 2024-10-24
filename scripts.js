document.addEventListener('DOMContentLoaded', function() {
    // Obtener el cuerpo de la tabla
    const horarioBody = document.getElementById('horario-body');

    // Función para agregar una fila de curso
    function agregarCurso(curso) {
        const row = document.createElement('tr');

        // Aquí vamos a crear la fila del curso con las celdas correspondientes
        const horaCell = document.createElement('td');
        horaCell.textContent = curso.hora;
        row.appendChild(horaCell);

        const dias = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA'];
        dias.forEach(dia => {
            const cell = document.createElement('td');
            if (curso.dia === dia) {
                cell.classList.add('bg-info', 'text-white');
                cell.textContent = `${curso.nomCurso} (${curso.teopra})`;
            }
            row.appendChild(cell);
        });

        // Agregar la fila a la tabla
        horarioBody.appendChild(row);
    }

    // Cargar los datos desde el archivo JSON
    fetch('cursos.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(curso => {
                agregarCurso(curso);
            });
        })
        .catch(error => {
            console.error('Error al cargar los cursos:', error);
        });
});
