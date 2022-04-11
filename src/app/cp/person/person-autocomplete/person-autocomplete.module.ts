import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PipesModule } from './../../../../cdk/pipes/pipes.module';
import { PersonAutocompleteComponent } from './person-autocomplete.component';

@NgModule({
  declarations: [PersonAutocompleteComponent],
  exports: [PersonAutocompleteComponent],
  imports: [
    CommonModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    PipesModule,
    HttpClientModule,
    MatIconModule,
  ],
})
export class PersonAutocompleteModule {}
