import { Component, OnInit, NgModule, OnDestroy } from '@angular/core';
import { UserService} from '../../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],

})
export class SigninComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  public errorMes: string;

  constructor(protected userService: UserService, private route: Router) { }

  public ngOnInit() {
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onSubmit(form: NgForm) {
    this.userService.postUser(form.value)
    .pipe(takeUntil(this.unsubscribe$)).subscribe(
      res => {
      this.resetForm(form);
      this.route.navigateByUrl('account/login');
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
    };
    form.resetForm();
    this.errorMes = '';
  }

}
