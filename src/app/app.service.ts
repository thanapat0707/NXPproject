import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class AppService {

  private codeURL = 'http://localhost:8000/api/testcode';

  constructor(private http: HttpClient) {}

  startCounter() {
    const url = this.codeURL + '/startCounter';
    console.log('startCounter');
    return this.http.get(url);
  }
  stopCounter() {
    const url = this.codeURL + '/stopCounter';
    console.log('stopCounter');
    return this.http.put(url, {});
  }

}


