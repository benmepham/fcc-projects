function rot13(str) {
    let input = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let output = "NOPQRSTUVWXYZABCDEFGHIJKLM";
    let index = (x) => input.indexOf(x);
    return str
        .split("")
        .map((x) => (index(x) != -1 ? output[index(x)] : x))
        .join("");
}

rot13("SERR PBQR PNZC");
