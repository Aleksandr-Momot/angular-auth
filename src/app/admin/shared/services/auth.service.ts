import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { FbAuthResponse, User } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
})
export class AuthService {

    public error$: Subject<string> = new Subject<string>();
    token!: string;

    constructor(private http: HttpClient) {}

    getToken(): void {
        const InDate = localStorage.getItem('fb-token-exp');
        console.log(InDate);
        let expDate;
        if (InDate) {
            const t = JSON.parse(localStorage.get('fb-token-exp'));
            expDate = new Date(t);
            if (new Date() > expDate) {
                this.logout();
            }
        } else {
            expDate = null;
            this.logout();
        }
    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
        .pipe(
            tap(this.setToken),
            catchError(this.handleError.bind(this))
        );
    }

    // tslint:disable-next-line: typedef
    logout() {
        this.setToken(null);
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('fb-token');
        return !!token;
    }

    // tslint:disable-next-line: typedef
    private handleError(error: HttpErrorResponse) {
        const {message} = error.error.error;

        switch (message) {
            case 'INVALID_EMAIl':
                this.error$.next('Ваш Емейл неверный');
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('Ваш Пароль неверный');
                break;
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Вашего Имейла не существует');
                break;
        }
        return throwError(error);
    }

    // tslint:disable-next-line: typedef
    private setToken(response: FbAuthResponse | any) {
       if (response) {
        const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
        localStorage.setItem('fb-token', response.idToken);
        localStorage.setItem('fb-token-exp', expDate.toString());
       } else {
           localStorage.clear();
       }
    }
}


