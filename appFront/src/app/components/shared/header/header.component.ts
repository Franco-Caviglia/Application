import { Component, inject } from '@angular/core';
import { SharedDataService } from '../../../services/components/shared-data.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private headerService = inject(SharedDataService);

  username: string | null = sessionStorage.getItem('username');

  header = this.headerService.sharedData;

  constructor() {}
}
