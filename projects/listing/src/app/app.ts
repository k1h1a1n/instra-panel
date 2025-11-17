import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
@Component({
  selector: 'listing-app-root',
  imports: [RouterOutlet , MatCheckboxModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class ListingApp {
  protected readonly title = signal('listing');
}
