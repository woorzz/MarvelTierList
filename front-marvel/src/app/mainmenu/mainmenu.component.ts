import { Component } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrl: './mainmenu.component.scss'
})
export class MainmenuComponent {
  constructor(private router: Router) { }

  goToPage() {
    this.router.navigate(['/tierlist']);
  }
    
}

// app.component.ts


