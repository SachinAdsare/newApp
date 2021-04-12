import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllComponent} from './component/all/all.component';
import {SavedMatchesComponent} from './component/saved-matches/saved-matches.component';

const routes: Routes = [
  { path: '', component: AllComponent },
  { path: 'saved', component: SavedMatchesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
