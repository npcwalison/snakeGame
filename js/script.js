const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

const size = 30;

const snake = [
    { x: 200, y: 200 },
    { x: 230, y: 200 }
]

let direction = "up"

const drawSnake = () => {
    ctx.fillStyle = "#DDD"
    snake.forEach((position, index) => {

        if(index === snake.length - 1) {
            ctx.fillStyle = "#FFF"
        }

        ctx.fillRect(position.x, position.y, size, size)

    })
}

const moveSnake = () => {
    if(!direction) return
    //indicando o último ponto(cabeça da cobra).
    const head = snake[snake.length - 1]
    //inicia o movimento para direita
    if(direction == "right") {
        snake.push({ x: head.x + size, y: head.y })
    }
    //inicia o movimento para esquerda
    if(direction == "left") {
        snake.push({ x: head.x - size, y: head.y })
    }
    //inicia o movimento para descer
    if(direction == "down") {
        snake.push({ x: head.x, y: head.y + size})
    }
    //inicia o movimento para subir
    if(direction == "up") {
        snake.push({ x: head.x, y: head.y - size})
    }

    snake.shift()
}

setInterval(() => {
    //limpa a tela de pixel a pixel.
    ctx.clearRect(0, 0, 600, 600)

    drawSnake()
    moveSnake()
}, 300)