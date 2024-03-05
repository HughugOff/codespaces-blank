const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

const blockSize = 15;
let score = 0;
let snake = [{ x: 5, y: 5 }];
let food = { x: Math.floor(Math.random() * (canvas.width / blockSize)), y: Math.floor(Math.random() * (canvas.height / blockSize)) };
let dx = 1;
let dy = 0;

function main() {
    if (checkCollision()) {
            alert("Game Over! Your score: " + score);
                    document.location.reload();
                            return;
                                }

                                    setTimeout(function onTick() {
                                            clearCanvas();
                                                    drawFood();
                                                            moveSnake();
                                                                    drawSnake();
                                                                            main();
                                                                                }, 100);
                                                                                }

                                                                                function clearCanvas() {
                                                                                    ctx.fillStyle = "white";
                                                                                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                                                                                        }

                                                                                        function drawSnake() {
                                                                                            snake.forEach(part => {
                                                                                                    ctx.fillStyle = 'green';
                                                                                                            ctx.fillRect(part.x * blockSize, part.y * blockSize, blockSize, blockSize);
                                                                                                                });
                                                                                                                }

                                                                                                                function moveSnake() {
                                                                                                                    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
                                                                                                                        snake.unshift(head);

                                                                                                                            if (snake[0].x === food.x && snake[0].y === food.y) {
                                                                                                                                    score += 10;
                                                                                                                                            scoreElement.innerHTML = "Score: " + score;
                                                                                                                                                    resetFood();
                                                                                                                                                        } else {
                                                                                                                                                                snake.pop();
                                                                                                                                                                    }
                                                                                                                                                                    }

                                                                                                                                                                    function drawFood() {
                                                                                                                                                                        ctx.fillStyle = 'red';
                                                                                                                                                                            ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);
                                                                                                                                                                            }

                                                                                                                                                                            function resetFood() {
                                                                                                                                                                                food = { x: Math.floor(Math.random() * (canvas.width / blockSize)), y: Math.floor(Math.random() * (canvas.height / blockSize)) };
                                                                                                                                                                                }

                                                                                                                                                                                function checkCollision() {
                                                                                                                                                                                    for (let i = 4; i < snake.length; i++) {
                                                                                                                                                                                            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
                                                                                                                                                                                                }
                                                                                                                                                                                                    const hitLeftWall = snake[0].x < 0;
                                                                                                                                                                                                        const hitRightWall = snake[0].x > canvas.width / blockSize - 1;
                                                                                                                                                                                                            const hitTopWall = snake[0].y < 0;
                                                                                                                                                                                                                const hitBottomWall = snake[0].y > canvas.height / blockSize - 1;

                                                                                                                                                                                                                    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
                                                                                                                                                                                                                    }

                                                                                                                                                                                                                    document.addEventListener('keydown', e => {
                                                                                                                                                                                                                        const { keyCode } = e;
                                                                                                                                                                                                                            if (keyCode === 37 && dx === 0) { dx = -1; dy = 0; }
                                                                                                                                                                                                                                if (keyCode === 38 && dy === 0) { dx = 0; dy = -1; }
                                                                                                                                                                                                                                    if (keyCode === 39 && dx === 0) { dx = 1; dy = 0; }
                                                                                                                                                                                                                                        if (keyCode === 40 && dy === 0) { dx = 0; dy = 1; }
                                                                                                                                                                                                                                        });

                                     
                                     
                                     
                                     let touchStartX = 0;
                                     let touchStartY = 0;
                                     
                                     document.addEventListener("touchstart", (e) => {
                                         touchStartX = e.changedTouches[0].screenX;
                                             touchStartY = e.changedTouches[0].screenY;
                                             }, false);
                                             
                                             document.addEventListener("touchmove", (e) => {
                                                 e.preventDefault(); // Empêche le scroll de la page sur les dispositifs tactiles
                                                     let touchEndX = e.changedTouches[0].screenX;
                                                         let touchEndY = e.changedTouches[0].screenY;
                                                             let xDiff = touchStartX - touchEndX;
                                                                 let yDiff = touchStartY - touchEndY;
                                                                 
                                                                     if (Math.abs(xDiff) > Math.abs(yDiff)) { // Détecte un mouvement horizontal
                                                                             if (xDiff > 0 && dx === 0) { // Swipe gauche
                                                                                         dx = -1; dy = 0;
                                                                                                 } else if (xDiff < 0 && dx === 0) { // Swipe droit
                                                                                                             dx = 1; dy = 0;
                                                                                                                     }
                                                                                                                         } else { // Détecte un mouvement vertical
                                                                                                                                 if (yDiff > 0 && dy === 0) { // Swipe haut
                                                                                                                                             dx = 0; dy = -1;
                                                                                                                                                     } else if (yDiff < 0 && dy === 0) { // Swipe bas
                                                                                                                                                                 dx = 0; dy = 1;
                                                                                                                                                                         }
                                                                                                                                                                             }
                                                                                                                                                                             
                                                                                                                                                                                 // Réinitialiser les valeurs pour le prochain touchmove
                                                                                                                                                                                     touchStartX = touchEndX;
                                                                                                                                                                                         touchStartY = touchEndY;
                                                                                                                                                                                         }, false);                                                                                                                                                                                                   main();