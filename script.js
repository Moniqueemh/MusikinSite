$(document).ready(function () {
    let lastFmKey = "10a27986ff454210e0ad746d11440bec"
    let lyricKey = "sBvjTNvvl48PKNsjRyhI1UPaY3C3PlymSjHdiFBxyUJU2UADTWmBOZ8gU3zKdGCl"


    $("#searchBtn").on("click", function (event) { // Click listener that calls api's to get data and display to page
        event.preventDefault();

        let artist = $("#artistInput").val();
        let track = $("#trackInput").val();
        let lastFmTrackInfoURL = "https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=" + lastFmKey + "&artist=" + artist + "&track=" + track + "&format=json";
        let lyricUrl = "https://orion.apiseeds.com/api/music/lyric/" + artist + "/" + track + "?apikey=" + lyricKey;

        $.ajax({ // Calls apiSeeds lyrics to get lyric data
            url: lyricUrl,
            method: "GET"
        }).then(function (res) {
            console.log(res.result.track.text);
            $("#lyricsText").html(res.result.track.text)
        })
        $.ajax({ // Calls lastFM api to display track information
            url: lastFmTrackInfoURL,
            method: "GET"
        }).then(function (res) {
            console.log(res);
            $("#albumEl").text("Album: " + res.track.album.title); // Sets id albumEl text to the album name
        });
    })

});
