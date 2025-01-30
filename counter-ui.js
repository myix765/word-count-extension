function getInputWidth(input) {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const font = window.getComputedStyle(input).font;
    context.font = font;
    const textWidth = context.measureText(" " + input.value).width;
    input.style.width = `${textWidth + 8}px`;
}

let dropdownRotated = 0;
$("#dropdown-bttn").on("click", function () {
    dropdownRotated -= 180;
    $(this).css("transform", `rotate(${dropdownRotated}deg)`);

    dropdownRotated % 360 === 0 ? $("#menu").css("display", "none") : $("#menu").css("display", "block")
})

let settingsRotated = 0;
$("#settings-bttn").on("click", function () {
    settingsRotated -= 180;
    $(this).css("transform", `rotate(${settingsRotated}deg)`);
})