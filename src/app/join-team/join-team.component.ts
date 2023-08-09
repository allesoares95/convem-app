import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
      this.http.post<any>('http://localhost:3000/api/check-response', { response: trimmedResponse })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Error:', error);
            return throwError('Erro');
          })
        )
        .subscribe(
          (data: any) => {
            if (data.message === 'success') {
              this.alertText = 'Você está mais próximo de se juntar ao time!';
            } else {
              this.alertText = 'Erro';
            }
            this.alertVisible = true;
          }
        );
    } else {
      this.alertText = 'Erro';
      this.alertVisible = true;
    }
  }
}
