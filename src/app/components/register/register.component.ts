import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // Check auth state
    this.authService.checkAuth().subscribe(auth => {
      if (auth) this.router.navigate(['/panel']);
    });
  }

  onSubmit() {
    this.authService.register(this.email, this.password)
    .then(user => {
      this.router.navigate(['/panel']);
      this.flashMessage.show('Registration completed successfully', {
        cssClass: 'alert-success',
        showCloseBtn: true,
        closeOnClick: true,
        timeout: 10000
      });
    })
    .catch(err => {
      this.flashMessage.show(err.message, {
        cssClass: 'alert-danger',
        showCloseBtn: true,
        closeOnClick: true,
        timeout: 10000
      });
    });
  }

}
