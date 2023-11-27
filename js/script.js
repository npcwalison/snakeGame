const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

const size = 30;

const snake = [{ x: 270, y: 240 }]

const ramdomNumber = (max, min) => {
    return Math.round(Math.random() * (max - min) + min)
}

const ramdomPosition = () => {
    const number = ramdomNumber(0 , canvas.width - size)
    return Math.round(number / 30) * 30;
}

const ramdomColor = () => {
    const red = ramdomNumber(0, 255)
    const green = ramdomNumber(0, 255)
    const blue = ramdomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})`;
}

const food = {
    x: ramdomPosition(),
    y: ramdomPosition(),
    color: ramdomColor()
}

let direction, loopId

const drawFood = () => {

    const {x, y, color} = food

    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.shadowBlur = 0;
}

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
    if(direction === "right") {
        snake.push({ x: head.x + size, y: head.y })
    }
    //inicia o movimento para esquerda
    if(direction === "left") {
        snake.push({ x: head.x - size, y: head.y })
    }
    //inicia o movimento para descer
    if(direction === "down") {
        snake.push({ x: head.x, y: head.y + size})
    }
    //inicia o movimento para subir
    if(direction === "up") {
        snake.push({ x: head.x, y: head.y - size})
    }

    snake.shift()
}

const drawGrid = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#191919";

    for(let i = 30; i < canvas.width; i += 30) {
        //column
        ctx.beginPath()
        ctx.lineTo(i, 0);
        ctx.lineTo(i, 600);
        ctx.stroke();
        //rows
        ctx.beginPath()
        ctx.lineTo(0, i);
        ctx.lineTo(600, i);
        ctx.stroke();
    }
}

const checkEat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        snake.push(head)

        let x = ramdomPosition()
        let y = ramdomPosition()
        
        while (snake.find((position) => position.x == x && position.y ==y)) {
            x = ramdomPosition()
            y = ramdomPosition()
        }

        food.x = x;
        food.y = y;
        food.color = ramdomColor();
    }
}

const gameLoop = () => {
    //limpa o loop para que não haja bugs
    clearInterval(loopId)
    //limpa a tela de pixel a pixel.
    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawFood()
    drawSnake()
    moveSnake()

    checkEat()

    loopId = setTimeout(() => {
        gameLoop()
    }, 300)
}

gameLoop()

document.addEventListener("keydown", ({ key }) => {

    if(key === "ArrowRight" && key !== "ArrowLeft") {
        direction = "right";
    }

    if(key === "ArrowLeft" && key !== "ArrowRight") {
        direction = "left";
    }

    if(key === "ArrowUp" && key !== "ArrowDown") {
        direction = "up";
    }

    if(key === "ArrowDown" && key !== "ArrowUp") {
        direction = "down";
    }
})