// Récupérer tous les boutons et le bouton de validation
const container = document.querySelector('.container'); // sélectionne le container
const buttons = document.querySelectorAll('.board button'); // sélectionne tous les boutons
const validateButton = document.createElement('button'); // crée le bouton
validateButton.textContent = 'Suivant';
validateButton.classList.add('validate-button');

// Ajouter le bouton de validation à la fin de la page
container.appendChild(validateButton);

// Variable pour stocker le sport sélectionné
let selectedSport = null;

// Fonction pour gérer la sélection des boutons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Retirer la classe 'active' de tous les boutons
        buttons.forEach(btn => btn.classList.remove('active'));

        // Ajouter la classe 'active' au bouton cliqué
        button.classList.add('active');

        // Enregistrer le sport sélectionné
        selectedSport = button.textContent;
    });
});

// Fonction pour gérer la validation
validateButton.addEventListener('click', () => {
    if (selectedSport) {
        // Effectuer le fetch pour récupérer les équipements sportifs
        fetch('https://raw.githubusercontent.com/Main-Vision/main-vision.github.io/refs/heads/main/data-es-types-only.json')
            .then(response => {
                if (!response.ok) throw new Error('Erreur réseau');
                return response.json();
            })
            .then(data => {
                // Vérifier la structure des données pour s'assurer que le filtrage est correct
                const filteredData = data.filter(item => item.sport === selectedSport);

                // Stocker les données dans localStorage et rediriger vers la carte
                localStorage.setItem('sportData', JSON.stringify(filteredData));
                window.location.href = `map.html?sport=${encodeURIComponent(selectedSport)}`;
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données:', error);
                alert('Une erreur est survenue lors de la récupération des données.');
            });
    } else {
        alert('Veuillez sélectionner un sport avant de valider.');
    }
});
