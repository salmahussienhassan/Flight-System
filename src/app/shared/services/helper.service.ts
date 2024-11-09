import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }
  kwdToEgp = 60;
  
  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }

  timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  calculateTimeDifference(deptTime: string, landTime: string): string {
    const deptMinutes = this.timeToMinutes(deptTime);
    const landMinutes = this.timeToMinutes(landTime);
    const diffMinutes = landMinutes - deptMinutes;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${this.padZero(hours)}h ${this.padZero(minutes)}m`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  calculateTotalPriceInEGP(item: any): number {
    let totalPriceKWD = 0;
    if (item.fare) {
        if (item.fare.currencyCode === 'KWD' && item.fare.amount > 0) {
            totalPriceKWD += item.fare.amount;
        }
    } 
    return totalPriceKWD * this.kwdToEgp;
}
}
