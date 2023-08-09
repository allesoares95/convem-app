import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

const SUCCESS_MESSAGE = 'Você está mais próximo de se juntar ao time!';
const ERROR_MESSAGE = 'Erro';
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
    if (trimmedResponse === 'sim') {
      this.http.get<any>(API_URL, { params: { response: trimmedResponse } })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Error:', error);
            return throwError('Erro');
          }),
          tap((data: any) => {
            this.alertText = data.message === 'success' ? SUCCESS_MESSAGE : ERROR_MESSAGE;
            this.alertVisible = true;
          })
        )
        .subscribe();
    } else {
      this.alertText = ERROR_MESSAGE;
      this.alertVisible = true;
    }
  }
}
