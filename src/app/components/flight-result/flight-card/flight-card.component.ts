import { HelperService } from './../../../shared/services/helper.service';
import { Component, Input } from '@angular/core';
import { FlightDTO } from 'src/app/shared/models/flight';
import { FlightsService } from './../../../shared/services/flights.service';


@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],

})
export class FlightCardComponent {
  @Input() selectedAirlines: string[] = [];
  @Input() selectedStop: string[] = [];
flightData:any
word:string=''
filteredFlightData: any[] = []; 


  constructor(private FlightsService:FlightsService,public helperService:HelperService){}

  ngOnChanges(): void {
    this.applyFilter();
  }

  ngOnInit(): void {
// make settimeout function just for vercel server to make live Demo
    setTimeout(() => {
      this.GetData()
    }, 600);
  }

  GetData(){
    this.FlightsService.getFlightData().subscribe({
      next: (res) => { 
        this.flightData = res.airItineraries.flatMap((itinerary: any) => {
          const totalFare = itinerary.itinTotalFare; 
       
          return itinerary.allJourney.flights.map((flight: any) => {
            return flight.flightDTO.map((flightDetail: any) => {
              return {
                deptTime: flightDetail.deptTime,
                landTime: flightDetail.landTime,
                departureDate: flightDetail.departureDate,
                arrivalDate: flightDetail.arrivalDate,
                flightAirline: {
                  airlineCode: flightDetail.flightAirline.airlineCode,
                  airlineName: flightDetail.flightAirline.airlineName,
                  airlineLogo: flightDetail.flightAirline.airlineLogo
                },
                departureTerminalAirport: {
                  airportCode: flightDetail.departureTerminalAirport.airportCode,
                  airportName: flightDetail.departureTerminalAirport.airportName,
                  cityName: flightDetail.departureTerminalAirport.cityName,
                  countryName: flightDetail.departureTerminalAirport.countryName
                },
                arrivalTerminalAirport: {
                  airportCode: flightDetail.arrivalTerminalAirport.airportCode,
                  airportName: flightDetail.arrivalTerminalAirport.airportName,
                  cityName: flightDetail.arrivalTerminalAirport.cityName,
                  countryName: flightDetail.arrivalTerminalAirport.countryName
                },
                baggage: flightDetail.segmentDetails.baggage,
                flightNumber: flightDetail.flightInfo.flightNumber,
                durationPerLeg: flightDetail.durationPerLeg,
                transitTime: flightDetail.transitTime,
                fare: {
                  amount: totalFare.amount,
                  fareAmount: totalFare.fareAmount,
                  currencyCode: totalFare.currencyCode
                }
              };
            });
          });
        });
      }
  });
  setTimeout(() => {
    this.applyFilter(); 
  }, 200);
  
  }

  applyFilter(): void {
    this.filteredFlightData = this.flightData;

    if (this.selectedAirlines.length > 0) {
      const selectedAirlinesNormalized = this.selectedAirlines.map((name: string) => name.trim().toLowerCase());
      
      this.filteredFlightData = this.filteredFlightData.filter((flightGroup: any) => {
        const airlineName = flightGroup[0]?.flightAirline?.airlineName?.trim().toLowerCase();
        return airlineName && selectedAirlinesNormalized.includes(airlineName);
      });
    }
    
    if (this.selectedStop.length > 0) {
    
      if (this.selectedStop.includes('direct')) {
        this.filteredFlightData = this.filteredFlightData.filter((flight: any) => {
          return flight.length === 1;
        });
      }
      
    
      if (this.selectedStop.includes('oneStop')) {
        this.filteredFlightData = this.filteredFlightData.filter((flight: any) => {
          return flight.length === 2;
        });
      }
      
  
      if (this.selectedStop.includes('twoStop')) {
        this.filteredFlightData = this.filteredFlightData.filter((flight: any) => {
          return flight.length === 3;
        });
      }
    }
  }
  
}
