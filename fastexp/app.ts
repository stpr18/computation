/// <reference path="scripts/typings/jquery/jquery.d.ts" />

function bits(x: number): number {
    for (var result = 0; x > 0; ++result) {
        x >>= 1;
    }
    return result;
}

function fastexp(a: number, x: number, n: number, element10?: JQuery): number {
    if (x <= 0 || x > 255 || a < 0 || a > 255) {
        if (element10)
            element10.val("値は1から255までの範囲で入力してください．");
        return -1;
    }

    var text = "";
    text += "xの2進数表記は " + x.toString(2) + " より\n ";
    for (var k = bits(x) - 1; k >= 0; --k) {
        text += "x" + k + " = " + ((x >> k) & 1);
        if (k == 0)
            text += "\n\n";
        else
            text += ", ";
    }
     
    var y = a;
    text += "まず y = " + a + " とおく\n\n";
    for (var k = bits(x) - 2; k >= 0; --k) {
        text += "現在 k = " + k + "\n";
        var result = (y * y) % n;
        text += " Step1 : " + result + " = " + y + " * " + y +  " mod " + n + "\n";
        y = result;
        if ((x >> k) & 1) {
            text += " このとき x" + k + " = 1 より\n";
            result = (y * a) % n;
            text += " Step2 : " + result + " = " + y + " * " + a + " mod " + n + "\n";
            y = result;
        }
        text += "\n";
    }

    text += "以上より " + a + "^" + x + " mod " + n + " = " + y + "となる";
    if (element10)
        element10.val(text);
    return y;
}

function runfastexp(): void {
    var a = +$("#fastexp [name=input_a]").val();
    var x = +$("#fastexp [name=input_x]").val();
    var n = +$("#fastexp [name=input_n]").val();
    var output10 = $("#fastexp [name=output10]");
    fastexp(a, x, n, output10);
}

