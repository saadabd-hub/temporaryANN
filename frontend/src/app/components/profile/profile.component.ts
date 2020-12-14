import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // loading = false;
  // user: User;
  // userFromApi: User;

  constructor(
        private userService: UserService,
        private authenticationService: AuthService) { }

  ngOnInit(): void {

}
}
