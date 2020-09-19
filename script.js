let queryURL = "https://sv443.net/jokeapi/v2/joke/Any?type=single";

$(".start-button").on("click", function() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (res) {
        console.log(res.joke)
        $(".result").text(res.joke);
    });
})