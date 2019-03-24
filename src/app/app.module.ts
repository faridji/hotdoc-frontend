import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { MaterialModule } from './material-components/material-components.module';
import { MainModule } from "./main/main.module";
import { MembershipModule } from "./membership/membership.module";
import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,

    MainModule,
    MembershipModule,
    MaterialModule,
    RouterModule.forRoot([]),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
