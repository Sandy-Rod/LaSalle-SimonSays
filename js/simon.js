let buttons = []
let game = [1]

/** Generar número entero random entre 0 - 3*/
function getRandomInt() {
    return Math.floor(Math.random() * 4) + 1
}

/** Set up next turn */
function setUpNextTurn() {
    game.push(getRandomInt())
    document.querySelector(".debug #current-game").innerText = game.join(" , ")
}

/** Juego inicial **/
function initGame() {
    let button
    const main = document.querySelector("main")

    for (let i of [1, 2, 3, 4]) {
        button = document.createElement("button")
        button.innerText = buttons.length + 1
        main.appendChild(button)
        buttons.push(button)
    }
    document.querySelector("#next-turn").addEventListener("click", setUpNextTurn)
    document.querySelector("#play").addEventListener("click", play2)
    document.querySelector("#player-turn").addEventListener("click", playerTurn)
}

/* Add the class on to the buttons at the right time */
function play(event) {
    let delay = 0
    for (let btnNumber of game) {
        let button = buttons[btnNumber - 1]

        function onOff() {
            button.classList.toggle("on")
        }

        setTimeout(onOff, delay)
        setTimeout(onOff, 500 + delay)
        delay += 1000

    }
    if (event) {
        setTimeout(() => (event.target.disabled = false), delay)
        event.target.disabled = true
    }
}









function play2() {
    let remainingToSwitchOn = [...game]
    function switchNext() {
        if (remainingToSwitchOn.length) {
            let btnNumber = remainingToSwitchOn.shift()
            let button = buttons[btnNumber - 1]
            button.classList.add("on");
            setTimeout(() => {
                button.classList.remove("on");
            }, 500)
        } else {
            clearInterval(timer)
            playerTurn()
        }
    }
    let timer = setInterval(switchNext, 1000)
}

initGame()

function playerTurn() {
    let clicksDone = []
    function buttonClicked(event) {
        /* averiguamos en que boton se ha hecho clic */
        let number = buttons.indexOf(event.target)
        clicksDone.push(number + 1)

        /* comprobamos si clicksDone corresponde con game */
        if (game.length === clicksDone.length) {
            if (game.toString() === clicksDone.toString()) {
                // hemos ganado, siguiente ronda
                stopClicks()
                setUpNextTurn()
                play2()
            } else {
                // else, partida perdida
                stopClicks()
                console.log("Game over")
            }
        } else {
            let inicial = game.slice(0, clicksDone.length)
            if (inicial.toString() === clicksDone.toString()) {
                // por el momento no hay errores, seguimos jugando.
                console.log("Ok")
            } else {
                // Error, partida perdida
                stopClicks()
                console.log("Game over")
            }
        }
    }
    for (let button of buttons) {
        button.addEventListener("click", buttonClicked)
    }

    function stopClicks() {
        for (let button of buttons) {
            button.removeEventListener("click", buttonClicked)
        }

    }
}

setUpNextTurn()
play2()
