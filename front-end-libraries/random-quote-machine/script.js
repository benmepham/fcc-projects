const GRADIENTS = [
    ["#9400D3", "#4B0082"],
    ["#c84e89", "#F15F79"],
    ["#00F5A0", "#00D9F5"],
    ["#72C6EF", "#004E8F"],
    ["#bf5ae0", "#a811da"],
    ["#00416A", "#E4E5E6"],
    ["#00416A", "#E4E5E6"],
    ["#acb6e5", "#86fde8"],
    ["#536976", "#292E49"],
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
