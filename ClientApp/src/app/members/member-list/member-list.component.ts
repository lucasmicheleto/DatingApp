import { Component } from '@angular/core';
import { Member } from '../member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {
  public members: Member[] = [];

  constructor(private membersService: MembersService) {
    this.membersService.getMembers().subscribe({
      next: res => this.members = res
    })
  }
}
