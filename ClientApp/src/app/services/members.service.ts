import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Member } from '../members/member';
import { User } from '../models/user';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  members: Member[] = [];
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getMembers(){
    return this.members.length > 0 ? 
    of(this.members) : 
    this.http.get<Member[]>(this.baseUrl + 'api/users')
    .pipe(map(members => {
      this.members = members;
      return members;
    }));
  }

  getMember(username: string){
    const member = this.members.find(x => x.userName === username);
    return member ? of(member) : this.http.get<Member>(this.baseUrl + 'api/users/'+username);
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl + "api/users", member)
      .pipe(map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member };
      }));
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + "api/users/set-main-photo/"+ photoId, null);
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
