import { Component } from '@angular/core';

@Component({
  selector: 'app-flight-result',
  templateUrl: './flight-result.component.html',
  styleUrls: ['./flight-result.component.scss']
})
export class FlightResultComponent {
selectedAirlines: string[] = [];
selectedStop:string[]=[]

  onSelectedAirlinesChange(selectedAirlines: string[]): void {
    this.selectedAirlines = selectedAirlines;
  }
  
  onSelectedStopsChange(selectedStop: string[]): void {
    this.selectedStop = selectedStop;
  }
}
