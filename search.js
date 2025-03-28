document.addEventListener("DOMContentLoaded", function () {
    fetch("videos.json")
        .then(response => response.json())
        .then(data => {
            window.videos = data;
            displayVideos(data);
        });
});

function displayVideos(videos) {
    let list = document.getElementById("video-list");
    list.innerHTML = "";
    videos.forEach(video => {
        let li = document.createElement("li");
        li.innerHTML = `<a href="${video.link}" target="_blank">${video.title}</a> - ${video.description}`;
        list.appendChild(li);
    });
}

function searchVideos() {
    let query = document.getElementById("search").value.toLowerCase();
    let filtered = window.videos.filter(video =>
        video.title.toLowerCase().includes(query) || 
        video.description.toLowerCase().includes(query)
    );
    displayVideos(filtered);
}
