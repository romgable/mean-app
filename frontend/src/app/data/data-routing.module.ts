import {NgModule} from '@angular/core';
import {DataListComponent} from './components/list/data-list.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    outlet: 'content-outlet',
    component: DataListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule {}
