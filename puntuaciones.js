function crearEstudiante() {
    let nombreEstudiante = inputUser.value
    if (nombreEstudiante) {
        var estudiante_ = new nuevoEstudiante(nombreEstudiante)
        estudiante_.crearEstudianteEnHTML()
        listaDeEstudiantes.push(estudiante_)
        inputUser.value = '' // Hacer que la caja de texto se vacie automaticamente
    }
}

function obtenerPuntajes() {
    var puntajes = getElementsByClassName('')
}

class estudianteArray {
    constructor(nombre, puntaje) {
        this.nombre = nombre
        this.puntaje = puntaje
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
        puntajeEstudiante.setAttribute('class', 'puntajeEstudiante')
        puntajeEstudiante.setAttribute('class', nombreSinEspacios)
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
            puntaje = puntaje - 10
            puntajeEstudiante.innerHTML = puntaje
        }

        zone_users.appendChild(cajaEstudiante)
        cajaEstudiante.appendChild(nombreEstudiante)
        cajaEstudiante.appendChild(puntajeEstudiante)
        cajaEstudiante.appendChild(sumarPuntos)
        cajaEstudiante.appendChild(restarPuntos)

        let puntajeEstudianteLista

    }
}

const inputUser = document.getElementById('inputUser')
const addUserButton = document.getElementById('addUserButton')
const endClassButton = document.getElementById('endClassButton')
const zone_users = document.getElementById('zoneUsers')
const addPointsButtons = document.getElementsByClassName('sumarPuntos')



let numeroDeEstudiantes = 0
var listaDeEstudiantes = []


addUserButton.addEventListener('click', crearEstudiante)
endClassButton.addEventListener('click', obtenerPuntajes)




