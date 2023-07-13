import { Component, OnInit  } from '@angular/core';
import { AccountService } from './services/account.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private accountService: AccountService) { }
  
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    var rawUser = localStorage.getItem("user");
    if (rawUser && rawUser.length > 0) {
      var user : User = JSON.parse(rawUser);
      this.accountService.setCurrentUser(user);
    }
  }
}
