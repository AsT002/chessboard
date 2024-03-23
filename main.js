var canv = document.getElementById("chess_board");
var ctx = canv.getContext("2d");

canv.height = 550;
canv.width = 550;
canv.style.border = "solid"
// cannot do the styling in css, it messes up the svg scaling in canvas (default size: 300 x 150)
// since the script runs before the css, messing up the scaling.
// tldr: js (ctx: 300 x 150) -> css (this scales canvas, if we scale using css)

const blockHeight = canv.height / 8;
const blockWidth = canv.width / 8;

function drawChessBoard() {
    for (var i = 0; i < 8; i ++) {
        for (var j = 0; j < 8; j ++) {
            if ((i + j) % 2 == 0) {
                ctx.fillStyle = "#F2C078"
                ctx.fillRect((j * blockWidth), (i * blockHeight), blockWidth, blockHeight)
            } else {
                ctx.fillStyle = "#A44A3F"
                ctx.fillRect((j * blockWidth), (i * blockHeight), blockWidth, blockHeight)
            }
        }
    }
}

drawChessBoard();

var board = [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
];

class Piece {
    constructor(img, pos) {
        this.img = new Image();
        this.img.src = img;
        this.pos = pos;
        this.img.onload = () => {
            this.draw();
        }   
    }

    static convertPos(pos) {
        return [pos % 8, Math.floor(pos / 8)]
    }

    draw() {
        let [x, y] = Piece.convertPos(this.pos);
        console.log(x, y);

        ctx.drawImage(this.img, x * blockWidth, y * blockHeight, blockWidth, blockHeight);
    }
}

class Rook extends Piece {
    constructor(type, pos) {
        super("./imgs/" + type + "rook.svg", pos);
        this.type = type
    }
}

class Knight extends Piece {
    constructor(type, pos) {
        super("./imgs/" + type + "knight.svg", pos);
        this.type = type
    }
}

class Bishop extends Piece {
    constructor(type, pos) {
        super("./imgs/" + type + "bishop.svg", pos);
        this.type = type
    }
}

class Queen extends Piece {
    constructor(type, pos) {
        super("./imgs/" + type + "queen.svg", pos);
        this.type = type
    }
}

class King extends Piece {
    constructor(type, pos) {
        super("./imgs/" + type + "king.svg", pos);
        this.type = type
    }
}

class Pawn extends Piece {
    constructor(type, pos) {
        super("./imgs/" + type + "pawn.svg", pos);
        this.type = type
    }
}

function highlight(pos) {
    // make sure pos is valid
    if (pos >= 0 && pos < 64) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)"
        let [x, y] = Piece.convertPos(pos);

        ctx.fillRect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
    }
}

function clearPos(pos) {
        // make sure pos is valid
        if (pos >= 0 && pos < 64) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.4)"
            let [x, y] = Piece.convertPos(pos);

            if ((x + y) % 2 == 0) {
                ctx.fillStyle = "#F2C078"
                ctx.fillRect((x * blockWidth), (y * blockHeight), blockWidth, blockHeight)
            } else {
                ctx.fillStyle = "#A44A3F"
                ctx.fillRect((x * blockWidth), (y * blockHeight), blockWidth, blockHeight)
            }
        }
}

function start() {
    board[0] = new Rook("b", 0);
    board[1] = new Knight("b", 1);
    board[2] = new Bishop("b", 2);
    board[3] = new Queen("b", 3);
    board[4] = new King("b", 4);
    board[5] = new Bishop("b", 5);
    board[6] = new Knight("b", 6);
    board[7] = new Rook("b", 7);
    for (var i = 8; i < 16; i ++) {
        board[i] = new Pawn("b", i);
    }

    // other side of the board

    board[56] = new Rook("w", 56);
    board[57] = new Knight("w", 57);
    board[58] = new Bishop("w", 58);
    board[69] = new Queen("w", 59);
    board[60] = new King("w", 60);
    board[61] = new Bishop("w", 61);
    board[62] = new Knight("w", 62);
    board[63] = new Rook("w", 63);
    for (var i = 48; i < 56; i ++) {
        board[i] = new Pawn("w", i);
    }
}

start()