import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { MaterialModule } from './material-components/material-components.module';
import { MainModule } from "./main/main.module";
import { MembershipModule } from "./membership/membership.module";
import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { HotDocApiService } from './shared/services/data.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    SharedModule,
    MainModule,
    MembershipModule,
    MaterialModule,
    RouterModule.forRoot([]),

  ],
  providers: [HotDocApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
