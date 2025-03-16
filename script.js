// Datos de los videos
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

// Función para generar el menú dinámicamente
function generateMenu() {
    const menuList = document.getElementById("menuList");

    // Agrupar los videos por categoría
    const categories = {};

    videos.forEach(video => {
        if (!categories[video.category]) {
            categories[video.category] = [];
        }
        categories[video.category].push(video);
    });

    // Crear los elementos del menú
    for (let category in categories) {
        // Crear un ítem de menú para cada categoría
        const categoryItem = document.createElement("li");
        categoryItem.textContent = `🌿 ${category}`;
        categoryItem.onclick = () => toggleMenu(category);
        
        const submenu = document.createElement("ul");
        submenu.id = category;
        submenu.classList.add("submenu");

        // Crear los subítems de menú (posturas)
        categories[category].forEach(video => {
            const videoItem = document.createElement("li");
            videoItem.classList.add("postura");
            videoItem.textContent = `🔹 ${video.title}`;
            videoItem.onclick = () => showVideo(video.videoID);
            submenu.appendChild(videoItem);
        });

        menuList.appendChild(categoryItem);
        menuList.appendChild(submenu);
    }
}

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
    let menus = document.querySelectorAll(".submenu");

    let foundAny = false;

    // Iterar sobre todos los submenús
    menus.forEach(menu => {
        let hasVisiblePosture = false;

        // Iterar sobre las posturas dentro de cada submenú
        menu.querySelectorAll("li").forEach(postura => {
            let text = postura.textContent.toLowerCase();
            if (text.includes(input)) {
                postura.style.display = "block"; // Mostrar la postura
                hasVisiblePosture = true;
            } else {
                postura.style.display = "none"; // Ocultar la postura
            }
        });

        // Si al menos una postura es visible, mostrar el submenú
        if (hasVisiblePosture) {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
    });
}

// Llamar a la función para generar el menú cuando cargue la página
window.onload = generateMenu;
