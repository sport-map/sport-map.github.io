// Global variable to store football markers
let footballMarkers = [];

function createFootballMarkers(data) {
    // Clear existing markers
    footballMarkers.forEach(marker => marker.remove());
    footballMarkers = [];

    data.results.forEach(item => {
        // Check if the equipment has football facilities
        if (item.equip_aps_code && item.equip_aps_code.includes("2901")) {
            if (item.coordonnees) {
                const marker = new mapboxgl.Marker()
                    .setLngLat([item.coordonnees.lon, item.coordonnees.lat])
                    .setPopup(new mapboxgl.Popup().setHTML(`
                        <h3>${item.equip_nom}</h3>
                        <p>Type: ${item.equip_type_name}</p>
                        <p>Commune: ${item.inst_com_nom}</p>
                    `))
                    .addTo(map);
                
                footballMarkers.push(marker);
            }
        }
    });
}

// Function to fetch and display markers
function fetchAndDisplayFootballMarkers(selectedDepartment) {
    const apiUrl = `https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?where=dep_code="${selectedDepartment}"`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            createFootballMarkers(data);
        })
        .catch(error => console.error('Error fetching football markers:', error));
}
