import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'src/app/shared/models/Session';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoading: boolean = false;
  error: string = "";
  loading;

  constructor(
    private authService: AuthService, 
    private route: Router, 
    private requestsService: RequestsService, 
    public loadingController: LoadingController
    ) {
   
  }

  async ngOnInit() {
    this.authService.redirectIfLogged();
    this.loading = await this.loadingController.create({
      spinner: "lines",
      duration: 0,
      message: 'Carregando',
      translucent: true,
      backdropDismiss: true
    });

    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test( userAgent );
    }
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.matchMedia('(display-mode: standalone)').matches);
  }

  async login(accessCode) {
    this.loading.present();
    try {
      let loginResponse = await this.authService.login(accessCode);
      this.loading.dismiss();
      this.route.navigate(['/pages/templates']);
    } catch (e) {
      this.loading.dismiss();
      this.error = "Código de acesso inválido";
    }
  }

  async loginWithEmail(email, password) {
    this.isLoading = true;
    try {
      let loginResponse = await this.authService.loginWithEmail(email, password);
      this.isLoading = false;
      this.route.navigate(['/templates']);
    } catch (e) {
      this.isLoading = false;
      this.error = "Email ou senha inválidos. Por favor, tente novamente.";
    }
  }

}
