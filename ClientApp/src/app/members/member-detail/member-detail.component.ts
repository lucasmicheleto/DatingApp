import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MembersService } from "../../services/members.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member!: Member;

  constructor(private membersService: MembersService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.loadMember();
  }
  loadMember(){
    console.log(this.route.snapshot.params);
    this.membersService.getMember(this.route.snapshot.params.username).subscribe({
      next: (member: Member) => this.member = member
    })
  }
}

