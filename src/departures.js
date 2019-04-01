// services to handles the request details and to create, add and remove flight cards
// const apiService = new FlightAPICallbackService("http://localhost:3000");
const apiService = new FlightAPIPromiseService("http://localhost:3000");
const cardService = new FlightCardService("#flights-container");

// main function responsible for loading the flights
const loadFlights = () => {
    cardService.clearFlightsContainer();
    loadFlightsWithPromises(apiService);
};
