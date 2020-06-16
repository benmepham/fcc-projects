let gradients = [["#9400D3", "#4B0082"], ["#c84e89", "#F15F79"], ["#00F5A0", "#00D9F5"], ["#F7941E", "#004E8F"], ["#72C6EF", "#004E8F"], ["#FD8112", "#0085CA"], ["#bf5ae0","#a811da"], ["#00416A", "#E4E5E6"], ["#fbed96", "#abecd6"], ["#FFE000", "#799F0C"], ["#F7F8F8", "#ACBB78"], ["#334d50", "#cbcaa5"], ["#799F0C", "#ACBB78"], ["#ffe259", "#ffa751"], ["#00416A", "#E4E5E6"], ["#FFE000", "#799F0C"], ["#acb6e5", "#86fde8"], ["#536976", "#292E49"], ["#B79891", "#94716B"], ["#9796f0", "#fbc7d4"]]
// window.onload = init;

// function init() {
  
//   getQuote();
// }



function getQuote() {
  let data_to_return = [];
  $.get("https://programming-quotes-api.herokuapp.com/quotes/random/lang/en", function (data, status) {
    //console.log("Data: " + data.en + "\nStatus: " + status);
    //document.getElementById("text").innerText = data.en;
    //console.log(data.en)
    //data_to_return = JSON.parse(data);
    //console.log(data);
    data_to_return.push(data.en, data.author)
  })
  return data_to_return;
};

function randomBackground() {
  let colours = gradients[Math.floor(Math.random() * gradients.length)];
  $('body').css('background', 'linear-gradient(to right, ' + colours[0] +', ' + colours[1] + ')')
  //$('html body').animate({background: 'linear-gradient(to right, ' + colours[0] +', ' + colours[1] + ')'}, 1000);
  //$('body').animate({background: 'linear-gradient(to right, #9400D3, #4B0082'}, 1000);
  //$("html body").animate({backgroundColor: colors[color], color: colors[color]},1000);
}

function quoteChanger() {
  let quote = getQuote()
  console.log(quote)
  console.log(typeof quote)
  //console.log(JSON.stringify(quote))
  //console.log(quote.author)
  let text = quote[0];
  let author = quote[1];
  console.log(text, author);
  //let twitterLink = "https://twitter.com/intent/tweet?hashtags=CSquotes&text=%22" + encodeURI(text) + "%22%20" + author;
  //document.getElementById("tweet-quote").href = twitterLink;
  //$('#tweet-quote').attr("href", twitterLink)
  //console.log(twitterLink)

  $("#quotes").fadeOut(
  function() {
    $('#text').html(quote.text);
    $('#author').html("- " + quote.author);
    
    $(this).fadeIn();
  });
  
  randomBackground()
      
}

$(document).ready(function(){
  //quoteChanger()
});