function palindrome(str) {
    let newStr = str.replace(/[^A-Z0-9]/gi, "").toLowerCase(),
        i = 0;
    for (; i < Math.floor(newStr.length / 2); i++) {
        if (newStr[i] !== newStr[newStr.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

palindrome("eye");
