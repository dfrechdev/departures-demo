/**
 * @description loading flights with parallel promise execution, maintaining the original orders
 */
const apiService = new FlightAPIPromiseService("http://localhost:3000");
const cardService = new FlightCardService("#flights-container");

const loadFlights = () => {
    apiService.getFlights().then(flights => {
        let pFlights = [];
        flights.forEach((flight, index) => {
            const pAirline = apiService.getAirline(flight);
            const pAircraft = apiService.getAircraft(flight);
            const pDestination = apiService.getDestination(flight);
            pFlights.push(Promise.all([flight, pAirline, pAircraft, pDestination]));
        });
        Promise.all(pFlights).then(flightDataSets => {
            flightDataSets.forEach(([flight, airline, aircraft, destination]) => {
                const flightCard = new FlightCard(flight);
                flightCard.setDetails(airline, aircraft, destination);
                cardService.addCardToPage(flightCard);
            });
        });
    });
};
