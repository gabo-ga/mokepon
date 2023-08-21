
const sectionSelecionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonTierra = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById("boton-reiniciar")
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
//funcion seleccionarMascota
const sectionSelecionarMascota = document.getElementById('selecciona-mascota')
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
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')

let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let vidasJugador = 3
let vidasEnemigo = 3
let inputHipodoge 
let inputCapipepo
let inputRatigueya

class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let mokepones = []
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 3)
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 3)
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 3)

hipodoge.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🪴', id: 'boton-tierra'}
)
capipepo.ataques.push(
    {nombre: '🪴', id: 'boton-tierra'},
    {nombre: '🪴', id: 'boton-tierra'},
    {nombre: '🪴', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'}
)
ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🪴', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
)

mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego(){
    
    sectionSelecionarAtaque.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>'
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')
    })

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
        spanMascotaJugador.innerHTML = inputHipodoge.id
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
    }else{
        alert("Selecciona una mascota")
    }
    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatorio = aleatorio(0,mokepones.length -1)
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
 
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