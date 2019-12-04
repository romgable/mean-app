import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ROUTE_PATHS} from './route-paths';

const routes: Routes = [
  {
    path: ROUTE_PATHS.DATA,
    loadChildren: () =>
      import('./data/data.module').then(
        m => m.DataModule
      )
  },
  {
    path: '**',
    redirectTo: ROUTE_PATHS.DATA
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
