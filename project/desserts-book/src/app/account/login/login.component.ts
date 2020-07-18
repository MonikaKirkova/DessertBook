import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
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
    this.userService.login(form.value)
    .pipe(takeUntil(this.unsubscribe$)).subscribe(
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
