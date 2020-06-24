const GRADIENTS = [
    ["#9400D3", "#4B0082"],
    ["#c84e89", "#F15F79"],
    ["#00F5A0", "#00D9F5"],
    ["#F7941E", "#004E8F"],
    ["#72C6EF", "#004E8F"],
    ["#FD8112", "#0085CA"],
    ["#bf5ae0", "#a811da"],
    ["#00416A", "#E4E5E6"],
    ["#fbed96", "#abecd6"],
    ["#FFE000", "#799F0C"],
    ["#F7F8F8", "#ACBB78"],
    ["#334d50", "#cbcaa5"],
    ["#799F0C", "#ACBB78"],
    ["#ffe259", "#ffa751"],
    ["#00416A", "#E4E5E6"],
    ["#FFE000", "#799F0C"],
    ["#acb6e5", "#86fde8"],
    ["#536976", "#292E49"],
    ["#B79891", "#94716B"],
    ["#9796f0", "#fbc7d4"],
];
let quote = {};

function getQuote() {
    return $.get(
        "https://programming-quotes-api.herokuapp.com/quotes/random/lang/en",
        function (data, status) {
            //console.log("Data: " + data.en + "\nStatus: " + status);
            quote.text = data.en;
            quote.author = data.author;
        }
    );
}

function randomBackground() {
    let colours = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
    $("body").css(
        "background",
        "linear-gradient(to right, " + colours[0] + ", " + colours[1] + ")"
    );
}

function quoteChanger() {
    $("#quotes").fadeOut(function () {
        $("#text").html(quote.text);
        $("#author").html("- " + quote.author);
        $(this).fadeIn();
    });
    $("#tweet-quote").attr(
        "href",
        "https://twitter.com/intent/tweet?hashtags=CSquotes&text=%22" +
            encodeURI(quote.text) +
            "%22%20" +
            quote.author
    );
}

$(document).ready(function () {
    randomBackground();
    getQuote().then(() => {
        quoteChanger();
    });

    $("#new-quote").on("click", function () {
        getQuote().then(() => {
            quoteChanger();
        });
    });
});
