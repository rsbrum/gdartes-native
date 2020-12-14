import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as Croppie from "node_modules/croppie/croppie.js";
import { ContainerFitService } from '../../services/container-fit.service';

declare var $: any;

@Component({
  selector: 'app-croppie',
  templateUrl: './croppie.component.html',
  styleUrls: ['./croppie.component.scss']
})
export class CroppieComponent implements OnInit {
  
  private onFinish: Function;
  private croppie: Croppie;
  private orientation;
  
  show: boolean = false;
  outputSize: any;

  constructor(private containerFit: ContainerFitService) { }

  ngOnInit(): void {
    
  }

  private getInitialPoints(imageSize, outputSize): any {
    let padding = Math.min(0.05 * imageSize.width, 0.05 * imageSize.height);
    let container = {
      width: imageSize.width - 2 * padding,
      height: imageSize.height - 2 * padding
    }

    let cropSize = this.containerFit.fit(container, {
      width: outputSize.width,
      height: outputSize.height
    });

    let xTopLeft = padding + (container.width - cropSize.width) / 2;
    let yTopLeft = padding + (container.height - cropSize.height) / 2;
    let xBottomRight = padding + (container.width + cropSize.width) / 2;
    let yBottomRight = padding + (container.height + cropSize.height) / 2;

    return [xTopLeft, yTopLeft, xBottomRight, yBottomRight];
  }

  openCropper(image, points, orientation, outputSize, onFinish) {
    this.show = true;
    this.outputSize = outputSize;
    this.onFinish = onFinish;
    
    let viewportPadding = Math.min(window.innerWidth * 0.05, window.innerHeight * 0.05);
    let croppieViewport = this.containerFit.fit({
      width: window.innerWidth - 2 * viewportPadding,
      height: window.innerHeight - 110 - 2 * viewportPadding
    }, outputSize);

    let fileReader = new FileReader();
    fileReader.readAsDataURL(image); 
    fileReader.onload = e => {
      let image: any = new Image();
      let that = this;

      image.src = e.target.result;
      image.onload = function() {
        if (!points) {
          points = that.getInitialPoints({
            width: this.width,
            height: this.height
          }, outputSize);
        }

        let target = $('.demo')[0];

        that.croppie = new Croppie.Croppie(target, {
          url: e.target.result,
          viewport: croppieViewport,
          boundary: {width: '100%', height: '100%'},
          showZoomer: false,
          enableOrientation: true,
          // enableExif: true,
          points: points
        });

        setTimeout(() => {

          switch(orientation) {
            case 0:
              break
            case 1:
              that.croppie.rotate(-90);
              break
            case 2:
              that.croppie.rotate(180);
              break
            case 3:
              that.croppie.rotate(90);
              break
          }

        }, 100)
      }
    }
    
    this.orientation = orientation;
  }

  rotate() {
    this.croppie.rotate(-90);
    this.orientation += 1;
    if(this.orientation == 4) {
      this.orientation = 0;
    }
  }

  finish() {
    this.show = false

    let options = {
      type: 'base64',
      size: this.outputSize,
      format: 'jpeg',
      quality: 0.85
    }

    this.croppie.result(options).then(base64 => {
      let points = this.croppie.get().points;
      this.croppie.destroy();
      this.onFinish(base64, points, this.orientation);
    });
  }

}
