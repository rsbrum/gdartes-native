import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CroppieComponent } from 'src/app/shared/components/croppie/croppie.component';
import { Art } from 'src/app/shared/models/Art';
import { Template } from 'src/app/shared/models/Template';
import { ArtService } from 'src/app/shared/services/art.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TemplateService } from 'src/app/shared/services/template.service';
import { LoadingController } from '@ionic/angular';

declare var $: any;
declare var MainRenderer: any;
@Component({
  selector: 'app-templates-show',
  templateUrl: './templates-show.page.html',
  styleUrls: ['./templates-show.page.scss'],
})
export class TemplatesShowPage implements OnInit {

  isLoading: boolean = false;
  template: any;
  @ViewChild(CroppieComponent, {static: false}) croppie;
  canvas;
  frame;
  bigFrame;
  mainRenderer;
  loading;
  constructor(
    private router: Router, 
    private artService: ArtService, 
    private templateService: TemplateService, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public loadingController: LoadingController) { 

  }

  async loadingControllerInit()
  {
      this.loading = await this.loadingController.create({
        spinner: "lines",
        duration: 0,
        message: 'Carregando',
        translucent: true,
        backdropDismiss: true
      });
  }

  async ngOnInit() {
    await this.loadingControllerInit();
    this.getTemplate(); 
    this.canvas = $('#canvas');
    this.frame = $('#frame');
    this.bigFrame = $('#big-frame');
    this.mainRenderer = new MainRenderer(this.frame);
    this.closeBigPreview();
    this.render();
  }

  async getTemplate() {
    this.loading.present();

    let session = this.authService.getSession();
    let templateId = this.activatedRoute.snapshot.paramMap.get('id');
    
    try {
      this.template = await this.templateService.getTemplate(session.agencySubdomain, session.accessCode, templateId);
      this.render();
    } catch(e) {
      this.router.navigate(['templates']);
      return;
    }
  
    this.loading.dismiss();
  }


  async saveArt() {
    await this.loadingControllerInit();
    this.loading.present();

    let art = await this.artService.saveArt(this.template as Template, { state: this.template.state }) as Art;
  
    this.router.navigate([`pages/arts/${art.id}`], {
      state: {
        art: art,
      }
    });

    this.loading.dismiss();
    return false;
  }

  getImageInputSize(input) {
    for (let i in this.template.blueprint.components) {
      let component = this.template.blueprint.components[i];
      if (parseInt(component.input) === parseInt(input.id) && component.input_type === 'dynamic') {
        return component.size;
      }
    }

    return {width: 100, height: 100};
    // Para todo componente que tem esse input
    // max(largura), max(altura)
  }

  render() {
    if(this.template) {
      this.mainRenderer.render(this.template.blueprint, this.template.input, this.template.state);
      this.adjustFrameSize();
    }
  }

  adjustFrameSize() {
    let canvasWidth = this.canvas.width();
    let canvasHeight = this.canvas.height();

    if (this.frame.height() === 0 || this.frame.width() === 0) return;

    let scale = Math.min(canvasHeight / this.frame.height(), canvasWidth / this.frame.width());
    let marginLeft = (canvasWidth - this.frame.width() * scale) / 2;
    let marginTop = (canvasHeight - this.frame.height() * scale) / 2;

    this.frame.css({
      'transform': 'scale(' + scale + ')',
      'transform-origin': 'top left',
      'margin-left': marginLeft,
      'margin-top': marginTop,
    });
  }

  adjustBigFrameSize() {

    let margin = 20;
    let backButtonHeight = $('#back-button').height();
    let previewTextHeight = $('.preview-text').height();

    let canvasWidth = $('.top').width() - margin * 2;
    let canvasHeight = $('.top').height() - backButtonHeight - previewTextHeight - 4 * margin;

    if (this.frame.height() === 0 || this.frame.width() === 0) return;

    let scale = Math.min(canvasHeight / this.frame.height(), canvasWidth / this.frame.width());
    let marginLeft = (canvasWidth - this.frame.width() * scale) / 2 + margin * scale;
    let marginTop = (canvasHeight - this.frame.height() * scale) / 2 + 40 + $('.preview-text').height();

    this.frame.css({
      'transform': 'scale(' + scale + ')',
      'transform-origin': 'top left',
      'margin-left': marginLeft,
      'margin-top': marginTop,
    });

  }

  openBigPreview() {
    $('#big-canvas').css('visibility', 'visible');
    // $('.container2').hide();
    $('#frame').css({
      'position': 'fixed',
      'z-index': 100,
      'margin-top': '50%'
    });

    $('#canvas').css({
      'overflow': 'visible'
    })

    this.adjustBigFrameSize();
  }

  closeBigPreview() {
    $('#big-canvas').css('visibility', 'hidden');
    $('#frame').css({
      'position': 'relative',
      'z-index': 0,
      'margin-top': '0',
      'margin-left': '0'
    });

    $('#canvas').css({
      'overflow': 'hidden'
    })
    
    this.adjustFrameSize();
  }

  isEditable(inputField) {
    return (
      this.template.state[inputField.id].editable == null ||
      this.template.state[inputField.id].editable ||
      this.template.state[inputField.id].value == ''
    );
  }

}
