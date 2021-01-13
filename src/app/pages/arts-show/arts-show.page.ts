import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageSharer } from 'src/app/shared/ImageSharer';
import { Art } from 'src/app/shared/models/Art';
import { ArtService } from 'src/app/shared/services/art.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { saveAs } from 'file-saver';
import { LoadingController } from '@ionic/angular';

declare var $: any;

@Component({
  selector: 'app-arts-show',
  templateUrl: './arts-show.page.html',
  styleUrls: ['./arts-show.page.scss'],
})
export class ArtsShowPage implements OnInit {

  art: Art;
  displayShareButton: boolean = false;
  isLoading: boolean = false;
  saveIconColor: string = '#000000';
  downloadFileName: string = "";
  imageSharer: ImageSharer;
  loading;

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private artService: ArtService, 
    private authService: AuthService, 
    private activatedRoute: ActivatedRoute,
    public loadingController: LoadingController) { 

  }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      spinner: "lines",
      duration: 0,
      message: 'Carregando',
      translucent: true,
      backdropDismiss: true
    });
    this.getArt();
  }

  async getArt() {
    this.loading.present();
    let session = this.authService.getSession();
    let artId = this.activatedRoute.snapshot.paramMap.get('id');
    try {
      this.art = await this.artService.getArt(session.agencySubdomain, session.accessCode, artId);
    } catch(e) {
      this.router.navigate(['arts']);
      this.loading.dismiss();
      return;
    }
     
    this.imageSharer = new ImageSharer(this.art.url + ".jpg", this.http);
    this.downloadFileName = this.art.id + ".jpg";
    
    this.showShareButtonIfPossible();
    this.adjustArtSize();
    this.loading.dismiss();

  }  
  
  adjustArtSize() {
    setTimeout(() => {
      let containerHeight = $('.top').height();
      let actionsContainerHeight = $('.actions-container').height();
      let maxHeight = containerHeight - actionsContainerHeight - 50;      
      $('.art').css({
        'maxHeight': maxHeight
      });

    })
  }

  async showShareButtonIfPossible() {
    let canShare = await this.imageSharer.canShareImage();

    if(canShare) {
      this.displayShareButton = true;
    }
  }

  async share() {
    this.imageSharer.share();
  }

  download() {
    saveAs(this.art.url + ".jpg", this.downloadFileName)
  }

  async deleteArt() {
    if (confirm('Deseja mesmo deletar esta arte?')) {
      this.loading.present();
      try {
        await this.artService.deleteArt(this.art.id);
      } catch(e) {
        this.loading.dismiss();
        return;
      }

      this.loading.dismiss()
      this.router.navigate(['pages/arts']);
    }
  }


}
