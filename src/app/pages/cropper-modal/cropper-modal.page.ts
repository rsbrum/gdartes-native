import { Component, Input, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cropper-modal',
  templateUrl: './cropper-modal.page.html',
  styleUrls: ['./cropper-modal.page.scss'],
})
export class CropperModalPage implements OnInit {

  @Input() event: string;
  loading;

  constructor(
    public modalController: ModalController,
    public loadingController: LoadingController) { }
  //aspectRatio cropper input
  //change it according to templates dimension	
  async ngOnInit() {
    this.loading = await this.loadingController.create({
      spinner: "lines",
      duration: 0,
      message: 'Carregando',
      translucent: true,
      backdropDismiss: true
    });
    this.loading.present();
    this.imageChangedEvent = this.event;
  }
  
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  imageLoaded(image: HTMLImageElement) {
    this.loading.dismiss();
  }

  cropperReady() {
      // cropper ready
  }

  loadImageFailed() {
      // show message
  }

  dismissModal() {
    this.modalController.dismiss({
      'image': this.croppedImage
    });
  }

}
