import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MainmenuComponent} from "./mainmenu/mainmenu.component";
import {TierlistComponent} from "./tierlist/tierlist.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"mainmenu",
    component:MainmenuComponent
  },
  {
    path:"tierlist",
    component:TierlistComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
