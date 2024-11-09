// src/app/models/flight.model.ts
export interface Airline {
    airlineCode: string;
    airlineName: string;
    airlineLogo: string;
    alternativeBusinessName: string;
    passportDetailsRequired: boolean;
  }
  
  export interface Airport {
    airportCode: string;
    airportName: string;
    cityName: string;
    cityCode: string;
    countryCode: string;
    countryName: string;
    regionName: string;
  }
  
  export interface FlightInfo {
    flightNumber: string;
    equipmentNumber: string;
    mealCode: string;
    bookingCode: string;
    cabinClass: string;
  }
  
  export interface FlightDTO {
    departureOffset: number;
    arrivalOffset: number;
    isStopSegment: boolean;
    deptTime: string;
    landTime: string;
    departureDate: string;
    arrivalDate: string;
    flightAirline: Airline;
    operatedAirline?: Airline;
    durationPerLeg: number;
    departureTerminalAirport: Airport;
    arrivalTerminalAirport: Airport;
    transitTime: string;
    flightInfo: FlightInfo;
    segmentDetails: { baggage: string };
  }
  
  export interface AirItinerary {
    sequenceNum: number;
    isRefundable: boolean;
    itinTotalFare: { amount: number; currencyCode: string; totalTaxes: number };
    totalDuration: number;
    deptDate: string;
    arrivalDate: string;
    cabinClass: string;
    allJourney: { flights: { flightDTO: FlightDTO[] }[] };
  }
  