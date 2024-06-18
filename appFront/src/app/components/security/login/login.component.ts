import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../services/security/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { LoginDto } from '../../../services/model/login';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { RegisterDto } from '../../../services/model/register';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  hide: boolean = true;
  loginFormView: boolean = true;
  loginReq: LoginDto = new LoginDto();
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  errorMessage = signal('');

  constructor(private authService: AuthService, private router: Router) {
    merge(
      this.email.statusChanges,
      this.email.valueChanges,
      this.password.statusChanges,
      this.password.valueChanges,
      this.name.valueChanges,
      this.name.statusChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Debes ingresar el email');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('No es un email válido');
    } else if (this.password.hasError('required')) {
      this.errorMessage.set('Debes ingresar la contraseña');
    } else if (this.password.hasError('minLength')) {
      this.errorMessage.set('La contraseña debe al menos 8 caracteres');
    } else if (this.name.hasError('required')) {
      this.errorMessage.set('Debes ingresar el nombre');
    } else {
      this.errorMessage.set('');
    }
  }

  login() {
    if (this.email.value && this.password.value) {
      this.loginReq.email = this.email.value;
      this.loginReq.password = this.password.value;

      this.authService.login(this.loginReq).subscribe({
        next: (userData) => {},
        error: (errorData) => {
          this.errorMessage = errorData.error.message;
        },
        complete: () => {
          if (sessionStorage.getItem('success') == 'true') {
            this.router.navigateByUrl('/monitorGlobal');
            window.location.reload();
          }
        },
      });
    } else {
      alert('Error al ingresar los datos!');
    }
  }

  registerReq: RegisterDto = new RegisterDto();

  register() {
    if (this.email.value && this.name.value && this.password.value) {
      this.registerReq.name = this.name.value;
      this.registerReq.email = this.email.value;
      this.registerReq.password = this.password.value;

      this.authService.register(this.registerReq).subscribe((response) => {
        if (response.numOfErrors > 0) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            iconColor: 'red',
            customClass: {
              popup: 'colored-toast',
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });

          (async () => {
            await Toast.fire({
              icon: 'info',
              title: response.message,
            });
          })();
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            iconColor: 'green',
            customClass: {
              popup: 'colored-toast',
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });

          (async () => {
            await Toast.fire({
              icon: 'success',
              title: response.message,
            });
          })();

          this.loginFormView = true;
        }
      });
    }
  }

  clickEvent() {
    this.hide = !this.hide;
  }
}
