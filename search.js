document.addEventListener("DOMContentLoaded", function () {
    fetch("videos.json")
        .then(response => response.json())
        .then(data => {
            window.videos = data;
            generateMenu(data);
        });
});




function parseDate(dateStr) {
    const meses = {
        "enero": 0, "febrero": 1, "marzo": 2,
        "abril": 3, "mayo": 4, "junio": 5,
        "julio": 6, "agosto": 7, "septiembre": 8,
        "octubre": 9, "noviembre": 10, "diciembre": 11
    };

    const [dia, , mesTexto] = dateStr.toLowerCase().split(" ");
    const mes = meses[mesTexto];
    return new Date(2025, mes, parseInt(dia)); // Cambiá 2025 si las fechas son de otro año
}


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

    // Ordenar las fechas cronológicamente
    Object.keys(groupedVideos)
        .sort((a, b) => parseDate(a) - parseDate(b))
        .forEach(date => {
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
    list.classList.remove("hidden");

    videos.forEach(video => {
        let li = document.createElement("li");
        li.innerHTML = `<a href="${video.link}" target="_blank">${video.title}</a><p>${video.description}</p>`;
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
