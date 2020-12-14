import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {

  @Input() text: string;
  @Input('value') value;
  @Input('multiline') multiline = false;
  @Output() valueChange = new EventEmitter();
  @Output('onEnter') onEnter: EventEmitter<any> = new EventEmitter();
  @Output('render') render: EventEmitter<any> = new EventEmitter();
  
  constructor() { }
  
  ngOnInit(): void {
  }
  
  onChangeProperty(event) {
    this.valueChange.emit(this.value);
    this.render.emit();
  }
}
