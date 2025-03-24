document.addEventListener("DOMContentLoaded", function () {
    const searchContainer = document.createElement("div");
    searchContainer.style.textAlign = "center";
    searchContainer.style.marginTop = "20px";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Karakter neve...";
    searchInput.style.padding = "10px";
    searchInput.style.borderRadius = "8px";
    searchInput.style.border = "1px solid #c9091d";
    searchInput.style.fontSize = "16px";

    const searchButton = document.createElement("button");
    searchButton.innerText = "Keresés";
    searchButton.style.marginLeft = "10px";
    searchButton.style.padding = "10px 15px";
    searchButton.style.border = "none";
    searchButton.style.borderRadius = "8px";
    searchButton.style.backgroundColor = "#c9091d";
    searchButton.style.color = "white";
    searchButton.style.fontSize = "16px";
    searchButton.style.cursor = "pointer";

    function searchCharacter() {
        const characterName = searchInput.value.trim();
        if (characterName) {
            fetchCharacter(characterName);
        } else {
            characterContainer.innerHTML = "<p>Kérlek, adj meg egy karakternevet!</p>";
        }
    }

    searchButton.addEventListener("click", searchCharacter);

    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            searchCharacter();
        }
    });

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);
    document.body.appendChild(searchContainer);

    const characterContainer = document.createElement("div");
    characterContainer.id = "character-container";
    characterContainer.style.textAlign = "center";
    characterContainer.style.color = "#fff";
    characterContainer.style.marginTop = "20px";

    document.body.appendChild(characterContainer);

    function fetchCharacter(name) {
        fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    displayCharacter(data.results[0]);
                } else {
                    characterContainer.innerHTML = "<p>Nem található ilyen karakter.</p>";
                }
            })
            .catch(error => {
                console.error("Hiba történt:", error);
                characterContainer.innerHTML = "<p>Hiba történt az adatok lekérésekor.</p>";
            });
    }

    function displayCharacter(character) {
        characterContainer.innerHTML = `
            <img src="${character.image}" alt="${character.name}" style="border-radius: 16px; box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2); margin-top: 20px;">
            <h2>${character.name}</h2>
            <p><strong>Faj:</strong> ${character.species}</p>
            <p><strong>Nem:</strong> ${character.gender}</p>
        `;
    }
});
