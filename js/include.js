function includeHTML() {
    const elements = document.querySelectorAll("[data-include]");

    elements.forEach(element => {
        const file = element.getAttribute("data-include");
        fetch(file)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur de chargement : ' + response.status + ' ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        element.innerHTML = data;
    })
    .catch(error => {
        console.error('Erreur lors du chargement du fichier', file, ':', error);
    });

    });
}

// Appel de la fonction pour charger le header et footer
includeHTML();