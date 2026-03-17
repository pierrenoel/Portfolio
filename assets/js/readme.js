const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const posts = {
  1: "1.laravel",
  2: "2.dotnet",
};

const articlePath = `articles/${posts[id]}`;

if (!posts[id]) {
  window.location.href = "404.html";
} else {
  fetch(`${articlePath}/menu.md`)
    .then((response) => response.text())
    .then((data) => {
      buildMenu(data);
      loadLesson("01.md");
    });
}

const buildMenu = (mdContent) => {
  const lines = mdContent.split("\n");
  let menuHTML = "";

  lines.forEach((line) => {
    if (line.startsWith("####")) {
      const title = line.replace("####", "").trim();
      menuHTML += `<div class="sidebar-section"><h4>${title}</h4>`;
    } else {
      const match = line.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const [_, text, file] = match;
        menuHTML += `<a href="#" data-file="${file}" class="sidebar-link">${text}</a>`;
      }
    }
  });

  const sidebar = document.querySelector(".lesson-sidebar");
  sidebar.innerHTML = menuHTML;

  sidebar.querySelectorAll(".sidebar-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      sidebar
        .querySelectorAll(".sidebar-link")
        .forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      const file = link.getAttribute("data-file");
      loadLesson(file);
    });
  });
};

const loadLesson = (fileName) => {
  const contentArea = document.querySelector(".prose");
  const mainTitle = document.querySelector(".main-title");
  const lessonTitle = document.querySelector(".lesson-title");

  fetch(`${articlePath}/${fileName}`)
    .then((response) => {
      if (!response.ok) throw new Error("Leçon non trouvée");
      return response.text();
    })
    .then((md) => {
      // Main title
      const titleMatch = md.match(/^#\s+(.*)$/m);

      if (titleMatch) {
        const title = titleMatch[1].trim();
        mainTitle.innerText = `${title}`;
        lessonTitle.innerText = `${title}`;
        document.title = `CodeForge - ${title}`
        cleanMd = md.replace(/^#\s+.+$/m, "").trim();
      }

      contentArea.innerHTML = marked.parse(cleanMd);
      window.scrollTo({ top: 0, behavior: "smooth" });
    })
    .catch((err) => {
      contentArea.innerHTML = `<p style="color:red;">Erreur : Impossible de charger la leçon.</p>`;
    });
};

// Gestion du menu mobile
const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".lesson-sidebar");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");

    menuToggle.classList.toggle("is-open");
  });
}

document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("sidebar-link") &&
    window.innerWidth <= 1024
  ) {
    sidebar.classList.remove("active");
  }
});
