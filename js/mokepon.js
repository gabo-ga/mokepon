
const sectionSelecionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById("boton-reiniciar")

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
const contenedorAtaques = document.getElementById('contenedor-ataques')
//ver mapa
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge 
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataqueMokeponEnemigo
let botonFuego 
let botonAgua
let botonTierra
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo =0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.webp'
let alturaQueBuscamos 
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon{
    constructor(nombre, foto, vida, fotoMapa){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let mokepones = []
let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.webp')
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.webp')
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, './assets/ratigueya.webp')

let hipodogeEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.webp')
let capipepoEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.webp')
let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.webp', 5, './assets/ratigueya.webp')

const hipodoge_ataques = [
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🪴', id: 'boton-tierra'}
]

hipodoge.ataques.push(...hipodoge_ataques)
hipodogeEnemigo.ataques.push(...hipodoge_ataques)

const capipepo_ataques = [
    {nombre: '🪴', id: 'boton-tierra'},
    {nombre: '🪴', id: 'boton-tierra'},
    {nombre: '🪴', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'}
]
capipepo.ataques.push(...capipepo_ataques)
capipepoEnemigo.ataques.push(...capipepo_ataques)

const ratigueya_ataques = [
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🪴', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
]
ratigueya.ataques.push(...ratigueya_ataques)
ratigueyaEnemigo.ataques.push(...ratigueya_ataques)

mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego(){ 
    
    sectionSelecionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

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
    //boton reiniciar
    botonReiniciar.addEventListener('click', reiniciarJuego)
    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
                if (res.ok) {
                    res.text()
                        .then(function(respuesta) {
                            console.log(respuesta);
                            jugadorId = respuesta
                        })
                }
        })
}

function seleccionarMascotaJugador(){

    sectionSelecionarMascota.style.display = 'none'

    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    }else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }else{
        alert("Selecciona una mascota")
    }
    seleccionarMokepon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post", 
        headers: {
            "Content-Type": "application/json"
        },
        body:  JSON.stringify({
            mokepon: mascotaJugador
        })
    })

}


function extraerAtaques(mascotaJugador){
    let ataques
    for (let i =0; i < mokepones.length; i++) {
        if(mascotaJugador == mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
    
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click',(e) => {
            if(e.target.textContent == '🔥'){
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
                boton.disabled = true
            }else if(e.target.textContent == '💧'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
                boton.disabled = true
            }else{
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112F58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataqueMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1,ataqueMokeponEnemigo.length-1)
    
    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push('FUEGO')
    }else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('AGUA')
    }else{
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length == 5){
        combate()
    }
}
function indexAmbosOponente(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
for (let i = 0; i < ataqueJugador.length; i++) {
   if(ataqueJugador[i] === ataqueEnemigo[i]){
    indexAmbosOponente(i, i)
    crearMensaje('EMPATE')
   }else if(ataqueJugador[i] == 'FUEGO' && ataqueEnemigo[i] == 'TIERRA'){
    indexAmbosOponente(i,i)
    crearMensaje("Ganaste")
    victoriasJugador++
    spanVidasJugador.innerHTML = victoriasJugador
}else if(ataqueJugador[i] == 'AGUA' && ataqueEnemigo[i] == 'FUEGO'){
    crearMensaje("Ganaste")
    victoriasJugador++
    spanVidasJugador.innerHTML = victoriasJugador
}else if(ataqueJugador[i] == 'TIERRA' && ataqueEnemigo[i] == 'AGUA'){
    crearMensaje("Ganaste")
    victoriasJugador++
    spanVidasJugador.innerHTML = victoriasJugador
}else {
    crearMensaje("Perdiste")
    victoriasEnemigo++
    spanVidasEnemigo.innerHTML = victoriasEnemigo
    }
}
revisarVidas()
}

function revisarVidas(){
    if(victoriasEnemigo === victoriasJugador){
        crearMensajeFinal("Esto es un empate!")
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("Has ganado!")
    }else{
        crearMensajeFinal("Perdiste :(")
    }
}

function crearMensaje(resultado){

    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo
    
    sectionAtaquesJugador.appendChild(nuevoAtaqueJugador)
    sectionAtaquesEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1)+min)
}

function pintarCanvas(){

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    enviarPosicion(mascotaJugadorObjeto.x,  mascotaJugadorObjeto.y)

    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
    if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
}

function enviarPosicion(x, y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res){
        if(res.ok){
            res.json()
                .then(function ({enemigos}) {
                    console.log(enemigos);
                })
        }
    })
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup',detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i =0; i < mokepones.length; i++) {
        if(mascotaJugador == mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    if(abajoMascota < arribaEnemigo || 
        arribaMascota > abajoEnemigo || 
        derechaMascota < izquierdaEnemigo || 
        izquierdaMascota > derechaEnemigo){
        return 
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSelecionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)