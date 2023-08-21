
let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3


function iniciarJuego(){
    let sectionSelecionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSelecionarAtaque.style.display = 'none'

    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'none'

    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)    
    //botones de ataques
    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego) 
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.addEventListener('click', ataqueAgua) 
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra) 
    //boton reiniciar
    let botonReiniciar = document.getElementById("boton-reiniciar")
    botonReiniciar.addEventListener('click', reiniciarJuego)
}
function seleccionarMascotaJugador(){
    let sectionSelecionarMascota = document.getElementById('selecciona-mascota')
    sectionSelecionarMascota.style.display = 'none'
    let sectionSelecionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSelecionarAtaque.style.display = 'flex'

    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let spanMascotaJugador = document.getElementById('mascota-jugador')

    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = 'Hipodoge'
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = 'Capipepo'
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = 'Ratigueya'
    }else{
        alert("Selecciona una mascota")
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo(){
    let ataqueAleatorio = aleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')
    if(ataqueAleatorio == 1){
        spanMascotaEnemigo.innerHTML = 'Hipodoge'
    }else if(ataqueAleatorio == 2){
        spanMascotaEnemigo.innerHTML = 'Capipepo'
    }else {
        spanMascotaEnemigo.innerHTML = 'Ratigueya'
    }   
}

function ataqueFuego(){
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
}

function ataqueAgua(){
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
}

function ataqueTierra(){
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1,3)
    
    if(ataqueAleatorio == 1){
        ataqueEnemigo = 'FUEGO'
    }else if(ataqueAleatorio == 2){
        ataqueEnemigo = 'AGUA'
    }else{
        ataqueEnemigo = 'TIERRA'
    }
    combate()
}
function combate(){
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')
if(ataqueEnemigo == ataqueJugador){
    crearMensaje("Empate")
}else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA'){
    crearMensaje("Ganaste")
    vidasEnemigo = vidasEnemigo - 1
    spanVidasEnemigo.innerHTML = vidasEnemigo
}else if(ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO'){
    crearMensaje("Ganaste")
    vidasEnemigo = vidasEnemigo - 1
    spanVidasEnemigo.innerHTML = vidasEnemigo
}else if(ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA'){
    crearMensaje("Ganaste")
    vidasEnemigo = vidasEnemigo - 1
    spanVidasEnemigo.innerHTML = vidasEnemigo
}else {
    crearMensaje("Perdiste")
    vidasJugador = vidasJugador - 1
    spanVidasJugador.innerHTML = vidasJugador
    }
revisarVidas()
}

function revisarVidas(){
    if(vidasEnemigo == 0){
        crearMensajeFinal("Has ganado!")
    }else if(vidasJugador == 0){
        crearMensajeFinal("Has perdido :(")
    }
}

function crearMensaje(resultado){
    let sectionMensajes = document.getElementById('resultado')
    let sectionAtaquesJugador = document.getElementById('ataques-Jugador')
    let sectionAtaquesEnemigo = document.getElementById('ataques-Enemigo')

    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo
    //let parrafo = document.createElement('p')
    //parrafo.innerHTML = 'Tu mascote ataco con' + ataqueJugador +  ',la mascota del enemigo ataco con ' + ataqueEnemigo + ' - ' + resultado

    sectionAtaquesJugador.appendChild(nuevoAtaqueJugador)
    sectionAtaquesEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    let sectionMensajes = document.getElementById('resultado')

    sectionMensajes.innerHTML = resultadoFinal
    

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.disabled = true
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.disabled = true
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.disabled = true
    let sectionReiniciar = document.getElementById('reiniciar')
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1)+min)
}


window.addEventListener('load', iniciarJuego)