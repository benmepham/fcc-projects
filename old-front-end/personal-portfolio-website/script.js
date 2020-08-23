$("a").click(function () {
    $("html, body").animate(
        {
            scrollTop: $($(this).attr("href")).offset().top - 50,
        },
        500
    );
    return false;
});
