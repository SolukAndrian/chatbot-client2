import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {RegistrationService} from "./registration.service";
import {RegistrationComponent} from "./registration.component";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {path: 'register', component: RegistrationComponent}
    ])
  ],
  exports: [],
  declarations: [
    RegistrationComponent
  ],
  providers: [
    RegistrationService
  ],
})
export class RegistrationModule {
}
