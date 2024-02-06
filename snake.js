document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const gridSize = 20;
    const snakeSpeed = 150;

    let snake = [{ x: 10, y: 10 }];
    let direction = 'right';
    let food = { x: 5, y: 5 };

    function draw() {
        gameBoard.innerHTML = '';

        // Draw Snake
        snake.forEach(segment => {
            const snakeSegment = createSegment('snake', segment.x, segment.y);
            gameBoard.appendChild(snakeSegment);
        });

        // Draw Food
        const foodElement = createSegment('food', food.x, food.y);
        gameBoard.appendChild(foodElement);
    }

    function createSegment(className, x, y) {
        const segment = document.createElement('div');
        segment.classList.add('cell', className);
        segment.style.gridRowStart = y;
        segment.style.gridColumnStart = x;
        return segment;
    }

    function move() {
        const head = { ...snake[0] };

        switch (direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }

        // Wrap around when hitting walls
        if (head.x < 1) head.x = gridSize;
        if (head.x > gridSize) head.x = 1;
        if (head.y < 1) head.y = gridSize;
        if (head.y > gridSize) head.y = 1;

        snake.unshift(head);

        // Check for collision with food
        if (head.x === food.x && head.y === food.y) {
            // Generate new food
            food = generateFood();
        } else {
            // Remove tail
            snake.pop();
        }
    }

    function generateFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * gridSize) + 1,
                y: Math.floor(Math.random() * gridSize) + 1
            };
        } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));

        return newFood;
    }

    function changeDirection(e) {
        switch (e.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }

    setInterval(() => {
        move();
        draw();
    }, snakeSpeed);

    document.addEventListener('keydown', changeDirection);
});

