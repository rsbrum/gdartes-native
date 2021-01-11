import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../models/Session';
import { RequestsService } from './requests.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private requestsService: RequestsService, private route: Router) { }

  async login(accessCode: String) : Promise<any> {
    let data = {
      'access_code': accessCode
    }
    let loginResponse = await this.requestsService.post(`api/business/login`, data).toPromise() as any;

    this.setSession(loginResponse.agency_subdomain, loginResponse.access_code, loginResponse.business_name, loginResponse.accepted_terms)

    return loginResponse;
  }

  async loginWithEmail(email: String, password: String) : Promise<any> {
    let data = {
      'email': email,
      'password': password,
    }
    
    let loginResponse = await this.requestsService.post(`api/business/login_email_password`, data).toPromise() as any;

    this.setSession(loginResponse.agency_subdomain, loginResponse.access_code, loginResponse.business_name, loginResponse.accepted_terms)

    return loginResponse;
  }

  public logout() {
    localStorage.removeItem('agencySubdomain');
    localStorage.removeItem('accessCode');
    localStorage.removeItem('businessName');
    localStorage.removeItem('acceptedTerms');
    this.route.navigate(['/pages/login']);
  }

  private setSession(agencySubdomain: string, accessCode: string, businessName: string, acceptedTerms: string) {
    localStorage.setItem('agencySubdomain', agencySubdomain);
    localStorage.setItem('accessCode', accessCode);
    localStorage.setItem('businessName', businessName);
    localStorage.setItem('acceptedTerms', acceptedTerms);
  }

  public getSession() : Session {
    let session = {
      agencySubdomain: localStorage.getItem('agencySubdomain'),
      accessCode: localStorage.getItem('accessCode'),
      businessName: localStorage.getItem('businessName'),
      acceptedTerms: localStorage.getItem('acceptedTerms'),
    };

    return session;
  }

  public setAcceptedTerms() {
    localStorage.setItem('acceptedTerms', 'true');
  }

  public redirectIfLogged(redirectTo: string = "/pages/templates") {
    if(this.isLogged()){
      this.route.navigate([redirectTo]);
    }
  }

  public redirectIfNotLogged(redirectTo: string = "/pages/login") {
    if(!this.isLogged()){
      this.route.navigate([redirectTo]);
    }
  }

  public isLogged() : boolean {
    let session = this.getSession();
    if(session.accessCode != null) {
      return true;
    }
    return false;
  }
}
