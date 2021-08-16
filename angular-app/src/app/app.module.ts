import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    RouterModule.forRoot([{
        path: "tasks",
        loadChildren: () => import("./tasks/task.module").then(m => m.TaskModule)
      }, {
        path: "users",
        loadChildren: () => import("./users/user.module").then(m => m.UserModule)
      }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
