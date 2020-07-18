import { Component, OnInit, NgModule } from '@angular/core';
import { UserService} from '../../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],

})
export class SigninComponent implements OnInit {
  public errorMes: string;

  constructor(protected userService: UserService, private route: Router) { }

  ngOnInit() {
  }

  public onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
      this.resetForm(form);
      this.route.navigateByUrl('account/login')
    },
    err => {
      this.errorMes = 'Something went wrong';
    }
    );
  }

  public resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: '',
      recipeNames: []
    }
    form.resetForm();
    this.errorMes = '';
  }

}
