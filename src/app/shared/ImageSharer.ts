import { HttpClient } from '@angular/common/http';

declare var agencySubdomain : string;

export class ImageSharer {
    shareData;

    constructor(private url: string, private http: HttpClient, useProxy: boolean = false) {
        if(useProxy) {
            let proxy = "https://cors-anywhere.herokuapp.com/";
            this.url = proxy + url;
        } else {
            this.url = url;
        }
    }

    async share() {
        let navigator: any;
        navigator = window.navigator;
    
        let data = await this.getShareData();
    
        if (navigator.canShare(data)) {
          navigator
            .share(data)
            .then(() => {})
            .catch(err => {
              console.error("Unsuccessful share " + err);
            });
        }
    }
    
    private async getShareData() {
        
        if(this.shareData != null) {
            return this.shareData;
        }

        let metadata = {
          type: 'image/jpeg'
        };
    
        let navigator: any;
        navigator = window.navigator;
    
        let data = { files: [], text: "", url: "", title: "" };
        let arrayBufferImage = await this.http.get(this.url, {responseType: "arraybuffer"}).toPromise();
        
        if (agencySubdomain === 'pp') {
            data.url = 'http://www.progressistas.org.br';
        }

        let blob = new File([arrayBufferImage], `lel.jpg`, metadata);
        data.files.push(blob);
        this.shareData = data;
        return this.shareData;
    }
    
    async canShareImage() : Promise<boolean> {
        try {
            let navigator: any;
            navigator = window.navigator;

            let data = await this.getShareData();

            if (navigator.canShare(data)) {
                return true;
            }
            return false;
        } catch(e) {
            return false;
        }
    }
}