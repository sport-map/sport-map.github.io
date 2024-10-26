// Récupérer tous les boutons et le bouton de validation
const buttons = document.querySelectorAll('.board button'); // Mise à jour ici
const validateButton = document.createElement('button');
validateButton.textContent = 'Valider';
validateButton.classList.add('validate-button');

// Ajouter le bouton de validation à la fin de la page
document.body.appendChild(validateButton);

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
        // Rediriger vers la page de la carte avec le sport sélectionné
        window.location.href = `map.html?sport=${encodeURIComponent(selectedSport)}`;
    } else {
        alert('Veuillez sélectionner un sport avant de valider.');
    }
});
