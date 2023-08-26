import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSource.asObservable();
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {}

  login(model: any){
    return this.http.post<User>(this.baseUrl + "api/account/login", model).pipe(
      map((response: User) => {
        const user = response;
        if (user){
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + "api/account/register", model).pipe(
      map((response: User) => {
        const user = response;
        if (user){
          this.setCurrentUser(user);
        }
      })
    );
  } 

  setCurrentUser(user: User){
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
    this.router.navigate(["/"]);
  }
}