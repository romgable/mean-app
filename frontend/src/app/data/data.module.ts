import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataListComponent} from './components/list/data-list.component';
import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';
import {DataRoutingModule} from './data-routing.module';
import {MaterialModule} from '../material/material.module';
import {DataService} from './services/data.service';

const COMPONENTS = [DataListComponent];

const SERVICES = [DataService];

@NgModule({
  declarations: COMPONENTS,
  providers: SERVICES,
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    MaterialModule,
    DataRoutingModule
  ],
  exports: COMPONENTS
})
export class DataModule {}
