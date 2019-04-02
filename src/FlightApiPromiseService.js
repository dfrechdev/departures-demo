/**
 * @class FlightAPIPromiseService
 * @description Class to handle all calls to the flight API using promises. Includes client side caching of flight details
 * @param {string} apiHost  - URL of the flight API
 */
class FlightAPIPromiseService {
    constructor(apiHost) {
        this.apiHost = apiHost;
        this.aircraftsCache = new Map();
        this.airlinesCache = new Map();
        this.destinationCache = new Map();
    }

    /**
     * @description fetches all flights from the flight API using a promise
     */
    getFlights = () => {
        const url = new URL(`${this.apiHost}/flights`);
        const params = {
            flightDirection: "D",
            serviceType: "J",
            routesEU: document.getElementById("P10_ROUTES_EU").value,
            terminal: document.getElementById("P10_TERMINAL").value
        };
        url.search = new URLSearchParams(params);

        return fetch(url).then(response => response.json());
    };

    /**
     * @description fetches an airline for a flight object using a promise
     */
    getAirline = flight => {
        if (flight.prefixIATA) {
            return this.airlinesCache.has(flight.prefixIATA)
                ? Promise.resolve(this.airlinesCache.get(flight.prefixIATA))
                : fetch(`${this.apiHost}/airlines/${flight.prefixIATA}`)
                      .then(response => response.json())
                      .then(data => {
                          this.airlinesCache.set(data[0].iata, data[0]);
                          return data[0];
                      });
        }
        return Promise.resolve({ publicName: "not defined" });
    };

    /**
     * @description fetches the aircraft for a flight object using a promise
     */
    getAircraft = flight => {
        if (flight.aircraftType) {
            const aircraftId = this.getAircraftID(flight);
            if (this.aircraftsCache.has(aircraftId)) {
                return Promise.resolve(this.aircraftsCache.get(aircraftId));
            }
            const url = new URL(`${this.apiHost}/aircrafttypes`);
            const params = {
                iataMain: flight.aircraftType.iataMain,
                iataSub: flight.aircraftType.iataSub
            };
            url.search = new URLSearchParams(params);
            return fetch(url, {
                params: {
                    iataMain: flight.aircraftType.iataMain,
                    iataSub: flight.aircraftType.iataSub
                }
            })
                .then(response => response.json())
                .then(data => {
                    data && data.length > 0
                        ? this.aircraftsCache.set(
                              `${data[0].iataMain || ""}.${data[0].iataSub || ""}`,
                              data[0]
                          )
                        : null;
                    return data[0];
                });
        }
        return Promise.resolve({ shortDescription: "undefined" });
    };

    /**
     * @description fetches the destination of a flight using a promise
     */
    getDestination = flight => {
        if (flight.route && flight.route.destinations) {
            return this.destinationCache.has(flight.route.destinations[0])
                ? this.destinationCache.get(flight.route.destinations[0])
                : fetch(`${this.apiHost}/destinations/${flight.route.destinations[0]}`)
                      .then(response => response.json())
                      .then(destination => {
                          this.destinationCache.set(destination.iata, destination);
                          return destination;
                      });
        }
        Promise.resolve({ publicName: { english: "not defined" } });
    };

    getAircraftID(flight) {
        return `${flight.aircraftType.iataMain || ""}.${flight.aircraftType.iataSub || ""}`;
    }
}
