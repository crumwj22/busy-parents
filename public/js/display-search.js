const driversList = document.getElementById('driversList');
const searchBar = document.getElementById('searchBar');
let renderedDrivers = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredDrivers = renderedDrivers.filter((drivers) => {
        return (
            drivers.name.toLowerCase().includes(searchString) ||
            drivers.city.toLowerCase().includes(searchString) ||
            drivers.dropoff_location.toLowerCase().includes(searchString) ||
            drivers.pickup_location.toLowerCase().includes(searchString)
        );
    });
    displayDrivers(filteredDrivers);
});

const loadDrivers = async () => {
    try {
        const res = await fetch('/api/drivers/');
        renderedDrivers = await res.json();
        displayDrivers(renderedDrivers);
    } catch (err) {
        console.error(err);
    }
};

const displayDrivers = (drivers) => {
    const htmlString = drivers
        .map((drivers) => {
            return `
            <li class="drivers">
                <h2>${drivers.name}</h2>
                <p>City: ${drivers.city}</p>
                <p>Dropoff: ${drivers.dropoff_location}</p>
                <p>Pickup: ${drivers.pickup_location}</p>
            </li>
        `;
        })
        .join('');
    driversList.innerHTML = htmlString;
};

loadDrivers();
