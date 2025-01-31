function onInputChange(input) {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const font = window.getComputedStyle(input).font;
    context.font = font;
    const textWidth = context.measureText(" " + input.value).width;
    input.style.width = `${textWidth}px`;
}

let dropdownRotated = 0;
document.getElementById("dropdown-bttn").addEventListener("click", function () {
    dropdownRotated -= 180;
    this.style.transform = `rotate(${dropdownRotated}deg)`;

    document.getElementById("menu").style.display = dropdownRotated % 360 === 0 ? "none" : "block";
})

let settingsRotated = 0;
document.getElementById("settings-bttn").addEventListener("click", function () {
    settingsRotated -= 180;
    this.style.transform = `rotate(${settingsRotated}deg)`;
});