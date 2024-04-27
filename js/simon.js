let buttons = []


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
}


initGame()