import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContainerFitService {

  constructor() { }

  fit(container, content) {
    let containerRatio = container.width / container.height;
    let contentRatio = content.width / content.height;

    let width = container.width;
    let height = width / contentRatio;

    if (containerRatio > contentRatio) {
      height = container.height;
      width = height * contentRatio;
    }

    return {
      width: width,
      height: height
    };
  }

}
