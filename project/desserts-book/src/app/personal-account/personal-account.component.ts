import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscriber, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.scss']
})
export class PersonalAccountComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  public userDetails;
  constructor(private userService: UserService, private route: Router) { }

  public ngOnInit() {
    this.userService.getUserProfile()
    .pipe(takeUntil(this.unsubscribe$)).subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);
      }
    );
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onLogOut() {
    this.userService.deleteToken();
    this.route.navigateByUrl('account/login');
  }

}
