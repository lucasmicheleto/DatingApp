import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from '../member';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild("formEdit") formEdit!: NgForm;
  @HostListener("window:beforeunload", ["$event"]) unloadNotification($event:any){
    if(this.formEdit?.dirty){
      $event.returnValue = true;
    }
  }
  member!: Member;
  user!: User;

  constructor(private accountService: AccountService, 
    private membersService: MembersService,
    private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.user = user;
        }
      }
    })
  }
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if (!this.user) return;
    this.membersService.getMember(this.user.username).subscribe({
      next: (member: Member) => this.member = member
    })
  }

  updateMember() {
    this.membersService.updateMember(this.formEdit?.value).subscribe({
      next: _ => this.toastr.success("Profile updated successfully"),
      error: error => this.toastr.error("Unable to update the user")
    })
    
    this.formEdit.reset(this.member);
  }
}
