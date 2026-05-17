const btnStart = document.querySelector("#btn-start");
const characters = document.querySelectorAll(".character");

const hume = characters[0];

const { x, y } = getPosition(btnStart);

setPosition(hume, x + 50, y - 80);
console.log();

function getPosition(obj) {
    const { left, top } = obj.getBoundingClientRect();

    return {x: left, y: top};
}

function setPosition(obj, x, y) {
    obj.style.left = `${x}px`;
    obj.style.top = `${y}px`;
}
