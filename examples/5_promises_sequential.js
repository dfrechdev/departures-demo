/**
 * @description loading flights using sequential promise execution
 */
const apiService = new FlightAPIPromiseService("http://localhost:3000");
const cardService = new FlightCardService("#flights-container");

loadFlights = () => {
    apiService
        .getFlights()
        .then(flights => {
            flights.forEach(flight => {
                console.log(flight);
                let flightCard = new FlightCard(flight);
                apiService
                    .getAirline(flight)
                    .then(airline => {
                        flightCard.setAirline(airline);
                        return apiService.getAircraft(flight);
                    })
                    .then(aircraft => {
                        flightCard.setAircraft(aircraft);
                        return apiService.getDestination(flight);
                    })
                    .then(destination => {
                        flightCard.setDestination(destination);
                        cardService.addCardToPage(flightCard);
                    });
            });
        })
        .catch(err => {
            console.error(err);
        });
};
