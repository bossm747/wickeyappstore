import { Subscription } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
// import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiConnectionService {
  private person_url = 'https://api.wickeyappstore.com/person/update/';
  private person_recover_token_url = 'https://api.wickeyappstore.com/person/recovery/token/';
  private person_recover_verify_url = 'https://api.wickeyappstore.com/person/recovery/verify/';
  private app_url = 'https://api.wickeyappstore.com/apps/';

  constructor(
    private http: HttpClient
  ) { }

  // THE OBSERVABLE WAY //
  private handleError (error: HttpErrorResponse) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    console.log('WASAPI: handleError', error);
    if (error.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      // http://stackoverflow.com/questions/39571231/how-to-check-whether-user-has-internet-connection-or-not-in-angular2
      if (navigator.onLine) {
        errMsg = `${error.status} - ${error.statusText || ''} ${error.error.message}`;
      } else {
        errMsg = 'There is no Internet connection.';
      }
    } else {
      // The backend returned an unsuccessful response code.
      // {"error": {"message": string, code: number}} // where code is a http status code as-well as an internal error code.
      errMsg = error.message ? error.error.error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
  private extractData(res: any) {
    // console.log('WASAPI: extractData', res);
    const body = res.data;
    // Add http status to body //
    body.status = res.status;
    if (body.settings) {
      if (body.settings.price_list && typeof body.settings.price_list === 'string') {
        // PARSE this json, it is a json string
        body.settings.price_list = JSON.parse(body.settings.price_list);
      }
    }
    return body;
  }

  encode_query_string(_obj): string {
    // http://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
    const q_str = [];
    for (const _p in _obj) {
      if (_obj.hasOwnProperty(_p)) {
        q_str.push(encodeURIComponent(_p) + '=' + encodeURIComponent(_obj[_p]));
      }
    }
    return q_str.join('&');
  }

  // Returns app store apps {name: string, category: number, ordering: number}
  getApps(_params?: any): Observable<[any]> {
    const _query_string = this.encode_query_string(_params);
    console.log('WASAPI: getApps', _query_string);
    return this.http.get(`${this.app_url}/?${_query_string}`)
          .map((res: any) => {
            return this.extractData(res).apps;
          }).catch(this.handleError);
  }

  // Creates or updates person, returns person info
  // person info also includes inapps and app settings
  createPerson(apiobject: any): Observable<any> {
    return this.http.post(this.person_url, apiobject)
               .map(this.extractData)
               .catch(this.handleError);
  }
  // Sends the email a recovery token
  tokenPerson(email: string): Observable<any> {
    return this.http.post(this.person_recover_token_url, {email: email})
               .map(this.extractData)
               .catch(this.handleError);
  }
  // Verify the recovery token
  verifyPerson(email: string, verification_token: string, version: number): Observable<any> {
    return this.http.post(this.person_recover_verify_url,
      {email: email, verification_token: verification_token, version: version})
               .map(this.extractData)
               .catch(this.handleError);
  }

}
