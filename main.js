var board = document.getElementById("chess_board");
var ctx = board.getContext("2d");

function draw() {
    const blockHeight = board.height / 8;
    const blockWidth = board.width / 8;
    for (var i = 0; i < 8; i ++) {
        for (var j = 0; j < 8; j ++) {
            if ((i + j) % 2 == 0) {
                ctx.fillStyle = "white"
                ctx.fillRect((j * blockWidth), (i * blockHeight), blockWidth, blockHeight)
            } else {
                ctx.fillStyle = "black"
                ctx.fillRect((j * blockWidth), (i * blockHeight), blockWidth, blockHeight)
            }
        }
    }
}

draw()