import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-button',
  templateUrl: './sub-button.component.html',
  styleUrls: ['./sub-button.component.scss'],
})
export class SubButtonComponent implements OnInit {
  @Input()
  text: string;

  constructor() { }

  ngOnInit(): void {
  }


}
