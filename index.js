let inputNumber = $(".number-input");
let radioButtons = $('input[name="input-base"]');
let selectedInput = $('input[name="input-base"]:checked').val();
inputNumber.attr("placeholder", selectedInput + " Number");
let convertDynamically = false;

let binaryPattern = /[01.]/;
let octalPattern = /[01234567.]/;
let decimalPattern = /[0-9.]/;
let hexPattern = /[0-9abcdefABCDEF.]/;

function setResult(res, radix) {
    let [dec, frac] = res.split(".");

    if (!frac) {
        frac = "";
    }

    let frac2 = 0.0;
    let p = -1;
    for (let c of frac) {
        let t = parseInt(c, radix);
        frac2 += t * Math.pow(radix, p);
        p -= 1;
    }

    dec = parseInt(dec, radix);
    dec += frac2;

    $("#bin-res").text(dec.toString(2));
    $("#oct-res").text(dec.toString(8));
    $("#dec-res").text(dec.toString(10));
    $("#hex-res").text(dec.toString(16).toUpperCase());
}

function setZero() {
    inputNumber.val("");
    $("#bin-res").text("0");
    $("#oct-res").text("0");
    $("#dec-res").text("0");
    $("#hex-res").text("0");
}

$("#cb").change(function () {
    convertDynamically = this.checked;
    if (convertDynamically) {
        $(".convert-btn").addClass("disable-btn");
    } else {
        $(".convert-btn").removeClass("disable-btn");
    }
    setZero();
});

radioButtons.each(function () {
    $(this).change(function () {
        selectedInput = $('input[name="input-base"]:checked').val();
        inputNumber.attr("placeholder", selectedInput + " Number");
        setZero();
    });
});

function charCount(str, letter) {
    let count = 0;

    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) == letter) {
            count += 1;
        }
    }
    return count;
}

inputNumber.bind("input", function () {
    selectedInput = $('input[name="input-base"]:checked').val();
    let v = $(this).val();
    let lastc = v.slice(-1);
    if (v === "") {
        setZero();
    } else if (lastc === ".") {
        if (charCount(v, ".") != 1) {
            inputNumber.val(v.slice(0, -1));
        }
    } else {
        switch (selectedInput) {
            case "Binary":
                if (!binaryPattern.test(lastc)) {
                    inputNumber.val(v.slice(0, -1));
                }
                if (convertDynamically) {
                    setResult(v, 2);
                }
                break;
            case "Octal":
                if (!octalPattern.test(lastc)) {
                    inputNumber.val(v.slice(0, -1));
                }
                if (convertDynamically) {
                    setResult(v, 8);
                }
                break;
            case "Decimal":
                if (!decimalPattern.test(lastc)) {
                    inputNumber.val(v.slice(0, -1));
                }
                if (convertDynamically) {
                    setResult(v, 10);
                }
                break;
            case "Hexadecimal":
                if (!hexPattern.test(lastc)) {
                    inputNumber.val(v.slice(0, -1));
                }
                if (convertDynamically) {
                    setResult(v, 16);
                }
                break;
            default:
                break;
        }
    }
});

$(".convert-btn").on("click", function () {
    if (!convertDynamically) {
        selectedInput = $('input[name="input-base"]:checked').val();
        let v = inputNumber.val();
        if (v === "") {
            setZero();
        } else {
            switch (selectedInput) {
                case "Binary":
                    setResult(v, 2);
                    break;
                case "Octal":
                    setResult(v, 8);
                    break;
                case "Decimal":
                    setResult(v, 10);
                    break;
                case "Hexadecimal":
                    setResult(v, 16);
                    break;
                default:
                    break;
            }
        }
    }
});
