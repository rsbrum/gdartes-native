import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CroppieComponent } from './components/croppie/croppie.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { LoadImageComponent } from './components/load-image/load-image.component';
import { SubButtonComponent } from './components/sub-button/sub-button.component';
@NgModule({
 imports:      [ CommonModule ],
 declarations: [ ToolbarComponent, CroppieComponent, TextInputComponent, LoadImageComponent, SubButtonComponent],
 exports:      [ ToolbarComponent, CroppieComponent, TextInputComponent, LoadImageComponent, SubButtonComponent, CommonModule, FormsModule ]
})
export class SharedModule { }