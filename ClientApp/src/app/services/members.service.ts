import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Member } from '../members/member';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl + 'api/users');
  }

  getMember(username: string){
    return this.http.get<Member>(this.baseUrl + 'api/users/'+username);
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl + "api/users", member);
  }


  getHttpOptions(){
    var rawUser = localStorage.getItem("user");
    if (rawUser && rawUser.length > 0) {
      var user : User = JSON.parse(rawUser);
      return {
        headers: new HttpHeaders({
          Authorization: "Bearer "+user.token
        })
      };
    }
    return {
      headers: new HttpHeaders({
      })
    };
  }
}
