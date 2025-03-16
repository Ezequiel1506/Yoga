const videos = [
    {
        title: "Tadasana",
        category: "Posturas de Pie",
        videoID: "1WHfqJg6rq-cyVSKtCiJP9hs9n5-rRwhB",
        description: "Postura de montaña, ideal para alinear el cuerpo."
    },
    {
        title: "Virabhadrasana",
        category: "Posturas de Pie",
        videoID: "1jS7krtcVYoUOvZMslBBt-aGrrnNqJudN",
        description: "Postura del guerrero, fortalece piernas y brazos."
    },
    {
        title: "Padmasana",
        category: "Posturas Sentadas",
        videoID: "1DntOc-K90MjVpoErcG0XOXyJvgqF8X78",
        description: "Postura de loto, ideal para meditar."
    },
    {
        title: "Sukhasana",
        category: "Posturas Sentadas",
        videoID: "1pzfsW_q7TZZEDSXyyLFlqgsXtQUpDUNP",
        description: "Postura fácil de sentarse, ideal para la meditación."
    }
];


// Mostrar u ocultar submenús
function toggleMenu(id) {
    let submenu = document.getElementById(id);
    submenu.style.display = (submenu.style.display === "block") ? "none" : "block";
}

// Cambiar el video en el iframe y mostrarlo
function showVideo(videoID) {
let iframe = document.getElementById("videoFrame");
let videoContainer = document.getElementById("videoContainer");
let videoDescription = document.getElementById("videoDescription");
let videoTitle = document.getElementById("videoTitle");

// Encuentra el video correspondiente
let video = videos.find(v => v.videoID === videoID);

// Cambia el iframe
iframe.src = `https://drive.google.com/file/d/${videoID}/preview`;
videoContainer.style.display = "block";

// Actualiza la descripción y el título
videoTitle.textContent = video.title;
videoDescription.textContent = video.description;
}

// Buscador de posturas mejorado
function searchPosture() {
    let input = document.getElementById("search").value.toLowerCase();
    let posturas = document.querySelectorAll(".postura");

    posturas.forEach(postura => {
        let text = postura.textContent.toLowerCase();
        if (text.includes(input)) {
            postura.style.display = "block";
        } else {
            postura.style.display = "none";
        }
    });
}

