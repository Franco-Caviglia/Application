import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../../services/security/auth.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  alertSection() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      iconColor: 'blue',
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });

    (async () => {
      await Toast.fire({
        icon: 'info',
        title: 'La sección no está disponible',
      });
    })();
  }

  logout() {
    this.authService.logOut();
  }
}
