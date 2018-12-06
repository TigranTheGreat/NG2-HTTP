import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(private http: Http) { }

  storeServers(servers: any[]) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.put('https://udemy-ng-http-db580.firebaseio.com/servers.json', servers, { headers: headers });
  }

  getServers() {
    return this.http.get('https://udemy-ng-http-db580.firebaseio.com/servers')
      .pipe(
        map((response: Response) : any[] => {
          let data = response.json();
          for (let server of data) {
            server.name = `FETCHED_${server.name}`;
          }

          return data;
        }),
        catchError((error: Response) => {
          return throwError('Something went wrong!');
        })
      );
  }

  getAppName() {
    return this.http.get('https://udemy-ng-http-db580.firebaseio.com/appName.json')
      .pipe(
        map(
          (response: Response) => {
            return response.json();
          }
        )
      );
  }
}
