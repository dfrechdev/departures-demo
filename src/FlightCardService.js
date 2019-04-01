/**
 * @class FlightCardService
 * @description Class to create, add and remove flight cards from the web page container
 * @param {string} flightCardsContainer - query selector of the HTML element containing the flight cards
 */
class FlightCardService {
    constructor(flightCardsContainer) {
        this.flightsContainer = document.querySelector(flightCardsContainer + " .t-Cards");
        this.routesEU = { S: "Schengen", E: "Europe", N: "Non-Europe" };
        this.appImages = document.getElementById("P10_APP_IMAGES").value;
        this.flightStates = {
            SCH: "Scheduled",
            DEL: "Delayed",
            WIL: "Wait in Lounge",
            GTO: "Gate Open",
            BRD: "Boarding",
            GCL: "Gate Closing",
            GTD: "Gate closed",
            DEP: "Departed",
            CNX: "Cancelled",
            GCH: "Gate Change",
            TOM: "Tomorrow"
        };
    }

    /**
     * @description removes all flight cards from the flight card container
     */
    clearFlightsContainer = () => {
        this.flightsContainer.innerHTML = "";
    };

    /**
     * @description adds a flight card to the flight card container
     */
    addFlightCardToPage = (flight, airline, aircraft, destination) => {
        const flightCard = this.getFlightCard(flight, airline, aircraft, destination);
        this.flightsContainer.innerHTML += flightCard;
    };

    /**
     * @description Returns the flight status description of a flight
     */
    getFlightState(flight) {
        return this.flightStates[flight.publicFlightState.flightStates[0]] || "undefined";
    }

    /**
     * @description adds a flight card to the flight card container
     * @param {Flight} flight - mandatory, flight to add
     * @param {Airline} airline - optional, airline operating the flight
     * @param {Aircraft} aircraft - optional, aircraft used for this flight
     * @param {Destination} destination - optional, destination of the flight
     */
    getFlightCard = (flight, airline, aircraft, destination) => {
        const terminalIcon = flight.terminal
            ? `
<div class="t-Card-icon">
    <span style="background:url(${this.appImages}static/terminal${
                  flight.terminal
              }.png) no-repeat top left;background-size:cover;width:35px;"></span>
</div>`
            : "";

        return `
<li class="t-Cards-item ">
    <div class="t-Card">
        <a href="#" class="t-Card-wrap">
            ${terminalIcon}
            <div class="t-Card-titleWrap">
                <h3 class="t-Card-title">${moment(
                    flight.scheduleDateTime,
                    "YYYY-MM-DDTHH:mm:ss.SSS"
                ).format("hh:mm")} - ${flight.flightName}</h3>
                <h4 class="t-Card-subtitle flight-card-subtitle">${
                    destination && destination.publicName
                        ? destination.publicName.english
                        : "Undefined"
                }, ${destination && destination.country ? destination.country : "XX"}</h4>
            </div>
            <div class="t-Card-body">
                <div class="t-Card-desc flight-details">
                    <div class="ui list">
                        <div class="item">
                            <div class="fligt-detail-label">Airline:</div>
                            <div class="header">${
                                airline && airline.publicName ? airline.publicName : "undefined"
                            }</div>
                        </div>
                        <div class="item">
                            <div class="fligt-detail-label">Aircraft:</div>
                            <div class="header">${
                                aircraft && aircraft.shortDescription
                                    ? aircraft.shortDescription
                                    : "Unknown"
                            }</div>
                        </div>
                        <div class="item">
                            <div class="fligt-detail-label">Route:</div>
                            <div class="header">${
                                flight.route && flight.route.eu
                                    ? this.routesEU[flight.route.eu]
                                    : "?"
                            }</div>
                        </div>
                        <div class="item">
                            <div class="fligt-detail-label">Gate:</div>
                            <div class="header">${flight.gate ? flight.gate : "not defined"}</div>
                        </div>     
                        <div class="item">
                            <div class="fligt-detail-label">Status:</div>
                            <div class="header">${this.getFlightState(flight)}</div>
                        </div>                                             
                        <div class="flight-codeshares">${
                            flight.codeshares && flight.codeshares.codeshares
                                ? "also known as: " + flight.codeshares.codeshares.join(", ")
                                : ""
                        }</div>   
                    </div>  
                </div>  
            </div>         
            <span class="t-Card-colorFill u-color "></span>
        </a>
    </div>
</li>`;
    };
}
