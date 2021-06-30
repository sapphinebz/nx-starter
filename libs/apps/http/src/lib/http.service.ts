import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpService {
  get apiBaseUrl() {
    if (!this.environment) {
      return '';
    }
    return this.environment.apiBaseUrl ?? '';
  }

  constructor(
    public http: HttpClient,
    @Inject('environment') private environment: any
  ) {}

  get<R = any>(path: string, condition: { [params: string]: any } = {}) {
    const payload = condition;
    const params = new HttpParams({ fromObject: payload });
    return this.http
      .get<R>(`${this.apiBaseUrl}${path}`, { params })
      .pipe(
        catchError((err) => {
          console.error(err);
          return EMPTY;
        })
      );
  }

  post<R = any>(path: string, body: any) {
    return this.http.post<R>(`${this.apiBaseUrl}${path}`, body).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }

  postFormData<R = any>(path: string, formData: FormData) {
    return this.http.post<R>(`${this.apiBaseUrl}${path}`, formData).pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    );
  }

  put<R = any>(path: string, body: any) {
    return this.http.put<R>(`${this.apiBaseUrl}${path}`, body);
  }

  patch<R = any>(path: string, body: any) {
    return this.http.patch<R>(`${this.apiBaseUrl}${path}`, body);
  }

  delete<R = any>(path: string, payload?: any) {
    if (!payload) {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: payload,
      };
      return this.http.delete<R>(`${this.apiBaseUrl}${path}`, options);
    } else {
      return this.http.delete<R>(`${this.apiBaseUrl}${path}`);
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
