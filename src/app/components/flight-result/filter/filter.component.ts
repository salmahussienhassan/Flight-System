import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FlightsService } from './../../../shared/services/flights.service';


import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  airlineFilter:boolean=false
  stopsFilter:boolean=false
airlinesData:any
airlineForm!:FormGroup
stopsForm!:FormGroup
@Output( )selectedStop=new EventEmitter<string[]>()
@Output() selectedAirlines = new EventEmitter<string[]>()

  constructor(private flightsService:FlightsService,private fb: FormBuilder){
  }

  ngOnInit(): void {
    
    this.stopsForm=this.fb.group({
      direct:false,
      oneStop:false,
      twoStop:false
    })

    this.airlineForm = this.fb.group({
      airlines: this.fb.array([]) 
    });
    this.getAirline()
setTimeout(() => {
  this.addAirlineControls();
}, 200);

   
    const openButton = document.querySelector('.open');
    if (openButton) {
      openButton.addEventListener('click', () => {
        const nav = document.querySelector('nav');
        if (nav) {
          nav.style.transition = 'left 0.5s';
          nav.style.left = '0';
        }
      });
    }

    const closeButton = document.querySelector('.fa-xmark');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        const nav = document.querySelector('nav');
        if (nav) {
          nav.style.transition = 'left 1s';
          nav.style.left = '-300px';
        }
      });
    }

  }

  showAirlineFilter() {
    this.airlineFilter = !this.airlineFilter;
  }

  showStopsFilter() {
    this.stopsFilter = !this.stopsFilter;
  }

  getAirline(){
    this.flightsService.getFlightData().subscribe({
      next:(res)=>{
        this.airlinesData=res.airlines

      }
    })
  }

   addAirlineControls(): void {
    
    const airlinesArray = this.airlineForm.get('airlines') as FormArray;
    this.airlinesData?.forEach(() => {
      airlinesArray.push(new FormControl(false)); 
    });
  }

  get airlinesFormArray(): FormArray {
    return this.airlineForm.get('airlines') as FormArray;
  }

  getSelectedAirlines(): string[] {
    return this.airlineForm.value.airlines
      .map((selected: boolean, i: number) => selected ? this.airlinesData[i] : null)
      .filter((airline: string | null) => airline !== null);
  }

  onCheckboxChange(): void {
    const selectedAirlines = this.getSelectedAirlines();
    this.selectedAirlines.emit(selectedAirlines); 
  }

  onCheckboxStopChange(){
    const direct=this.stopsForm.get('direct')?.value
    const oneStop=this.stopsForm.get('oneStop')?.value
    const twoStop=this.stopsForm.get('twoStop')?.value

    const selectedStops=[]

    if(direct){
selectedStops.push('direct')

    }
    if(oneStop){
     selectedStops.push('oneStop')
      
    }
    if(twoStop){
     selectedStops.push('twoStop')
      
    }
    this.selectedStop.emit(selectedStops)
  }
}
