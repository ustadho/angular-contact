import { MessageService } from './../message.service';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactUrl = environment.apiUrl + 'contacts';
  httpOPtions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getContacts(colName: string, direction: string): Observable<Contact[]> {
    const url = this.contactUrl + `?filter[order]=${colName} ${direction}`;
    return this.http
      .get<Contact[]>(url)
      .pipe(
        tap(_ => this.log('fetches contacts')),
        catchError(this.handleError<Contact[]>('getContacts', []))
      );

  }

  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(this.contactUrl + '/' + id)
      .pipe(
        tap(_ => this.log('get contact id: ' + id)),
        catchError(this.handleError<Contact>('getContact', null))
      );
  }

  save(c: Contact) {
    if (c.id !== null) {
      return this.http.put(this.contactUrl + '/' + c.id, c)
        .pipe(
          tap(_ => this.log('Save contact id : ' + c.id)),
          catchError(this.handleError<Contact>('saveContact', null))
        );
    } else {
      // If we post c (instance of Contact) the error 422 will occure
      // https://www.keycdn.com/support/422-unprocessable-entity
      const data = {
        fullName: c.fullName,
        phoneNumber: c.phoneNumber,
        address: c.address
      }
      return this.http.post(this.contactUrl, data)
        .pipe(
          tap(_ => this.log('Save contact id : ' + c.id)),
          catchError(this.handleError<Contact>('saveContact', null))
        );
    }
  }

  delete(id: number) {
    return this.http.delete(this.contactUrl + '/' + id)
      .pipe(
        tap(_ => this.log('Delete : ' + id)),
        catchError(this.handleError<Contact>('deleteContact', null))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
