const apiService = new FlightAPIPromiseService("http://localhost:3000");
const cardService = new FlightCardService("#flights-container");

const loadFlights = async () => {
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
