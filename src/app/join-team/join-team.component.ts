import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const SUCCESS_MESSAGE = 'Você está mais próximo de se juntar ao time!';
const ERROR_MESSAGE = 'Error';
const API_URL = 'http://localhost:3000/api/check-response';

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.css']
})

export class JoinTeamComponent {
  response: string = '';
  alertVisible: boolean = false;
  alertText: string = '';

  constructor(private http: HttpClient) {}

  sendResponse() {
    const trimmedResponse = this.response.trim().toLowerCase();
      this.http.post<any>(API_URL,  { response: trimmedResponse } )
        .pipe(
          catchError((error: HttpErrorResponse): Observable<any> => {
            console.error('Error:', error);
            this.alertText = ERROR_MESSAGE;
            this.alertVisible = true;
            return throwError(() => new Error('Error : '));
          }),
          tap((data: any) => {
            this.alertText = SUCCESS_MESSAGE;
            this.alertVisible = true;
          })
        )
        .subscribe();
  }
}
