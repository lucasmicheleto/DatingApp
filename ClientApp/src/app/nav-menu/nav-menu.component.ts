import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  isExpanded = false;
  model: UserLogin;

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { 
    this.model = new UserLogin("","");
  }
  ngOnInit(): void {
    //this.toastr.success('Login', 'Toastr fun!');
  }

  login() {
    this.accountService.login(this.model)
      .subscribe({
        next: (token) => { this.router.navigate(["/members"]); },
        // error: (error) => { this.toastr.error('Credentials Invalid', 'Login');}
      });
  }

  logout() {
    this.accountService.logout();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}

class UserLogin {
  username: string;
  password: string;

  constructor(u: string, p: string){
    this.username = u;
    this.password = p;
  }
}