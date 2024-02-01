import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number = 1;
  color: string = "";
}
