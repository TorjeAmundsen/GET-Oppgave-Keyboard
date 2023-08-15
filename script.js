// Modifier order: Lowercase, uppercase, ctrl, alt, shift
const themeValues = {
    "--background-color":   ["#ffffff", "#0e1018"],
    "--outline-color":      ["#cccccc", "#192535"],
    "--gradient-default":   ["linear-gradient(180deg, rgb(255, 255, 255) 0%, rgb(235, 238, 241) 85%, rgb(215, 221, 224) 100%)", "linear-gradient(180deg, rgb(31, 43, 61) 0%, rgb(25, 32, 41) 85%, rgb(13, 15, 19) 100%)"],
    "--gradient-hover":     ["linear-gradient(180deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 85%, rgb(221, 237, 245) 100%)", "linear-gradient(180deg, rgb(45, 63, 92) 0%, rgb(29, 37, 48) 85%, rgb(13, 15, 19) 100%)"],
    "--glow":               ["0px 2px 10px rgba(97, 179, 255, 0.7)", "0px 2px 10px rgba(22, 81, 136, 0.7)"],
    "--key-text-color":     ["rgb(39, 45, 53)", "#cccccc"],
    "--text-color":         ["black", "#cccccc"]
}

const keysNordic = {

    // ROW 1

    "vertline": ["|", "|", "|", "|", "§"],
    "1": ["1", "1", "1", "1", "!"],
    "2": ["2", "2", "2", "@", "\""],
    "3": ["3", "3", "3", "£", "#"],
    "4": ["4", "4", "4", "$", "¤"],
    "5": ["5", "5", "5", "5", "%"],
    "6": ["6", "6", "6", "6", "&"],
    "7": ["7", "7", "7", "{", "/"],
    "8": ["8", "8", "8", "[", "("],
    "9": ["9", "9", "9", "]", ")"],
    "0": ["0", "0", "0", "}", "="],
    "+": ["+", "+", "+", "+", "?"],
    "\\": ["\\", "\\", "\\", "´", "`"],

    // ROW 2

    "q": ["q", "Q", "q", "q", "Q"],
    "w": ["w", "W", "w", "w", "W"],
    "e": ["e", "E", "e", "e", "E"],
    "r": ["r", "R", "r", "r", "R"],
    "t": ["t", "T", "t", "t", "T"],
    "y": ["y", "Y", "y", "y", "Y"],
    "u": ["u", "U", "u", "u", "U"],
    "i": ["i", "I", "i", "i", "I"],
    "o": ["o", "O", "o", "o", "O"],
    "p": ["o", "O", "o", "o", "O"],
    "å": ["å", "Å", "å", "å", "Å"],
    "¨": ["¨", "¨", "¨", "~", "^"],

    // ROW 3

    "a": ["a", "A", "a", "a", "A"],
    "s": ["s", "S", "s", "s", "S"],
    "d": ["d", "D", "d", "d", "D"],
    "f": ["f", "F", "f", "f", "F"],
    "g": ["g", "G", "g", "g", "G"],
    "h": ["h", "H", "h", "h", "H"],
    "j": ["j", "J", "j", "j", "J"],
    "k": ["k", "K", "k", "k", "K"],
    "l": ["l", "L", "l", "l", "L"],
    "ø": ["ø", "Ø", "ø", "ø", "Ø"],
    "æ": ["æ", "Æ", "æ", "æ", "Æ"],
    "'": ["'", "'", "'", "'", "*"],

    // ROW 4

    "lessthan": ["<", "<", "<", "<", ">"],
    "z": ["z", "Z", "z", "z", "Z"],
    "x": ["x", "X", "x", "x", "X"],
    "c": ["c", "C", "c", "c", "C"],
    "v": ["v", "V", "v", "v", "V"],
    "b": ["b", "B", "b", "b", "B"],
    "n": ["n", "N", "n", "n", "N"],
    "m": ["m", "M", "m", "m", "M"],
    ",": [",", ",", ",", ",", ";"],
    ".": [".", ".", ".", ".", ":"],
    "-": ["-", "-", "-", "-", "_"],
    "spacebar": [" ", " ", " ", " ", " "]
};

let output      = "",
    uppercase   = false,
    alt         = false,
    shift       = false,
    ctrl        = false,
    modIndex    = 0,
    charArray   = [],
    textElement = document.getElementById("text-container");

function updateText(text) {
    textElement.innerHTML = text;
}

function pressKey(key) {
    console.log("Pressed ", key.innerText);
    charArray.push(key.innerText);
    output += keysNordic[key.innerText.toLowerCase()][modIndex];
    updateText(output);
    if (shift) {
        pressShift();
    };
};

function pressSpecial(key) {
    console.log("Pressed special: ", key.innerText);
};

function pressEnter() {
    console.log("Linebreak added");
    console.log(textElement.innerHTML);
    charArray.push("linebreak");
    output += "<br>";
    updateText(output);
    console.log(textElement.innerHTML);
};

function pressBackspace() {
    console.log("Deleting: ", charArray[charArray.length - 1]);
    if (charArray[charArray.length - 1] == "linebreak") {
        output = output.slice(0, -1);
        output = output.slice(0, -1);
        output = output.slice(0, -1);
        output = output.slice(0, -1);
    } else {
        output = output.slice(0, -1);
    };
    charArray.pop();
    updateText(output);
};

function pressShift() {
    leftShift = document.getElementById("l-shift");
    rightShift = document.getElementById("r-shift");
    shift = !shift;
    rightShift.classList.toggle("pressed");
    leftShift.classList.toggle("pressed");
    updateKeyboard();
};

function pressCaps() {

};

function pressTab() {
    output += "	";
    updateText(output);
};

function updateKeyboard() {
    allKeys = document.getElementById("keyboard-container").querySelectorAll(".key");
    for (let key of allKeys) {
        key.innerText = keysNordic[key.id][modIndex];
    };
};

let themeID = 0;

function changeTheme() {
    let root = document.querySelector(":root");

    for (let [key, value] of Object.entries(themeValues)) {
        root.style.setProperty(key, value[themeID]);
    };
    themeID === 0 ? themeID = 1 : themeID = 0;
};