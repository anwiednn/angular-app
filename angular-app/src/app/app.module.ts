import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMomentDateModule,
    RouterModule.forRoot([{
        path: "tasks",
        loadChildren: () => import("./tasks/task.module").then(m => m.TaskModule)
      }, {
        path: "users",
        loadChildren: () => import("./users/user.module").then(m => m.UserModule)
      }, {
        path: "**",
        redirectTo: "/tasks"
    }])
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
