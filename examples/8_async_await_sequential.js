/**
 * @description loading flights with async/await sequentially
 */
const apiService = new FlightAPIPromiseService("http://localhost:3000");
const cardService = new FlightCardService("#flights-container");

const loadFlights = async () => {
    try {
        const flights = await apiService.getFlights();
        for (const flight of flights) {
            const flightCard = new FlightCard(flight);
            const airline = await apiService.getAirline(flight);
            const aircraft = await apiService.getAircraft(flight);
            const destination = await apiService.getDestination(flight);
            flightCard.setDetails(airline, aircraft, destination);
            cardService.addCardToPage(flightCard);
        }
    } catch (err) {
        console.error(err);
    }
};
