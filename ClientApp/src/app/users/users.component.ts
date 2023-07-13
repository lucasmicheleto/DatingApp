import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member } from '../members/member';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  public members: Member[] = [];

  constructor(private membersService: MembersService) {
    this.membersService.getMembers().subscribe({
      next: res => this.members = res
    })
  }
}