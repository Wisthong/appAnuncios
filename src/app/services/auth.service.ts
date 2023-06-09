import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseAuth, User } from '../model/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

  private _usuario!: User;

  //TODO: Metodo del servicio lo utilizo para luego llamarlo en el dashboar
  get usuario() {
    return { ...this._usuario };
  }

  //TODO: Este servicio, login lo tengo como un observable string ya que la respuesta retorna un string, hice uso de pipe para poder mapear esa respuesta a un string
  login(email: string, password: string): Observable<string> {
    const body = {
      email,
      password,
    };
    return this.http
      .post<ResponseAuth>(this.apiUrl + '/users/login', body)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('token', token);
        }),
        map(({ token }) => {
          const { role } = JSON.parse(atob(token.split('.')[1])) as User;
          return role!.toString();
        })
      );
  }

  //TODO: Este servicio, register lo tengo como un observable string ya que la respuesta retorna un string, hice uso de pipe para poder mapear esa respuesta a un string
  register(user: User): Observable<string> {
    return this.http
      .post<ResponseAuth>(this.apiUrl + '/users/register', user)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('token', token);
        }),
        map(({ message }) => {
          return message;
        })
      );
  }

  validarToken(): Observable<boolean> {
    return this.http.get<ResponseAuth>(this.apiUrl + '/users/renew').pipe(
      map(({ ok, token }) => {
        localStorage.setItem('token', token);
        const { email, lastname, role, name } = JSON.parse(
          atob(token.split('.')[1])
        ) as User;
        this._usuario = {
          email,
          lastname,
          name,
          role,
        };

        if (role === 'admin') {
          return ok;
        } else {
          return false;
        }
        // return ok;
      }),
      catchError(() => of(false))
    );
  }

  validarMaster(): Observable<boolean> {
    return this.http.get<ResponseAuth>(this.apiUrl + '/users/renew').pipe(
      map(({ ok, token }) => {
        localStorage.setItem('token', token);
        const { email, lastname, role, name } = JSON.parse(
          atob(token.split('.')[1])
        ) as User;
        this._usuario = {
          email,
          lastname,
          name,
          role,
        };

        if (role === 'master') {
          return ok;
        } else {
          return false;
        }
        // return ok;
      }),
      catchError(() => of(false))
    );
  }

  verifyToken(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.clear();
  }
}
