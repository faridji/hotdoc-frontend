import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,MatCheckboxModule,MatIconModule,MatListModule,
  MatSidenavModule,MatToolbarModule,MatMenuModule,MatInputModule,
  MatCardModule,MatTabsModule,MatSelectModule,MatDialogModule,
  MatDatepickerModule,MatNativeDateModule,MatTableModule, MatProgressBarModule, MatProgressSpinnerModule, MatPaginatorModule
} from "@angular/material";

import { FlexLayoutModule } from "@angular/flex-layout";
@NgModule({
  declarations: [],
  exports: [
    BrowserAnimationsModule,
    FlexLayoutModule,

    MatButtonModule,MatCheckboxModule,MatIconModule,MatListModule,
    MatSidenavModule,MatToolbarModule,MatMenuModule,MatInputModule,
    MatCardModule,MatTabsModule,MatSelectModule,MatDialogModule,
    MatDatepickerModule,MatNativeDateModule,MatTableModule, MatPaginatorModule ,MatProgressBarModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {}
