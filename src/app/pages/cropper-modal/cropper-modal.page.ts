import { Component, Input, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { LoadingController, ModalController } from '@ionic/angular';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-cropper-modal',
  templateUrl: './cropper-modal.page.html',
  styleUrls: ['./cropper-modal.page.scss'],
})
export class CropperModalPage implements OnInit {

  @Input() event: any;
  loading;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  file: any;
  fileBlob: any;
  localUrl: any;
  imageDataEvent: any;
  localCompressedURl:any;
  sizeOfOriginalImage:number;
  sizeOFCompressedImage:number;
  imgResultBeforeCompress:string;
  imgResultAfterCompress:string;

  constructor(
    public modalController: ModalController,
    public loadingController: LoadingController,
    private imageCompress: NgxImageCompressService) { }

  //aspectRatio cropper input
  //change it according to templates dimension	
  async ngOnInit() {
    console.log(this.event);
    this.loading = await this.loadingController.create({
      spinner: "lines",
      duration: 0,
      message: 'Carregando',
      translucent: true,
      backdropDismiss: true
    });
    this.loading.present();
    this.selectFile(this.event)
    this.imageChangedEvent = this.event;
  }
  
  selectFile(event: any) {
    // console.log(event.target.files);
    var  fileName : any;
    this.file = event.target.files[0];
    fileName = this.file['name'];

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        this.compressFile(this.localUrl,fileName)
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    
  }

  compressFile(image,fileName) {
    var orientation = -1;
    this.sizeOfOriginalImage = this.imageCompress.byteCount(image)/(1024*1024);
      
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          this.localCompressedURl = result;
          this.sizeOFCompressedImage = this.imageCompress.byteCount(result)/(1024*1024)
          // create file from byte
          const imageName = fileName;
          // call method that creates a blob from dataUri
          const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
          const imageFile = new File([result], imageName, { type: 'image/png' });
          this.fileBlob = imageBlob;
          console.log("file size:",imageFile['size']/(1024*1024));
        }
      );
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
 }

  fileChangeEvent(event: any): void {
      //this.imageChangedEvent = event;
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
