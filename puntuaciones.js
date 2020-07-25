class nuevoEstudiante {
    constructor(nombre) {
        this.nombre = nombre
        this.puntaje = 0
    }

    crearEstudianteEnHTML() {
        let puntaje = this.puntaje
        let nombre = this.nombre
        numeroDeEstudiantes += 1 // Se agrega uno al numero de estudiantes

        // Se crea la caja del nuevo estudiante
        let cajaDeEstudianteId = 'cajaDeEstudiante_' + numeroDeEstudiantes
        let cajaEstudiante = document.createElement('div')
        cajaEstudiante.setAttribute('class', 'cajaEstudiante')
        cajaEstudiante.setAttribute('id', cajaDeEstudianteId) // ID es para llevar registro del numero de estudiantes con facilidad

        //Se crea la caja para los textos
        let cajaTexto = document.createElement('div')
        cajaTexto.setAttribute('class', 'cajaTexto')

        // Se crea el texto del nombre
        let nombreEstudiante = document.createElement('p')
        nombreEstudiante.innerHTML = nombre
        nombreEstudiante.setAttribute('class', 'nombreEstudiante')

        // Se crea el texto del puntaje
        let puntajeEstudiante = document.createElement('p')
        puntajeEstudiante.innerHTML = puntaje
        puntajeEstudiante.setAttribute('class', 'puntajeEstudiante')

        // Se crea el boton para sumar
        let sumarPuntos = document.createElement('input')
        sumarPuntos.setAttribute('type', 'button')
        sumarPuntos.setAttribute('value', '+10')
        sumarPuntos.setAttribute('class', 'sumarPuntos')
        sumarPuntos.addEventListener('click', () => {    // Funcion que suma el puntaje
            puntaje = puntaje + 10
            puntajeEstudiante.innerHTML = puntaje
        })

        // Se crea el boton para restar
        let restarPuntos = document.createElement('input')
        restarPuntos.setAttribute('type', 'button')
        restarPuntos.setAttribute('value', '-10')
        restarPuntos.setAttribute('class', 'restarPuntos')
        restarPuntos.addEventListener('click', function () {    // Funcion que resta el puntaje
            if (puntaje >= 10) {    // Condición para que no existan numeros negativos
                puntaje = puntaje - 10
                puntajeEstudiante.innerHTML = puntaje
            }
        })

        // Se agrega la caja del estudiante a la zona de estudiantes
        zone_users.appendChild(cajaEstudiante)
        //Se agregan todos los otros objetos a la caja del estudiante
        cajaEstudiante.appendChild(cajaTexto)
        cajaTexto.appendChild(nombreEstudiante)
        cajaTexto.appendChild(puntajeEstudiante)
        cajaEstudiante.appendChild(sumarPuntos)
        cajaEstudiante.appendChild(restarPuntos)

    }
}

// Se traen todos las cajas de texto, los botones y los divs necesarios del HTML
const inputUser = document.getElementById('inputUser')
const addUserButton = document.getElementById('addUserButton')
const removeUserButton = document.getElementById('removeUserButton')
const endClassButton = document.getElementById('endClassButton')
const zone_users = document.getElementById('zoneUsers')
const addPointsButtons = document.getElementsByClassName('sumarPuntos')
const zone_Groups = document.getElementById('zoneGroups')
const main = document.getElementById('main')


let numeroDeEstudiantes = -1 // Se inicia la cuenta de -1 para que coincida con el index de los arrays

// Se declaran variables vacías que se utilizarán a medida que se utilicen funciones del código
let listaDeEstudiantes = []
let listaDeEstudiantesFinal = []
let estudiantesPorGrupoFinal
let grupo1 = []
let grupo2 = []
let grupo3 = []
let grupo4 = []


addUserButton.addEventListener('click', crearEstudiante)
inputUser.addEventListener('keydown', crearEstudiante)

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

removeUserButton.addEventListener('click', removerEstudiante)
function removerEstudiante() {
    let estudianteRemover = document.getElementsByClassName('cajaEstudiante')[numeroDeEstudiantes] // Escoje el ultimo estudiante creado
    if (!estudianteRemover) { // Condición por si no existe ningún estudiante aún
        alert('Aún no ha agregado a ningun estudiante')
    } else {
        padre = estudianteRemover.parentNode;
        padre.removeChild(estudianteRemover);
    }
    numeroDeEstudiantes -= 1 // Se elimina uno del número de estudiantes
}

endClassButton.addEventListener('click', obtenerPuntajes)

function obtenerPuntajes() {
    var x = confirm('Seguro que deseas obtener los puestos?')
    if (x) {
        endClassButton.removeEventListener('click', obtenerPuntajes) // Se utiliza para que solo se pueda oprimir una vez el boton de finalizar la clase
        // Se crea un objeto por cada estudiante y se mete dentro de un array
        for (let i = 0; i <= numeroDeEstudiantes; i++) {
            let estudianteNombreHTML = document.getElementsByClassName('nombreEstudiante')[i]
            let estudiantePuntajeHTML = document.getElementsByClassName('puntajeEstudiante')[i]
            let estudianteNombre = estudianteNombreHTML.innerHTML
            let estudiantePuntaje = estudiantePuntajeHTML.innerHTML
            estudiantePuntaje = parseInt(estudiantePuntaje)
            let objetoEstudiante = { name: estudianteNombre, score: estudiantePuntaje }
            listaDeEstudiantes.push(objetoEstudiante)
        }
        organizarPuntajes()
    }
}

function organizarPuntajes() {
    for (estudiante of listaDeEstudiantes) { // Este es un ciclo que aplica para todos los objetos de listaDeEstudiantes
        if (estudiante.score === 0) { // Condicion si el puntaje es 0 se coloca en el último grupo
            grupo4.push(estudiante)
        } else { // Todos los puntajes diferentes de 0 se colocan en el array listaDeEstudiantesFinal
            listaDeEstudiantesFinal.push(estudiante)
        }
    }
    // Función que organiza el array listaDeEstudiantesFinal de mayor a menor
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
    estudiantesPorGrupoFinal = listaDeEstudiantesFinal.length / 3 // Esta variable es el numero de estudiantes que hay en cada uno de los 3 primeros grupos
    grupo1 = listaDeEstudiantesFinal.slice(0, estudiantesPorGrupoFinal)
    grupo2 = listaDeEstudiantesFinal.slice(estudiantesPorGrupoFinal, 2 * estudiantesPorGrupoFinal)
    grupo3 = listaDeEstudiantesFinal.slice(2 * estudiantesPorGrupoFinal, listaDeEstudiantesFinal.length)
    escribirGrupos()
}

// Función que completa con objetos vacíos el array hasta que el número de objetos en el mismo sea divisible entre 3
function completarGrupos(numero) {
    if (!(numero % 1 == 0)) {
        listaDeEstudiantesFinal.push({ name: '', score: '' })
        let estudiantesporGrupo_ = listaDeEstudiantesFinal.length / 3
        completarGrupos(estudiantesporGrupo_)
    }
}

function escribirGrupos() {
    // Eliminar toda la zona de estudiantes
    let zonaEstudiantes = document.getElementById('zoneUsers') // Escoje el ultimo estudiante creado
    if (zonaEstudiantes) {
        padre = zonaEstudiantes.parentNode
        padre.removeChild(zonaEstudiantes)
    }
    //Eliminar toda la zona de agregar Usuario
    let zonaAgregarEstudiante = document.getElementById('addUser') // Escoje el ultimo estudiante creado
    if (zonaAgregarEstudiante) {
        padre = zonaAgregarEstudiante.parentNode;
        padre.removeChild(zonaAgregarEstudiante);
    }

    //Eliminar zona de terminar clase
    let zonaTerminarClase = document.getElementById('finalizarClase') // Escoje el ultimo estudiante creado
    if (zonaTerminarClase) {
        padre = zonaTerminarClase.parentNode;
        padre.removeChild(zonaTerminarClase);
    }

    //Crear las tablas de grupos
    let zonaGrupos = document.createElement('div') // Se crea el div principal donde estarán los 4 grupos
    zonaGrupos.setAttribute('id', 'zoneGroups')

    // Se crea el codigo base del grupo 1
    let titulo_1 = document.createElement('h2')
    titulo_1.innerHTML = 'Grupo #1' // Se agrega el texto del titulo
    let cajaGrupo_1 = document.createElement('div')
    cajaGrupo_1.setAttribute('id', 'cajaGrupo_1')
    let tablaGrupo_1 = document.createElement('table')
    tablaGrupo_1.setAttribute('id', 'tablaGrupo_1')
    let filaTitulos_1 = document.createElement('tr')
    filaTitulos_1.setAttribute('id', 'filaTitulos_1') // Se agregan los titulos a la tabla de datos
    let nombres_1 = document.createElement('th')
    nombres_1.innerHTML = 'Nombre'
    let puntajes_1 = document.createElement('th')
    puntajes_1.innerHTML = 'Puntaje'

    // Se repite lo anterior con los demás grupos

    let titulo_2 = document.createElement('h2')
    titulo_2.innerHTML = 'Grupo #2'
    let cajaGrupo_2 = document.createElement('div')
    cajaGrupo_2.setAttribute('id', 'cajaGrupo_2')
    let tablaGrupo_2 = document.createElement('table')
    tablaGrupo_2.setAttribute('id', 'tablaGrupo_2')
    let filaTitulos_2 = document.createElement('tr')
    filaTitulos_2.setAttribute('id', 'filaTitulos_2')
    let nombres_2 = document.createElement('th')
    nombres_2.innerHTML = 'Nombre'
    let puntajes_2 = document.createElement('th')
    puntajes_2.innerHTML = 'Puntaje'

    let titulo_3 = document.createElement('h2')
    titulo_3.innerHTML = 'Grupo #3'
    let cajaGrupo_3 = document.createElement('div')
    cajaGrupo_3.setAttribute('id', 'cajaGrupo_3')
    let tablaGrupo_3 = document.createElement('table')
    tablaGrupo_3.setAttribute('id', 'tablaGrupo_3')
    let filaTitulos_3 = document.createElement('tr')
    filaTitulos_3.setAttribute('id', 'filaTitulos_3')
    let nombres_3 = document.createElement('th')
    nombres_3.innerHTML = 'Nombre'
    let puntajes_3 = document.createElement('th')
    puntajes_3.innerHTML = 'Puntaje'

    let titulo_4 = document.createElement('h2')
    titulo_4.innerHTML = 'Grupo #4'
    let cajaGrupo_4 = document.createElement('div')
    cajaGrupo_4.setAttribute('id', 'cajaGrupo_4')
    let tablaGrupo_4 = document.createElement('table')
    tablaGrupo_4.setAttribute('id', 'tablaGrupo_4')
    let filaTitulos_4 = document.createElement('tr')
    filaTitulos_4.setAttribute('id', 'filaTitulos_4')
    let nombres_4 = document.createElement('th')
    nombres_4.innerHTML = 'Nombre'
    let puntajes_4 = document.createElement('th')
    puntajes_4.innerHTML = 'Puntaje'


    // Se inserta respectivamente el codigo que creamos en la anterior parte en el HTML


    main.appendChild(zonaGrupos)
    main.setAttribute('class', 'conTablas')
    zonaGrupos.appendChild(titulo_1)
    zonaGrupos.appendChild(cajaGrupo_1)
    cajaGrupo_1.appendChild(tablaGrupo_1)
    tablaGrupo_1.appendChild(filaTitulos_1)
    filaTitulos_1.appendChild(nombres_1)
    filaTitulos_1.appendChild(puntajes_1)

    zonaGrupos.appendChild(titulo_2)
    zonaGrupos.appendChild(cajaGrupo_2)
    cajaGrupo_2.appendChild(tablaGrupo_2)
    tablaGrupo_2.appendChild(filaTitulos_2)
    filaTitulos_2.appendChild(nombres_2)
    filaTitulos_2.appendChild(puntajes_2)

    zonaGrupos.appendChild(titulo_3)
    zonaGrupos.appendChild(cajaGrupo_3)
    cajaGrupo_3.appendChild(tablaGrupo_3)
    tablaGrupo_3.appendChild(filaTitulos_3)
    filaTitulos_3.appendChild(nombres_3)
    filaTitulos_3.appendChild(puntajes_3)

    zonaGrupos.appendChild(titulo_4)
    zonaGrupos.appendChild(cajaGrupo_4)
    cajaGrupo_4.appendChild(tablaGrupo_4)
    tablaGrupo_4.appendChild(filaTitulos_4)
    filaTitulos_4.appendChild(nombres_4)
    filaTitulos_4.appendChild(puntajes_4)

    // Se sacan las tablas donde se insertarán los arrays de los grupos

    const tabla_1 = document.getElementById('tablaGrupo_1')
    const tabla_2 = document.getElementById('tablaGrupo_2')
    const tabla_3 = document.getElementById('tablaGrupo_3')
    const tabla_4 = document.getElementById('tablaGrupo_4')


    // Se hace un ciclo que agregue todos los nombres y puntajes de cada grupo
    for (estudiante of grupo1) {
        let n = estudiante.name
        let p = estudiante.score

        let fila = document.createElement('tr')
        let nombre_ = document.createElement('th')
        nombre_.innerHTML = n
        let puntaje_ = document.createElement('th')
        puntaje_.innerHTML = p

        tabla_1.appendChild(fila)
        fila.appendChild(nombre_)
        fila.appendChild(puntaje_)
    }
    for (estudiante of grupo2) {
        let n = estudiante.name
        let p = estudiante.score

        let fila = document.createElement('tr')
        let nombre_ = document.createElement('th')
        nombre_.innerHTML = n
        let puntaje_ = document.createElement('th')
        puntaje_.innerHTML = p

        tabla_2.appendChild(fila)
        fila.appendChild(nombre_)
        fila.appendChild(puntaje_)
    }
    for (estudiante of grupo3) {
        let n = estudiante.name
        let p = estudiante.score

        let fila = document.createElement('tr')
        let nombre_ = document.createElement('th')
        nombre_.innerHTML = n
        let puntaje_ = document.createElement('th')
        puntaje_.innerHTML = p

        tabla_3.appendChild(fila)
        fila.appendChild(nombre_)
        fila.appendChild(puntaje_)
    }
    for (estudiante of grupo4) {
        let n = estudiante.name
        let p = estudiante.score

        let fila = document.createElement('tr')
        let nombre_ = document.createElement('th')
        nombre_.innerHTML = n
        let puntaje_ = document.createElement('th')
        puntaje_.innerHTML = p

        tabla_4.appendChild(fila)
        fila.appendChild(nombre_)
        fila.appendChild(puntaje_)
    }

    let cajaRecargarPagina = document.createElement('div')
    cajaRecargarPagina.setAttribute('id', 'zoneRefreshPage')
    let recargarPagina = document.createElement('a')
    recargarPagina.setAttribute('href', 'javascript:window.location.href=window.location.href')
    recargarPagina.setAttribute('id', 'refreshPage')
    recargarPagina.innerHTML = 'Volver a la pagina principal'
    main.appendChild(cajaRecargarPagina)
    cajaRecargarPagina.appendChild(recargarPagina)
}

