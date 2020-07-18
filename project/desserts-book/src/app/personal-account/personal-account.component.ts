import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Subscriber } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.scss']
})
export class PersonalAccountComponent implements OnInit {

  public userDetails;
  constructor(private userService: UserService, private route: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);
      }
    );
  }

  public onLogOut() {
    this.userService.deleteToken();
    this.route.navigateByUrl('account/login');
  }

}
