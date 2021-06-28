import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpService {
  constructor(public http: HttpClient) {}

  get<R = any>(
    path: string,
    condition: { [params: string]: any } = {},
    getRidNull = false
  ) {
    let payload: any;
    if (getRidNull) {
      payload = {};
      Object.entries(condition).forEach(([key, value]) => {
        if (value !== null) {
          payload[key] = value;
        }
      });
    } else {
      payload = { ...condition };
    }
    const params = new HttpParams({ fromObject: payload });
    return this.http
      .get<R>(`${environment.baseUrl}${path}`, { params })
      .pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }
}
