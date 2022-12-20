const start = document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;
    let isGameOver = false;
    let gap = 450;

    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + "px";
        bird.style.left = birdLeft + "px";
    }
    let gameTimerId = setInterval(startGame, 20);

    function control(e) {
        if(e.keyCode == 32) {
            jump();
        }
    }

    function jump() {
        if(birdBottom < 500)birdBottom += 50
        bird.style.bottom = birdBottom + "px";
        console.log(birdBottom)
    }
    document.addEventListener('keyup', control);

    function genrateObstacles() {
        let obstacleLeft = 500;
        let randomHeight = Math.random() * 70;
        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        if(!isGameOver) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
        }
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);
        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.bottom = obstacleBottom + gap + 'px';

        function moveObstacle() {
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + "px";
            topObstacle.style.left = obstacleLeft + "px"

            if(obstacleLeft === -60) {
                clearInterval(timeId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            } 
            if(obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && 
                (birdBottom < obstacleBottom + 150 || birdBottom > obstacleBottom + gap -200) || birdBottom === 0) {
                gameOver();
                clearInterval(timeId)
            }
        }
        let timeId = setInterval(moveObstacle, 20);
        if(!isGameOver)setTimeout(genrateObstacles, 3000);
    }
    genrateObstacles()

    function gameOver() {
        clearInterval(gameTimerId);
        const gameOverAlert = document.querySelector('.game-over');
        gameOverAlert.style.display = "block";
        isGameOver = true;
        document.removeEventListener('keyup', control);
    }

    function tryAgain() {
        const btn = document.querySelector(".again");
        btn.addEventListener('click', function () {
            location.reload();
        })
    }
    tryAgain()
});