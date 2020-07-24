// Funcion para organizar items

// var items = [
//     { name: 'Edward', value: 21 },
//     { name: 'Sharpe', value: 37 },
//     { name: 'And', value: 45 },
//     { name: 'The', value: -12 },
//     { name: 'Magnetic', value: 13 },
//     { name: 'Zeros', value: 37 }
//   ];
//   items.sort(function (a, b) {
//     if (a.name > b.name) {
//       return 1;
//     }
//     if (a.name < b.name) {
//       return -1;
//     }
//     // a must be equal to b
//     return 0;
//   });


function crearEstudiante() {
    let nombreEstudiante = inputUser.value
    if (nombreEstudiante) {
        var estudiante_ = new nuevoEstudiante(nombreEstudiante)
        estudiante_.crearEstudianteEnHTML()
        inputUser.value = '' // Hacer que la caja de texto se vacie automaticamente
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
    listaDeEstudiantes = []
    for (let i = 0; i <= numeroDeEstudiantes; i++) {
        let estudianteNombreHTML = document.getElementsByClassName('nombreEstudiante')[i]
        let estudiantePuntajeHTML = document.getElementsByClassName('puntajeEstudiante')[i]
        let estudianteNombre = estudianteNombreHTML.innerHTML
        let estudiantePuntaje = estudiantePuntajeHTML.innerHTML
        let objetoEstudiante = { name: estudianteNombre, score: estudiantePuntaje }
        listaDeEstudiantes.push(objetoEstudiante)
    }
    organizarPuntajes()
}

function organizarPuntajes() {
    listaDeEstudiantes.sort(function (a, b) {
        if (a.score > b.score) {
            return 1;
        }
        if (a.score < b.score) {
            return -1;
        }
        return 0;
    })

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

        let puntajeEstudianteLista

    }
}

const inputUser = document.getElementById('inputUser')
const addUserButton = document.getElementById('addUserButton')
const removeUserButton = document.getElementById('removeUserButton')
const endClassButton = document.getElementById('endClassButton')
const zone_users = document.getElementById('zoneUsers')
const addPointsButtons = document.getElementsByClassName('sumarPuntos')



let numeroDeEstudiantes = -1
var listaDeEstudiantes = []


addUserButton.addEventListener('click', crearEstudiante)
endClassButton.addEventListener('click', obtenerPuntajes)
removeUserButton.addEventListener('click', removerEstudiante)





