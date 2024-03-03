function randInt(max) {
    return Math.floor(Math.random() * max);
}

samples = [];
cur_sample_id = 0;
window.onload = function() {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "data.json", false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
        result = JSON.parse(xmlhttp.responseText);
    }
    samples = result["samples"];
    getNewSample();
    update_video();
};

function getNewSample() {
    i = 0;
    cur_sample_id = randInt(samples.length);
    while (samples[cur_sample_id]["seen"] && i < samples.length) {
        cur_sample_id = randInt(samples.length)
        i++;
    }
    song_video = document.getElementById("song_video");
    song_video.style.display = "none";
    song_video.src = "";
    update_video();
};

function update_video() {
    vid_src = "https://www.youtube.com/embed/".concat(samples[cur_sample_id]["sampleURL"]);
    document.getElementById("sample_video").src = vid_src;
}

function display_song() {
    song_video = document.getElementById("song_video");
    song_video.src = "https://www.youtube.com/embed/".concat(samples[cur_sample_id]["songURL"])
    song_video.style.display = "block";
}

document.getElementById("submit").addEventListener("click", function () {
    guess = document.getElementById('guess_input').value;
    if (guess.toLowerCase() === samples[cur_sample_id]["name"].toLowerCase()) {
        display_song();
        samples[cur_sample_id]["seen"] = true
        document.getElementById('guess_input').value = "";
    }
});

document.getElementById("guess_input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        document.getElementById("submit").click();
    }
});

document.getElementById("get_new").addEventListener("click", getNewSample);