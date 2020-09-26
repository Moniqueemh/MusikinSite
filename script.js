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
            method: "GET",
            error: function () {
                $("#lyricsText").text("No lyrics found"); // If no song is found, let user know
            }
        }).then(function (res) {
            $("#lyricsText").html(res.result.track.text);  // Updates lyrics text with searched track lyrics        
        })

        $.ajax({ // Calls lastFM api to display track information
            url: lastFmTrackInfoURL,
            method: "GET"
        }).then(function (res) {
            if ("track" in res) {

                if ("album" in res.track) { // if track and album is found
                    $("#albumEl").text("Album: " + res.track.album.title); // Sets id albumEl text to the album name
                    $("#albumArt").attr("src", res.track.album.image[3]["#text"]); // Sets album cover
                    $("#albumArt").removeClass("hidden");
                    $("#albumLink").attr("href", res.track.url); // Adds link to album cover to go to song page
                }
                else { // if track is found but no album
                    $("#albumEl").text("No album found");
                    $("#albumArt").attr("src", "");
                    $("#albumLink").attr("href", "");
                }

                if ("wiki" in res.track) { // if track and wiki is found
                    $("#summaryText").html(res.track.wiki.summary);
                }
                else { // if track is found but no wiki
                    $("#summaryText").text("No summary found");
                }

            }
            else { // If no song data is found
                $("#albumEl").text("No song data found");
                $("#summaryText").text("No summary found");
                $("#albumArt").attr("src", "");
                $("#albumLink").attr("href", "");
            }
        });
    })

});
