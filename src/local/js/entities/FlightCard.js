class FlightCard {
    constructor(flight) {
        this.flight = flight;
        this.airline = null;
        this.aircraft = null;
        this.destination = null;
    }

    /**
     * @description Adds the flight to the flight card
     */
    setFlight(flight) {
        this.flight = flight;
    }

    /**
     * @description Adds the flight details to the flight card
     */
    setDetails(airline, aircraft, destination) {
        this.airline = airline;
        this.aircraft = aircraft;
        this.destination = destination;
    }

    /**
     * @description Adds the airline to the flight card
     */
    setAirline(airline) {
        this.airline = airline;
    }

    /**
     * @description Adds the aircraft to the flight card
     */
    setAircraft(aircraft) {
        this.aircraft = aircraft;
    }

    /**
     * @description Adds the destination to the flight card
     */
    setDestination(destination) {
        this.destination = destination;
    }
}
