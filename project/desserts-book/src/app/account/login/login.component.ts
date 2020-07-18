import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public errorMes: string;

  constructor(protected userService: UserService, private route: Router) { }

  ngOnInit() {
  }

  public onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.route.navigateByUrl('personalAccount');
      },
      err => {
        this.errorMes = err.error.message;
      }
    );
  }

}
