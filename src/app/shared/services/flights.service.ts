import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  constructor(private httpClient: HttpClient) {}

  getFlightData(): Observable<any> {
    return this.httpClient.get('../../../assets/response.json'); 
  }


  
}
