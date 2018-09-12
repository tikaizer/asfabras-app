import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  
  private urlService: string;
  
  constructor() {
    
    //this.urlService = 'http://redehiperfarma.ddns.net:8000/';
    this.urlService = 'http://localhost:8000/';
   }

   getUrlService(): string {

    return this.urlService;
}
}