/**
 * @class FlightAPIService
 * @description Class to handle all calls to the flight API using callback functions. Includes client side caching of flight details
 * @param {string} apiHost  - URL of the flight API
 */
class FlightAPICallbackService {
    constructor(apiHost) {
        this.apiHost = apiHost;
        this.aircraftsCache = new Map();
        this.airlinesCache = new Map();
        this.destinationCache = new Map();
    }

    /**
     * @description fetches all flights from the flight API using a callback function
     */
    getFlights = callback => {
        $.getJSON(
            `${this.apiHost}/flights`,
            {
                flightDirection: "D",
                serviceType: "J",
                routesEU: document.getElementById("P10_ROUTES_EU").value,
                terminal: document.getElementById("P10_TERMINAL").value
            },
            callback
        );
    };

    /**
     * @description fetches an airline for a flight object using a callback function
     */
    getAirline = (flight, callback) => {
        if (flight.prefixIATA) {
            return this.airlinesCache.has(flight.prefixIATA)
                ? callback(this.airlinesCache.get(flight.prefixIATA))
                : $.getJSON(`${this.apiHost}/airlines/${flight.prefixIATA}`, response => {
                      this.airlinesCache.set(response[0].iata, response[0]);
                      callback(response[0]);
                  });
        } else {
            return callback({ publicName: "not defined" });
        }
    };

    /**
     * @description fetches the aircraft for a flight object using a callback function
     */
    getAircraft = (flight, callback) => {
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
                          aircraft && aircraft.length > 0
                              ? this.aircraftsCache.set(
                                    `${aircraft[0].iataMain || ""}.${aircraft[0].iataSub || ""}`,
                                    aircraft[0]
                                )
                              : null;
                          callback(aircraft[0]);
                      }
                  );
        } else {
            return callback({ shortDescription: "undefined" });
        }
    };

    /**
     * @description fetches the destination of a flight using a callback function
     */
    getDestination = (flight, callback) => {
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
        } else {
            callback({ publicName: { english: "not defined" } });
        }
    };

    getAircraftID(flight) {
        return `${flight.aircraftType.iataMain || ""}.${flight.aircraftType.iataSub || ""}`;
    }
}
