
const sectionSelecionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonTierra = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById("boton-reiniciar")
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
//funcion seleccionarMascota
const sectionSelecionarMascota = document.getElementById('selecciona-mascota')
const inputHipodoge = document.getElementById('hipodoge')
const inputCapipepo = document.getElementById('capipepo')
const inputRatigueya = document.getElementById('ratigueya')
const spanMascotaJugador = document.getElementById('mascota-jugador')
//funcion seleccionarMascotaEnemigo
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
//funcion Combate
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
//funcion resultado
const sectionMensajes = document.getElementById('resultado')
const sectionAtaquesJugador = document.getElementById('ataques-Jugador')
const sectionAtaquesEnemigo = document.getElementById('ataques-Enemigo')

let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3


function iniciarJuego(){
    
    sectionSelecionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)    
    //botones de ataques
    botonFuego.addEventListener('click', ataqueFuego) 
    botonAgua.addEventListener('click', ataqueAgua) 
    botonTierra.addEventListener('click', ataqueTierra) 
    //boton reiniciar
    botonReiniciar.addEventListener('click', reiniciarJuego)
}
function seleccionarMascotaJugador(){
    sectionSelecionarMascota.style.display = 'none'
    sectionSelecionarAtaque.style.display = 'flex'

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

    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo
    
    sectionAtaquesJugador.appendChild(nuevoAtaqueJugador)
    sectionAtaquesEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    
    sectionMensajes.innerHTML = resultadoFinal
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1)+min)
}

window.addEventListener('load', iniciarJuego)