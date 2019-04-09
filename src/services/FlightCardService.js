/**
 * @class FlightCardService
 * @description Class to create, add and remove flight cards from the web page container
 * @param {string} flightCardsContainer - query selector of the HTML element containing the flight cards
 */
class FlightCardService {
    constructor(flightCardsContainer) {
        this.flightsContainer = document.querySelector(flightCardsContainer + " .t-Cards");
        this.appImagesPath = document.getElementById("P10_APP_IMAGES").value;
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
    addCardToPage = flightCard => {
        this.flightsContainer.innerHTML += this.getHTML(flightCard);
    };

    /**
     * @description Adds the flightCard to the Page, if all details have been set
     */
    addCardIfAllIsSet(flightCard) {
        if (
            flightCard.flight &&
            flightCard.airline &&
            flightCard.aircraft &&
            flightCard.destination
        ) {
            this.addCardToPage(flightCard);
        }
    }

    /**
     * @description Returns the flight status description of a flight
     */
    getFlightState(flight) {
        const flightStates = {
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
        return flightStates[flight.publicFlightState.flightStates[0]] || "not defined";
    }

    /**
     * @description Returns the route of a flight
     */
    getRoutesEU(flight) {
        const routesEU = { S: "Schengen", E: "Europe", N: "Non-Europe" };
        return flight.route && flight.route.eu ? routesEU[flight.route.eu] : "not defined";
    }

    /**
     * @description returns the HTML for a flight card
     * @param {FlightCard} flightCard - mandatory, flight card to generate the HTML for
     */
    getHTML = ({ flight, airline, aircraft, destination }) => {
        const terminalIcon = flight.terminal
            ? `
<div class="t-Card-icon">
    <span style="background:url(${this.appImagesPath}static/terminal${
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
                        : "undefined"
                }, ${destination && destination.country ? destination.country : "undefined"}</h4>
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
                                    : "undefined"
                            }</div>
                        </div>
                        <div class="item">
                            <div class="fligt-detail-label">Route:</div>
                            <div class="header">${this.getRoutesEU(flight)}</div>
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
