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

    // Función para obtener las horas de un rango (e.g., '08-10' -> ['08-09', '09-10'])
    function obtenerHorasDeRango(rango) {
        const [horaInicio, horaFin] = rango.split('-');
        const horas = [];

        // Generar las horas dentro del rango
        let horaActual = parseInt(horaInicio);
        const horaFinal = parseInt(horaFin);
        
        while (horaActual < horaFinal) {
            horas.push(`${horaActual < 10 ? '0' + horaActual : horaActual}-` + `${horaActual + 1 < 10 ? '0' + (horaActual + 1) : horaActual + 1}`);
            horaActual++;
        }

        return horas;
    }

    // Renderizar horario
    function renderizarHorario(data) {
        const horas = [
            '07-08', '08-09', '09-10', '10-11', '11-12', '12-13', '13-14',
            '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21',
            '21-22', '22-23'
        ];

        // Agrupar los cursos por hora
        const cursosPorHora = {};

        data.forEach(curso => {
            const horasDelCurso = obtenerHorasDeRango(curso.hora);

            horasDelCurso.forEach(hora => {
                if (!cursosPorHora[hora]) {
                    cursosPorHora[hora] = [];
                }
                cursosPorHora[hora].push(curso);
            });
        });

        // Renderizar las filas del horario
        horas.forEach(hora => {
            const row = document.createElement('tr');
            const horaCell = document.createElement('td');
            horaCell.textContent = hora;
            row.appendChild(horaCell);

            const dias = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA'];
            dias.forEach(dia => {
                const cell = document.createElement('td');
                cell.classList.add('text-center');

                // Si hay cursos para esta hora y día, los agregamos
                const cursosDeHora = cursosPorHora[hora] || [];
                cursosDeHora.forEach(curso => {
                    if (curso.dia === dia) {
                        cell.classList.add('bg-info', 'text-white');
                        cell.innerHTML = `${curso.nomCurso} (${curso.teopra})`;
                    }
                });

                row.appendChild(cell);
            });

            horarioBody.appendChild(row);
        });
    }

    // Renderizar cursos (para tabla de cursos)
    function renderizarCursos(data) {
        data.forEach(curso => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${curso.codCurso}</td>
                <td>${curso.nomCurso}</td>
                <td>${curso.docente}</td>
                <td>${curso.secCurso}</td>
                <td>${curso.teopra}</td>
                <td>${curso.hora}</td>
                <td>${curso.dia}</td>
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
