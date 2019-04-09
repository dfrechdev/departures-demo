/**
 * @description
 * loading flights using parallel callback functions
 */
const apiService = new FlightAPICallbackService("http://localhost:3000");
const cardService = new FlightCardService("#flights-container");

const loadFlights = (apiService, cardService) => {
    apiService.getFlights(flights => {
        flights.forEach(flight => {
            let flightCard = new FlightCard(flight);
            apiService.getAirline(flight, airline => {
                flightCard.setAirline(airline);
                cardService.addCardIfAllIsSet(flightCard);
            });
            apiService.getAircraft(flight, aircraft => {
                flightCard.setAircraft(aircraft);
                cardService.addCardIfAllIsSet(flightCard);
            });
            apiService.getDestination(flight, destination => {
                flightCard.setDestination(destination);
                cardService.addCardIfAllIsSet(flightCard);
            });
        });
    });
};
