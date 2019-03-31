// api service for the flight api that handles all the request details,
const apiService = new FlightAPIService("http://localhost:3000");
// service to create, add and remove flight cards from the application
const cardService = new FlightCardService("#flights-container");

// main function responsible for loading the flights
// const loadFlights = () => {
//     cardService.clearFlightsContainer();
//     // To-Do: Implementation
// };

const loadFlights = () => {
    cardService.clearFlightsContainer();
    loadFlightsWithCallback();
    // loadFlightsWithPromise();
    // loadFlightsWithPromiseAll();
    // loadFlightsWithAsyncAwait();
    // loadFlightsWithAsyncAwaitAll();
};
