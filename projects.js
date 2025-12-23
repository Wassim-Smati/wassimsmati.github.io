const username = "TON_PSEUDO_GITHUB"; // vérifie bien ça

fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
  headers: {
    "Accept": "application/vnd.github+json"
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error("Erreur GitHub API");
    }
    return response.json();
  })
  .then(repos => {
    const container = document.getElementById("projects");
    container.innerHTML = "";

    repos
      .filter(repo => 
        !repo.fork &&
        repo.topics &&
        repo.topics.includes("portfolio")
      )
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .forEach(repo => {
        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "Pas de description"}</p>
          <span>${repo.language || "?"}</span><br>
          <a href="${repo.html_url}" target="_blank">Voir sur GitHub →</a>
        `;

        container.appendChild(card);
      });

    if (container.innerHTML === "") {
      container.innerHTML = "<p>Aucun projet marqué <b>portfolio</b>.</p>";
    }
  })
  .catch(err => {
    console.error(err);
    document.getElementById("projects").innerText =
      "Erreur lors du chargement des projets.";
  });
