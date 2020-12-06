import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
 imports:      [ CommonModule ],
 declarations: [ ToolbarComponent],
 exports:      [ ToolbarComponent, CommonModule, FormsModule ]
})
export class SharedModule { }