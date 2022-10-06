import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, tap, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/interface';
import { Usuario } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : String = environment.baseUrl;
  private _usuario!: Usuario

  constructor( private http: HttpClient ) { }

  get usuario(){
    return {...this._usuario}
  }

  login(email: string, password: string){
    
    const url  = `${ this.baseUrl }/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if(resp.ok){
            localStorage.setItem('token',resp.token!);
            this._usuario ={
              name: resp.name!,
              uid: resp.uid!,
              email: resp.email!
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))            
      );    
  }
  
  validarToken(): Observable<boolean> {

    const url = `${ this.baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map( resp => {
          console.log(resp.token);
          localStorage.setItem('token', resp.token! );
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!
          }

          return resp.ok;
        }) ,
        catchError( err => of(false) )
      );
  }
}
