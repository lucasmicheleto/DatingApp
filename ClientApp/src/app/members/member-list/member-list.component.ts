import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MembersService } from 'src/app/services/members.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  public members$!: Observable<Member[]>;

  constructor(private membersService: MembersService) {
  }
  ngOnInit(): void {
    this.members$ = this.membersService.getMembers();
  }
}
