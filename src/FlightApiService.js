/**
 * @class FlightAPIService
 * @description Class to handle all calls to the flight API, as well as client side caching of flight details
 * @param {string} apiHost  - URL of the flight API
 */
class FlightAPIService {
    constructor(apiHost) {
        this.apiHost = apiHost;
        this.aircraftsCache = new Map();
        this.airlinesCache = new Map();
        this.destinationCache = new Map();
    }

    /**
     * @description fetches all flights from the flight API using a callback function
     */
    getFlightsCallback = callback => {
        $.getJSON(
            `${this.apiHost}/flights`,
            {
                flightDirection: "A",
                serviceType: "J",
                routesEU: document.getElementById("P10_ROUTES_EU").value,
                terminal: document.getElementById("P10_TERMINAL").value
            },
            callback
        );
    };

    /**
     * @description fetches all flights from the flight API using a promise
     */
    getFlightsPromise = () => {
        const url = new URL(`${this.apiHost}/flights`);
        const params = {
            flightDirection: "A",
            serviceType: "J",
            routesEU: document.getElementById("P10_ROUTES_EU").value,
            terminal: document.getElementById("P10_TERMINAL").value
        };
        url.search = new URLSearchParams(params);

        return fetch(url).then(response => response.json());
    };

    /**
     * @description fetches an airline for a flight object using a callback function
     */
    getAirlineCallback = (flight, callback) => {
        if (flight.prefixIATA) {
            return this.airlinesCache.has(flight.prefixIATA)
                ? callback(this.airlinesCache.get(flight.prefixIATA))
                : $.getJSON(`${this.apiHost}/airlines/${flight.prefixIATA}`, response => {
                      this.airlinesCache.set(response[0].iata, response[0]);
                      callback(response[0]);
                  });
        }
    };

    /**
     * @description fetches an airline for a flight object using a promise
     */
    getAirlinePromise = flight => {
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
    };

    /**
     * @description fetches the aircraft for a flight object using a callback function
     */
    getAircraftCallback = (flight, callback) => {
        if (flight.aircraftType) {
            const aircraftId = this.getAircraftID(flight);
            this.aircraftsCache.has(aircraftId)
                ? callback(this.aircraftsCache.get(aircraftId))
                : $.getJSON(
                      `${this.apiHost}/aircrafttypes`,
                      {
                          iataMain: flight.aircraftType.iataMain,
                          iataSub: flight.aircraftType.iataSub
                      },
                      aircraft => {
                          this.aircraftsCache.set(
                              `${aircraft[0].iataMain || ""}.${aircraft[0].iataSub || ""}`,
                              aircraft[0]
                          );
                          callback(aircraft[0]);
                      }
                  );
        }
    };

    /**
     * @description fetches the aircraft for a flight object using a promise
     */
    getAircraftPromise = flight => {
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
                    this.aircraftsCache.set(
                        `${data[0].iataMain || ""}.${data[0].iataSub || ""}`,
                        data[0]
                    );
                    return data[0];
                });
        }
        return Promise.resolve({ shortDescription: "undefined" });
    };

    /**
     * @description fetches the destination of a flight using a callback function
     */
    getDestinationCallback = (flight, callback) => {
        console.log(flight.route.destinations[0]);
        if (flight.route && flight.route.destinations) {
            this.destinationCache.has(flight.route.destinations[0])
                ? callback(this.destinationCache.get(flight.route.destinations[0]))
                : $.getJSON(
                      `${this.apiHost}/destinations/${flight.route.destinations[0]}`,
                      destination => {
                          this.destinationCache.set(destination.iata, destination);
                          callback(destination);
                      }
                  );
        }
    };

    /**
     * @description fetches the destination of a flight using a promise
     */
    getDestinationPromise = flight => {
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
    };

    getAircraftID(flight) {
        return `${flight.aircraftType.iataMain || ""}.${flight.aircraftType.iataSub || ""}`;
    }
}
