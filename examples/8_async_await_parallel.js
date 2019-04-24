/**
 * @description loading flights with async/await parallel
 */
const apiService = new FlightAPIPromiseService("http://localhost:3000");
const cardService = new FlightCardService("#flights-container");

const loadFlights = async () => {
    try {
        const flights = await apiService.getFlights();
        for (const flight of flights) {
            const flightCard = new FlightCard(flight);
            const pAirline = apiService.getAirline(flight);
            const pAircraft = apiService.getAircraft(flight);
            const pDestination = apiService.getDestination(flight);
            const [airline, aircraft, destination] = await Promise.all([
                pAirline,
                pAircraft,
                pDestination
            ]);
            flightCard.setDetails(airline, aircraft, destination);
            cardService.addCardToPage(flightCard);
        }
    } catch (err) {
        console.error(err);
    }
};
