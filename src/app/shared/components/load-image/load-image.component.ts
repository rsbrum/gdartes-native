import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CroppieComponent } from '../croppie/croppie.component';
import { ModalController } from '@ionic/angular';
import { CropperModalPage } from '../../../pages/cropper-modal/cropper-modal.page';

@Component({
  selector: 'app-load-image',
  templateUrl: './load-image.component.html',
  styleUrls: ['./load-image.component.scss'],
})
export class LoadImageComponent implements OnInit {

  @Input() text: string;
  @Input() width: number;
  @Input() height: number;
  @Input() croppie: CroppieComponent;
  @Input() value: string;
  @Input() preset: boolean;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @Output('render') render: EventEmitter<any> = new EventEmitter();
  @ViewChild('input') inputElement: ElementRef;
  @ViewChild('thumbnail') thumbnailElement: ElementRef;

  mainActionDesc: string = 'Carregar';
  isImageLoaded: boolean = false;
  image: File = null;
  points: any = null;
  orientation: number = 0;

  constructor(public modalController: ModalController) { }

  ngOnInit(): void {
  }

  async presentCropperModal(event) {
    const modal = await this.modalController.create({
      component: CropperModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'event': event
      }
    });
    
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.onFinishCropping(data.image)
  }

  ngAfterViewInit() {
    if (this.preset && this.value != '') {
      this.setThumbnail(this.value.split('base64:')[1])
    } else {
      this.thumbnailElement.nativeElement.src = "/assets/img/image_icon.png"
    }
  }

  mainAction(event) {
    if (!this.isImageLoaded) {
      return;
    }

    event.preventDefault();
  }

  onChange(event) { 
    this.presentCropperModal(event);
    
    //this.openCropImage();
  }

  onFinishCropping(base64) {
    this.value = 'base64:' + base64
    this.valueChange.emit(this.value)
    this.isImageLoaded = true
    this.mainActionDesc = 'Cortar'
    this.setThumbnail(base64);
    this.render.emit();
  }

  setThumbnail(base64) {
    this.thumbnailElement.nativeElement.src = base64
    this.thumbnailElement.nativeElement.style.filter = 'none'
  }

  clear() {
    this.value = null
    this.valueChange.emit(this.value)
    this.inputElement.nativeElement.value = ''
    this.isImageLoaded = false
    this.mainActionDesc = 'Carregar'
    this.thumbnailElement.nativeElement.src = "/assets/img/image_icon.png"
    this.thumbnailElement.nativeElement.style.filter = ''
    this.render.emit();
  }

}
