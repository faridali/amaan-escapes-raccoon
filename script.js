let timer = 10;
const countdownElement = document.getElementById('timer');
const amaan = document.getElementById('amaan');
const raccoon = document.getElementById('raccoon');

function startCountdown() {
    const countdown = setInterval(() => {
        if (timer > 0) {
            timer--;
            countdownElement.textContent = timer;
        } else {
            clearInterval(countdown);
            alert('You survived!');
            resetGame();
        }
    }, 1000);
}

function resetGame() {
    amaan.style.top = '10px';
    amaan.style.left = '10px';
    raccoon.style.top = '350px';
    raccoon.style.left = '350px';
    timer = 10;
    countdownElement.textContent = timer;
    startCountdown();
}

document.addEventListener('DOMContentLoaded', (event) => {
    startCountdown();

    amaan.addEventListener('dragstart', dragStart);
    amaan.addEventListener('dragend', dragEnd);

    moveRaccoon();
});

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    setTimeout(() => {
        event.target.classList.add('hide');
    }, 0);
}

function dragEnd(event) {
    event.target.classList.remove('hide');
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;

    const x = event.clientX - dropzone.getBoundingClientRect().left - draggableElement.clientWidth / 2;
    const y = event.clientY - dropzone.getBoundingClientRect().top - draggableElement.clientHeight / 2;

    draggableElement.style.left = `${x}px`;
    draggableElement.style.top = `${y}px`;

    checkLose();
}

function checkLose() {
    const amaanRect = amaan.getBoundingClientRect();
    const raccoonRect = raccoon.getBoundingClientRect();

    if (
        amaanRect.left < raccoonRect.right &&
        amaanRect.right > raccoonRect.left &&
        amaanRect.top < raccoonRect.bottom &&
        amaanRect.bottom > raccoonRect.top
    ) {
        alert('You got caught!');
        resetGame();
    }
}

function moveRaccoon() {
    setInterval(() => {
        const amaanRect = amaan.getBoundingClientRect();
        const raccoonRect = raccoon.getBoundingClientRect();

        const dx = amaanRect.left - raccoonRect.left;
        const dy = amaanRect.top - raccoonRect.top;

        const distance = Math.sqrt(dx * dx + dy * dy);

        const speed = 2;
        const steps = distance / speed;

        const stepX = dx / steps;
        const stepY = dy / steps;

        raccoon.style.left = `${raccoonRect.left + stepX}px`;
        raccoon.style.top = `${raccoonRect.top + stepY}px`;

        checkLose();
    }, 50);
}

const maze = document.getElementById('maze');
maze.addEventListener('dragover', dragOver);
maze.addEventListener('drop', drop);
