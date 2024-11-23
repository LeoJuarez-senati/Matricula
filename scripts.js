document.addEventListener('DOMContentLoaded', function () {
    const horarioBody = document.getElementById('horario-body');
    const cursosBody = document.getElementById('cursos-body');

    // Cargar datos de JSON
    function cargarDatos(url, callback) {
        fetch(url)
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => console.error('Error al cargar los datos:', error));
    }

    // Renderizar horario
    function renderizarHorario(data) {
        data.forEach(curso => {
            const row = document.createElement('tr');
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

            horarioBody.appendChild(row);
        });
    }

    // Renderizar cursos
    function renderizarCursos(data) {
        data.forEach(curso => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${curso.codCurso}</td>
                <td>${curso.nomCurso}</td>
                <td>${curso.docente}</td>
                <td>${curso.secCurso}</td>
                <td>${curso.teopra}</td>
            `;
            cursosBody.appendChild(row);
        });
    }

    // Determinar qué página está activa
    if (horarioBody) {
        cargarDatos('cursos.json', renderizarHorario);
    } else if (cursosBody) {
        cargarDatos('cursos.json', renderizarCursos);
    }
});
