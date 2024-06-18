import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  sharedData = signal<string>('');
}
