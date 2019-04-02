/**
 * @description loading flights using callback functions and catching any possible errors in the callbacks
 * => must be used with the FlightAPICallbackService!
 */
loadFlightsWithCallbacks = (apiService, cardService) => {
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

/**
 * @description loading flights using callback functions and catching any possible errors in the callbacks
 * => must be used with the FlightAPICallbackService!
 */
loadFlightsWithCallbacksParallel = (apiService, cardService) => {
    apiService.getFlights(flights => {
        flights.forEach(flight => {
            let flightCard = new FlightCard(flight);
            apiService.getAirline(flight, airline => {
                flightCard.setAirline(airline);
                cardService.addCardIfAllIsSet(flightCard);
            });
            apiService.getAircraft(flight, aircraft => {
                flightCard.setAircraft(aircraft);
                cardService.addCardIfAllIsSet(flightCard);
            });
            apiService.getDestination(flight, destination => {
                flightCard.setDestination(destination);
                cardService.addCardIfAllIsSet(flightCard);
            });
        });
    });
};

/**
 * @description loading flights fetching the details consecutively using promises and catching any error along the promise chain
 * => must be used with the FlightAPIPromiseService!
 */
loadFlightsWithPromises = (apiService, cardService) => {
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

/**
 * @description loading flights fetching the details in parallel using promises and catching any error along the promise chain
 * => must be used with the FlightAPIPromiseService!
 */
loadFlightsWithPromisesParallel = () => {
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

/**
 * @description loading flights fetching the details in parallel, maintaining the original orders
 * => must be used with the FlightAPIPromiseService!
 */
loadFlightsWithPromisesParallelInOrder = () => {
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
                cardService.addCardToPage(flightCard);
            });
        });
    });
};

/**
 * @description loading flights and fetching the details consecutively using async/await and catching any error during the operation
 * => must be used with the FlightAPIPromiseService!
 */
loadFlightsWithAsyncAwait = async () => {
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

/**
 * @description loading flights and fetching the details in parallel using async/await and catching any error during the operation
 * => must be used with the FlightAPIPromiseService!
 */
loadFlightsWithAsyncAwaitParallel = async () => {
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
