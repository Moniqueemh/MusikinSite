$(document).ready(function () {
    let lastFmKey = "10a27986ff454210e0ad746d11440bec"


    $("#searchBtn").on("click", function () { // Click listener that calls api's to get data and display to page
        let lastFmArtist = $("#artistInput").val();
        let lastFmTrack = $("#trackInput").val();
        let lastFmTrackInfoURL = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=" + lastFmKey + "&artist=" + lastFmArtist + "&track=" + lastFmTrack + "&format=json"

        $.ajax({
            url: lastFmTrackInfoURL,
            method: "GET"
        }).then(function (res) { // Calls lastFM api to display track information
            console.log(res);
            $("#albumEl").text("Album: " + res.track.album.title); // Sets id albumEl text to the album name
        });
    })

});