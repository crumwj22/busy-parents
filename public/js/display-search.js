const driversList = document.getElementById('driversList');
const searchBar = document.getElementById('#searchBar');
let renderedDrivers = [];

// console.log(searchBar);

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    // console.log(e);
    const filteredDrivers = renderedDrivers.filter((drivers) => {
        return (
            drives.name.toLowerCase().includes(searchString) ||
            drivers.city.toLowerCase().includes(searchString) ||
            driver.dropoff_location.toLowerCase().includes(searchString) ||
            driver.pickup_location.toLowerCase().includes(searchString)
        );
    });
    // console.log(filteredDrivers)
    displayDrivers(filteredDrivers);
});

loadDrivers();