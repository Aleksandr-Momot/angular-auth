import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../../interfaces';
import { AuthService } from '../shared/services/auth.service';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean | undefined;
  message: string | undefined;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  )
  {

  }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.route.queryParams.subscribe( (params: Params) => {
      // tslint:disable-next-line: no-string-literal
      if (params['loginAgain']) {
        this.message = 'Введите данные для входа';
      // tslint:disable-next-line: no-string-literal
      } else if (params ['authFailed']) {
        this.message = 'Время сессии вышло, попробуйте снова';
      }
    });


    this.form = new FormGroup( {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  // tslint:disable-next-line: typedef
  submit() {
    if (this.form.invalid) {
      return;
    }
    console.log('Form Submit');
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    // tslint:disable-next-line: deprecation
    this.auth.login(user).subscribe( () => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    // tslint:disable-next-line: no-unused-expression
    }), () => {
      this.submitted = false;
    };
  }

}
