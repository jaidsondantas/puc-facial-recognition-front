import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightOptionPipe } from './highlight-option.pipe';

@NgModule({
  declarations: [HighlightOptionPipe],
  imports: [CommonModule],
  exports: [HighlightOptionPipe],
})
export class PipesModule {}
