$(document).ready(function () {

    $(".programming-button").on("click", function () { // When you click the programming button, fill the textbox with a relevant joke
        getJoke("Programming");
    })
    $(".puns-button").on("click", function () {
        getJoke("Pun");
    })
    $(".dark-button").on("click", function () {
        getJoke("Dark");
    })
    $(".norris-button").on("click", function () { // Grabs from Chuck Norris api instead
        $.ajax({
            url: "https://api.chucknorris.io/jokes/random",
            method: "GET"
        }).then(function (res) {
            $(".result").text(res.value);
        });
    })

    function getJoke(inputCatagory) {
        let catagory = inputCatagory;
        let queryURL = "https://sv443.net/jokeapi/v2/joke/" + catagory + "?type=single";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (res) {
            $(".result").text(res.joke); // Sets textbox's text to the generated joke
        });
    }
});