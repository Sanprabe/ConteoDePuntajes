function crearEstudiante(evento) {
    if (evento.keyCode === 13 || !evento.keyCode) { // Condiciones para poder usarlo con click en el boton y enter en el teclado
        let nombreEstudiante = inputUser.value
        if (nombreEstudiante) { // Condicion para que la caja de texto no esté en blanco
            let estudianteNuevo = new nuevoEstudiante(nombreEstudiante)
            estudianteNuevo.crearEstudianteEnHTML()
            inputUser.value = '' // Hacer que la caja de texto se vacie automaticamente
        }
    }
}


function removerEstudiante() {
    let estudianteRemover = document.getElementsByClassName('cajaEstudiante')[numeroDeEstudiantes]
    if (!estudianteRemover) {
        alert('Aún no ha agregado a ningun estudiante')
    } else {
        padre = estudianteRemover.parentNode;
        padre.removeChild(estudianteRemover);
    }
    numeroDeEstudiantes -= 1
}

function obtenerPuntajes() {
    endClassButton.removeEventListener('click', obtenerPuntajes)
    for (let i = 0; i <= numeroDeEstudiantes; i++) {
        let estudianteNombreHTML = document.getElementsByClassName('nombreEstudiante')[i]
        let estudiantePuntajeHTML = document.getElementsByClassName('puntajeEstudiante')[i]
        let estudianteNombre = estudianteNombreHTML.innerHTML
        let estudiantePuntaje = estudiantePuntajeHTML.innerHTML
        let objetoEstudiante = { name: estudianteNombre, score: estudiantePuntaje }
        listaDeEstudiantes.push(objetoEstudiante)
    }
    console.log('Estudiantes Previa')
    console.log(listaDeEstudiantes)
    organizarPuntajes()
}


function organizarPuntajes() {
    for (estudiante of listaDeEstudiantes) {
        if (estudiante.score === "0") {
            grupo4.push(estudiante)
        } else {
            listaDeEstudiantesFinal.push(estudiante)
        }
    }
    listaDeEstudiantesFinal.sort(function (a, b) {
        if (a.score < b.score) {
            return 1;
        }
        if (a.score > b.score) {
            return -1;
        }
        return 0;
    })
    let numeroDeEstudiantesFinal = listaDeEstudiantesFinal.length / 3
    completarGrupos(numeroDeEstudiantesFinal)
    let estudiantesPorGrupoFinal = listaDeEstudiantesFinal.length / 3
    console.log('Estudiantes en 0')
    console.log(grupo4)
    console.log('Estudiantes normal')
    console.log(listaDeEstudiantesFinal)
    console.log(`${'Numero de estudiantes por grupo'}${estudiantesPorGrupoFinal}`)

}


function completarGrupos(numero) {
    if (numero % 1 == 0) {
        return true
    } else {
        listaDeEstudiantesFinal.push({ name: '', score: '' })
        let estudiantesporGrupo_ = listaDeEstudiantesFinal.length / 3
        completarGrupos(estudiantesporGrupo_)
    }
}

function escribirGrupos() {
    for (estudiante in listaDeEstudiantes) {

    }
}

class nuevoEstudiante {
    constructor(nombre) {
        this.nombre = nombre
        this.puntaje = 0
    }

    crearEstudianteEnHTML() {
        let puntaje = this.puntaje
        let nombre = this.nombre
        let nombreSinEspacios = nombre.replace(/ /g, "")
        numeroDeEstudiantes += 1

        let cajaDeEstudianteId = 'cajaDeEstudiante_' + numeroDeEstudiantes
        let cajaEstudiante = document.createElement('div')
        cajaEstudiante.setAttribute('class', 'cajaEstudiante')
        cajaEstudiante.setAttribute('id', cajaDeEstudianteId)

        let nombreEstudianteId = 'nombreEstudiante_' + numeroDeEstudiantes
        let nombreEstudiante = document.createElement('p')
        nombreEstudiante.innerHTML = nombre
        nombreEstudiante.setAttribute('class', 'nombreEstudiante')
        nombreEstudiante.setAttribute('id', nombreEstudianteId)

        let puntajeEstudianteId = 'puntajeEstudiante_' + numeroDeEstudiantes
        let puntajeEstudiante = document.createElement('p')
        puntajeEstudiante.innerHTML = puntaje
        puntajeEstudiante.setAttribute('class', nombreSinEspacios)
        puntajeEstudiante.setAttribute('class', 'puntajeEstudiante')
        puntajeEstudiante.setAttribute('id', puntajeEstudianteId)

        let sumarPuntosId = 'sumarPuntos_' + numeroDeEstudiantes
        let sumarPuntos = document.createElement('input')
        sumarPuntos.setAttribute('type', 'button')
        sumarPuntos.setAttribute('value', '+10')
        sumarPuntos.setAttribute('class', 'sumarPuntos')
        sumarPuntos.setAttribute('id', sumarPuntosId)
        sumarPuntos.addEventListener('click', sumarPuntosF)
        function sumarPuntosF() {
            puntaje = puntaje + 10
            puntajeEstudiante.innerHTML = puntaje
        }

        let restarPuntosId = 'restarPuntos_' + numeroDeEstudiantes
        let restarPuntos = document.createElement('input')
        restarPuntos.setAttribute('type', 'button')
        restarPuntos.setAttribute('value', '-10')
        restarPuntos.setAttribute('class', 'PuntosRestar')
        restarPuntos.setAttribute('id', restarPuntosId)
        restarPuntos.addEventListener('click', restarPuntosF)
        function restarPuntosF() {
            if (puntaje >= 10) {
                puntaje = puntaje - 10
                puntajeEstudiante.innerHTML = puntaje
            }
        }

        zone_users.appendChild(cajaEstudiante)
        cajaEstudiante.appendChild(nombreEstudiante)
        cajaEstudiante.appendChild(puntajeEstudiante)
        cajaEstudiante.appendChild(sumarPuntos)
        cajaEstudiante.appendChild(restarPuntos)

    }
}

const inputUser = document.getElementById('inputUser')
const addUserButton = document.getElementById('addUserButton')
const removeUserButton = document.getElementById('removeUserButton')
const endClassButton = document.getElementById('endClassButton')
const zone_users = document.getElementById('zoneUsers')
const addPointsButtons = document.getElementsByClassName('sumarPuntos')

let numeroDeEstudiantes = -1
let listaDeEstudiantes = []
let listaDeEstudiantesFinal = []
let grupo1 = []
let grupo2 = []
let grupo3 = []
let grupo4 = []


addUserButton.addEventListener('click', crearEstudiante)
inputUser.addEventListener('keydown', crearEstudiante)
endClassButton.addEventListener('click', obtenerPuntajes)
removeUserButton.addEventListener('click', removerEstudiante)