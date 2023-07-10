import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter<boolean>();
  model: any = {};

  constructor(private accountService: AccountService) { }
  
  register() {
    this.accountService.register(this.model).subscribe({
      next: (user) => { },
      error: (error) => { console.error(error); },
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
