/**
 * @description
 * loading flights using sequential callback functions
 * and catching any possible errors in the callbacks
 */
const apiService = new FlightAPICallbackService("http://localhost:3000");
const cardService = new FlightCardService("#flights-container");

const loadFlights = () => {
    try {
        apiService.getFlights(flights => {
            flights.forEach(flight => {
                try {
                    let flightCard = new FlightCard(flight);
                    apiService.getAirline(flight, airline => {
                        try {
                            apiService.getAircraft(flight, aircraft => {
                                try {
                                    apiService.getDestination(flight, destination => {
                                        try {
                                            flightCard.setDetails(airline, aircraft, destination);
                                            cardService.addCardToPage(flightCard);
                                        } catch (err) {
                                            console.error(err);
                                        }
                                    });
                                } catch (err) {
                                    console.error(err);
                                }
                            });
                        } catch (err) {
                            console.error(err);
                        }
                    });
                } catch (err) {
                    console.error(err);
                }
            });
        });
    } catch (err) {
        console.error(err);
    }
};
