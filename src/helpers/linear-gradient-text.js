module.exports = function(elementID, text, font_style = "normal 300 30px Arial") {
    var elm = document.querySelector(elementID),
    canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    textGradient;

    elm.appendChild(canvas);
    ctx.canvas.width = elm.clientWidth;
    ctx.canvas.height = elm.clientHeight;

    textGradient = ctx.createLinearGradient(
        (canvas.width / 2) + (ctx.measureText(text).width),
        (canvas.width / 2) + (ctx.measureText(text).width),
        (canvas.height / 2) - (ctx.measureText(text).width),
        (canvas.height / 2) - (ctx.measureText(text).width)
    );

    textGradient.addColorStop("0", "#AE8625");
    textGradient.addColorStop("0.33", "#F7EF8A");
    textGradient.addColorStop("0.66", "#D2AC47");
    textGradient.addColorStop("1", "#EDC967");

    ctx.beginPath();
    ctx.fillStyle = textGradient;
    ctx.font = font_style;
    ctx.fillText(text, (canvas.width / 2) - (ctx.measureText(text).width / 2), canvas.height / 2);
    ctx.closePath();

    window.addEventListener('resize', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.canvas.width = elm.clientWidth;

        ctx.beginPath();
        ctx.fillStyle = textGradient;
        ctx.font = font_style;
        ctx.fillText(text, (canvas.width / 2) - (ctx.measureText(text).width / 2), canvas.height / 2);
        ctx.closePath();
    });
}