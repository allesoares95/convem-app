import { TestBed, ComponentFixture } from '@angular/core/testing';
import { JoinTeamComponent } from './join-team.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('JoinTeamComponent', () => {
  let component: JoinTeamComponent;
  let fixture: ComponentFixture<JoinTeamComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [JoinTeamComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinTeamComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should set alertText to "Você está mais próximo de se juntar ao time!" when response is "sim" and API returns success', () => {
    const mockResponse = { message: 'success' };
    const trimmedResponse = 'sim';

    spyOn(httpClient, 'post').and.returnValue(of(mockResponse));

    component.response = trimmedResponse;
    component.sendResponse();

    expect(httpClient.post).toHaveBeenCalledWith('http://localhost:3000/api/check-response', { response: trimmedResponse });
    expect(component.alertText).toBe('Você está mais próximo de se juntar ao time!');
    expect(component.alertVisible).toBe(true);
  });
});
