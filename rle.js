var q = 0
var c = 200;
var r = 200;
var a = new Array(r);
var a_canvas = rle.getElementById("a");
var a_context = a_canvas.getContext("2d");
for (var i = 0; i < r; i += 1) {
    a[i] = new Array(c);
}
function define() {
    var x, y;
    for (var i = 0; i < 8000; i++) {
        x = parseInt(Math.random() * r)
        y = parseInt(Math.random() * c)
        a[x][y] = parseInt(Math.random() * 2);
    }
    update();
}
function neighbour(i, j) {
    var z = 0;
    if (a[i][j + 1] == 1) { z++; }
    if (a[i][j - 1] == 1) { z++; }
    if (a[i + 1][j] == 1) { z++; }
    if (a[i + 1][j - 1] == 1) { z++; }
    if (a[i + 1][j + 1] == 1) { z++; }
    if (a[i - 1][j] == 1) { z++; }
    if (a[i - 1][j - 1] == 1) { z++; }
    if (a[i - 1][j + 1] == 1) { z++; }
    return z;
}
function rules() {
    for (i = 0; i < r; i++) {
        for (j = 0; j < c; j++) {
            if (a[i] != undefined && a[i - 1] != undefined && a[i + 1] != undefined) {
                count = neighbour(i, j)
                if (count < 2 || count > 3) { a[i][j] = 0; }
                if (count === 3) { a[i][j] = 1 }
            }
        }
    }
    update();
}
function update() {
    for (var m = 0; m < r; m++) {
        for (var n = 0; n < c; n++) {
            if (a[m][n] == 1) {
                a_context.fillStyle = '#C4C4C4'
            }
            else {
                a_context.fillStyle = 'rgb(0,0,0)'
            }
            a_context.beginPath();
            a_context.fillRect(m * 5, n * 5, 5, 5);
            a_context.closePath();
        }
    }
}
function run() {
    define();
    time = setInterval(rules, 10);
}
function funny() {
    if (q == 0) {
        run();
        q += 1;
    }
}