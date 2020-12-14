import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Art } from 'src/app/shared/models/Art';
import { Session } from 'src/app/shared/models/Session';
import { ArtService } from 'src/app/shared/services/art.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-arts',
  templateUrl: './arts.page.html',
  styleUrls: ['./arts.page.scss'],
})
export class ArtsPage implements OnInit {

  isLoading: boolean = true;
  arts: Art[] = [];
  session: Session;
  loading;
  
  constructor(
    private artService: ArtService, 
    private authService: AuthService, 
    private route: Router,
    public loadingController: LoadingController
    ) { }


  async ngOnInit() {
    this.loading = await this.loadingController.create({
      spinner: "lines",
      duration: 0,
      message: 'Carregando',
      translucent: true,
      backdropDismiss: true
    });

    this.getArts();
  }

  async getArts() {
    this.loading.present();
    this.session = this.authService.getSession();
    this.arts = await this.artService.getArts(this.session.agencySubdomain, this.session.accessCode);
    this.loading.dismiss();
  }
  
}
