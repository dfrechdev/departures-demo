/**
 * @description loading flights using callback functions and catching any possible errors in the callbacks
 * => must be used with the FlightAPICallbackService!
 */
loadFlightsWithCallback = apiService => {
    cardService.clearFlightsContainer();
    apiService.getFlights(flights => {
        flights.forEach(flight => {
            apiService.getAirline(flight, airline => {
                apiService.getAircraft(flight, aircraft => {
                    apiService.getDestination(flight, destination => {
                        cardService.addFlightCardToPage(flight, airline, aircraft, destination);
                    });
                });
            });
        });
    });
};

/**
 * @description loading flights fetching the details consecutively using promises and catching any error along the promise chain
 * => must be used with the FlightAPIPromiseService!
 */
loadFlightsWithPromise = apiService => {
    cardService.clearFlightsContainer();
    apiService
        .getFlights()
        .then(flights => {
            // for (flight of flights) {
            flights.forEach(flight => {
                // const arrivingFlight = flight;
                let airline, aircraft, destination;
                apiService
                    .getAirline(flight)
                    .then(data => {
                        airline = data;
                        return apiService.getAircraft(flight);
                    })
                    .then(data => {
                        aircraft = data;
                        return apiService.getDestination(flight);
                    })
                    .then(data => {
                        destination = data;
                        cardService.addFlightCardToPage(flight, airline, aircraft, destination);
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

/**
 * @description loading flights fetching the details in parallel using promises and catching any error along the promise chain
 * => must be used with the FlightAPIPromiseService!
 */
loadFlightsWithPromiseAll = () => {
    cardService.clearFlightsContainer();
    apiService
        .getFlights()
        .then(flights => {
            flights.forEach(flight => {
                const pAirline = apiService.getAirline(flight);
                const pAircraft = apiService.getAircraft(flight);
                const pDestination = apiService.getDestination(flight);
                Promise.all([pAirline, pAircraft, pDestination])
                    .then(([airline, aircraft, destination]) => {
                        cardService.addFlightCardToPage(flight, airline, aircraft, destination);
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

/**
 * @description loading flights and fetching the details consecutively using async/await and catching any error during the operation
 * => must be used with the FlightAPIPromiseService!
 */
loadFlightsWithAsyncAwait = async () => {
    cardService.clearFlightsContainer();
    try {
        const flights = await apiService.getFlights();
        for (flight of flights) {
            const airline = await apiService.getAirline(flight);
            const aircraft = await apiService.getAircraft(flight);
            const destination = await apiService.getDestination(flight);
            cardService.addFlightCardToPage(flight, airline, aircraft, destination);
        }
    } catch (err) {
        console.error(err);
    }
};

/**
 * @description loading flights and fetching the details in parallel using async/await and catching any error during the operation
 * => must be used with the FlightAPIPromiseService!
 */
loadFlightsWithAsyncAwaitAll = async () => {
    cardService.clearFlightsContainer();
    try {
        const flights = await apiService.getFlights();
        for (flight of flights) {
            const pAirline = apiService.getAirline(flight);
            const pAircraft = apiService.getAircraft(flight);
            const pDestination = apiService.getDestination(flight);
            const [airline, aircraft, destination] = await Promise.all([
                pAirline,
                pAircraft,
                pDestination
            ]);
            cardService.addFlightCardToPage(flight, airline, aircraft, destination);
        }
    } catch (err) {
        console.error(err);
    }
};
