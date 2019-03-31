/**
 * @description loading flights using callback functions and catching any possible errors in the callbacks
 */
loadFlightsWithCallback = () => {
    cardService.clearFlightsContainer();
    apiService.getFlightsCallback(flights => {
        flights.forEach(flight => {
            apiService.getAirlineCallback(flight, airline => {
                apiService.getAircraftCallback(flight, aircraft => {
                    apiService.getDestinationCallback(flight, destination => {
                        cardService.addFlightCardToPage(flight, airline, aircraft, destination);
                    });
                });
            });
        });
    });
};

/**
 * @description loading flights fetching the details consecutively using promises and catching any error along the promise chain
 */
loadFlightsWithPromise = () => {
    cardService.clearFlightsContainer();
    apiService
        .getFlightsPromise()
        .then(flights => {
            // for (flight of flights) {
            flights.forEach(flight => {
                // const arrivingFlight = flight;
                let airline, aircraft, destination;
                apiService
                    .getAirlinePromise(flight)
                    .then(data => {
                        airline = data;
                        return apiService.getAircraftPromise(flight);
                    })
                    .then(data => {
                        aircraft = data;
                        return apiService.getDestinationPromise(flight);
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
 */
loadFlightsWithPromiseAll = () => {
    cardService.clearFlightsContainer();
    apiService
        .getFlightsPromise()
        .then(flights => {
            flights.forEach(flight => {
                const pAirline = apiService.getAirlinePromise(flight);
                const pAircraft = apiService.getAircraftPromise(flight);
                const pDestination = apiService.getDestinationPromise(flight);
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
 */
loadFlightsWithAsyncAwait = async () => {
    cardService.clearFlightsContainer();
    try {
        const flights = await apiService.getFlightsPromise();
        for (flight of flights) {
            const airline = await apiService.getAirlinePromise(flight);
            const aircraft = await apiService.getAircraftPromise(flight);
            const destination = await apiService.getDestinationPromise(flight);
            cardService.addFlightCardToPage(flight, airline, aircraft, destination);
        }
    } catch (err) {
        console.error(err);
    }
};

/**
 * @description loading flights and fetching the details in parallel using async/await and catching any error during the operation
 */
loadFlightsWithAsyncAwaitAll = async () => {
    cardService.clearFlightsContainer();
    try {
        const flights = await apiService.getFlightsPromise();
        for (flight of flights) {
            const pAirline = apiService.getAirlinePromise(flight);
            const pAircraft = apiService.getAircraftPromise(flight);
            const pDestination = apiService.getDestinationPromise(flight);
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
