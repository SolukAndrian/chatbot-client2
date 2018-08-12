import {NgModule} from '@angular/core';
import {UserInfoComponent} from './user-info.component';
import {UserInfoService} from './user-info.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {path: 'user-info', component: UserInfoComponent}
    ])
  ],
  exports: [UserInfoComponent],
  declarations: [
    UserInfoComponent
  ],
  providers: [
    UserInfoService
  ],
})
export class UserInfoModule {
}
