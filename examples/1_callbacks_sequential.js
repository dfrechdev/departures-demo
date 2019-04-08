/**
 * @description
 * loading flights using sequential callback functions
 * and catching any possible errors in the callbacks
 */
const apiService = new FlightAPICallbackService("http://localhost:3000");
const cardService = new FlightCardService("#flights-container");

loadFlights = () => {
    apiService.getFlights(flights => {
        flights.forEach(flight => {
            let flightCard = new FlightCard(flight);
            apiService.getAirline(flight, airline => {
                apiService.getAircraft(flight, aircraft => {
                    apiService.getDestination(flight, destination => {
                        flightCard.setDetails(airline, aircraft, destination);
                        cardService.addCardToPage(flightCard);
                    });
                });
            });
        });
    });
};
