import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RequestsService } from './requests.service';
import { Template } from '../models/Template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private requestsService: RequestsService) { }

  async getTemplates(agencySubdomain: String, accessCode: String) : Promise<Template[]> {
    let templates = await this.requestsService.get(`api/${agencySubdomain}/business/${accessCode}/template`).toPromise() as unknown as Template[];
    return templates;
  }

  async getTemplate(agencySubdomain: String, accessCode: String, templateId: string) : Promise<Template> {
    let template = await this.requestsService.get(`api/${agencySubdomain}/business/${accessCode}/template/${templateId}`).toPromise() as unknown as Template;
    template.state = JSON.parse(JSON.stringify(template.editor_state));

    let count = 0;
    for (let inputId in template.state) {
      if (inputId !== 'version' 
        && (this.isTextInput(template, inputId))
        && (!template.state[inputId].preset)) {
        template.state[inputId].value = '';
      }
      count += 1;
    }
    return template;
  }

  getInputById(template, inputId) {
    for (let index in template.input.list) {
      if(template.input.list[index].id == inputId) {
        return template.input.list[index];
      }
    }

    return {};
  }

  private isTextInput(template, inputId) {
    return this.getInputById(template, inputId).type == 'string' || this.getInputById(template, inputId).type == 'text';
  }
}
