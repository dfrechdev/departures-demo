/**
 * @description loading flights using parallel promise execution
 */
const apiService = new FlightAPIPromiseService("http://localhost:3000");
const cardService = new FlightCardService("#flights-container");

const loadFlights = () => {
    apiService
        .getFlights()
        .then(flights => {
            flights.forEach(flight => {
                let flightCard = new FlightCard(flight);
                const pAirline = apiService.getAirline(flight);
                const pAircraft = apiService.getAircraft(flight);
                const pDestination = apiService.getDestination(flight);
                Promise.all([pAirline, pAircraft, pDestination])
                    .then(([airline, aircraft, destination]) => {
                        flightCard.setDetails(airline, aircraft, destination);
                        cardService.addCardToPage(flightCard);
                    })
                    .catch(err => {
                        console.error(err);
                    });
            });
        })
        .catch(err => {
            console.error(err);
        });
};
