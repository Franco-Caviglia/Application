import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { NgIf } from '@angular/common';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { AuthService } from './services/security/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    NgIf,
    SidebarComponent,
    HttpClientModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'appFront';

  isLoggin: boolean = false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    if (this.isLoggin == false) {
      if (this.auth.userToken != '') {
        this.isLoggin = true;
      }
    }
  }
}
