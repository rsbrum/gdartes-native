import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Session } from 'src/app/shared/models/Session';
import { Template } from 'src/app/shared/models/Template';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TemplateService } from 'src/app/shared/services/template.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.page.html',
  styleUrls: ['./templates.page.scss'],
})
export class TemplatesPage implements OnInit {

  isLoading = true;
  templates : Template[];
  session: Session;
  loading;

  constructor(
    private templateService: TemplateService, 
    private authService: AuthService, 
    private route: Router,
    public loadingController: LoadingController) { }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      spinner: "lines",
      duration: 0,
      message: 'Carregando',
      translucent: true,
      backdropDismiss: true
    });
    this.getTemplates();
  }

  async getTemplates() {
    this.loading.present();
    this.session = this.authService.getSession();
    this.templates = await this.templateService.getTemplates(this.session.agencySubdomain, this.session.accessCode);
    this.loading.dismiss();
  }

}
