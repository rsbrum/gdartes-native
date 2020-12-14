import { Injectable } from '@angular/core';
import { Art } from '../models/Art';
import { Template } from '../models/Template';
import { AuthService } from './auth.service';
import { RequestsService } from './requests.service';

@Injectable({
  providedIn: 'root'
})
export class ArtService {


  constructor(private requestsService: RequestsService, private authService: AuthService) { }

  async saveArt(template: Template, state: any) : Promise<Art> {
    let session = this.authService.getSession();
    let url = `api/${session.agencySubdomain}/business/${session.accessCode}/template/${template.id}`;
    let art = await this.requestsService.post(url, state).toPromise() as Art;
    return art;
  }

  async getArts(agencySubdomain: String, accessCode: String) : Promise<Art[]> {
    let arts = await this.requestsService.get(`api/${agencySubdomain}/business/${accessCode}/art`).toPromise() as unknown as Art[];
    return arts;
  }

  async getArt(agencySubdomain: String, accessCode: String, artId: string) : Promise<Art> {
    let art = await this.requestsService.get(`api/${agencySubdomain}/business/${accessCode}/art/${artId}`).toPromise() as unknown as Art;
    return art;
  }

  async deleteArt(artId) : Promise<boolean> {
    let session = this.authService.getSession();
    let url = `api/${session.agencySubdomain}/business/${session.accessCode}/art/${artId}/delete`;
    await this.requestsService.post(url, {}).toPromise();
    return true;
  }

}
