import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './components/menu/menu.component';
import {MaterialModule} from '../material/material.module';
import {LayoutComponent} from './components/layout/layout.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {Constants} from './services/constants.service';

const COMPONENTS = [MenuComponent, LayoutComponent];

@NgModule({
  declarations: COMPONENTS,
  providers: [Constants],
  imports: [CommonModule, SharedModule, RouterModule, MaterialModule],
  exports: [COMPONENTS]
})
export class CoreModule {}
