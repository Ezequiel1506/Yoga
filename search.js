document.addEventListener("DOMContentLoaded", function () {
    fetch("videos.json")
        .then(response => response.json())
        .then(data => {
            window.videos = data;
            generateMenu(data);
            displayVideos(data);
        });
});

function generateMenu(videos) {
    let menu = document.getElementById("class-menu");
    let groupedVideos = {};

    // Agrupar videos por fecha
    videos.forEach(video => {
        if (!groupedVideos[video.date]) {
            groupedVideos[video.date] = [];
        }
        groupedVideos[video.date].push(video);
    });

    // Crear enlaces en el menú
    Object.keys(groupedVideos).sort().forEach(date => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#";
        a.textContent = date;
        a.onclick = function () {
            displayVideos(groupedVideos[date]);
        };
        li.appendChild(a);
        menu.appendChild(li);
    });
}

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
