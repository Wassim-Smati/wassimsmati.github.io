const username = "TON_PSEUDO_GITHUB"; // ← CHANGE ÇA

fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
  .then(res => res.json())
  .then(repos => {
    const container = document.getElementById("projects");

    repos
      .filter(repo => !repo.fork)
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
  })
  .catch(err => {
    document.getElementById("projects").innerText =
      "Erreur lors du chargement des projets.";
  });
