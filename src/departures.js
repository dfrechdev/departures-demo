const apiService = new FlightAPICallbackService("http://localhost:3000");
const cardService = new FlightCardService("#flights-container");

const loadFlights = () => {
    apiService.getFlights(flights => {
        flights.forEach(flight => {
            let flightCard = new FlightCard(flight);
            // To-Do: load details!
            cardService.addCardToPage(flightCard);
        });
    });
};
