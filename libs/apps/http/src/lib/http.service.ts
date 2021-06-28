import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpService {
  constructor(public http: HttpClient) {}

  get<R = any>(path: string, condition: { [params: string]: any } = {}) {
    const payload = condition;
    const params = new HttpParams({ fromObject: payload });
    return this.http
      .get<R>(`${environment.apiBaseUrl}${path}`, { params })
      .pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  post<R = any>(path: string, body: any) {
    return this.http.post<R>(`${environment.apiBaseUrl}${path}`, body).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }

  postFormData<R = any>(path: string, formData: FormData) {
    return this.http.post<R>(`${environment.apiBaseUrl}${path}`, formData).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }

  put<R = any>(path: string, body: any) {
    return this.http.put<R>(`${environment.apiBaseUrl}${path}`, body);
  }

  patch<R = any>(path: string, body: any) {
    return this.http.patch<R>(`${environment.apiBaseUrl}${path}`, body);
  }

  delete<R = any>(path: string, payload?: any) {
    if (!payload) {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: payload,
      };
      return this.http.delete<R>(`${environment.apiBaseUrl}${path}`, options);
    } else {
      return this.http.delete<R>(`${environment.apiBaseUrl}${path}`);
    }
  }

  /**
   * สร้าง object เงื่อนไขใหม่ที่ value ของ properties ไม่ null
   * @param condition เงื่อนไข
   * @returns object ที่ถูก clone ที่ properties ไม่ null
   */
  purifyNotNull(condition: { [params: string]: any }) {
    const payload: { [params: string]: any } = {};
    Object.entries(condition).forEach(([key, value]) => {
      if (value !== null) {
        payload[key] = value;
      }
    });
    return payload;
  }
}
