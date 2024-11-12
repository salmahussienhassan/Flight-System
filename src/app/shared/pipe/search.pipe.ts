import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data: any[], searchWord: string): any[] {
    if (!data) return [];
  
    const lowerCaseSearchWord = searchWord.toLowerCase();
  
    return data.filter(itemArray => {
      return itemArray.some((firstItem: any) => {
        const departureAirportName = firstItem?.departureTerminalAirport?.airportName?.toLowerCase() || '';
        const arrivalAirportName = firstItem?.arrivalTerminalAirport?.airportName?.toLowerCase() || '';
        
        return (
          departureAirportName.includes(lowerCaseSearchWord) ||
          arrivalAirportName.includes(lowerCaseSearchWord)
        );
      });
    });
  }
  
}
