import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


export interface Promotion {
    href: string; 
    title: string; 
    desc: string;
    type: string; 
}

@Component({
    templateUrl: './promotions.component.html',
    styleUrls: ['./promotions.component.css'],
    providers: [NgbCarouselConfig] 
})

export class PromotionsComponent {

    
    //images = [700, 800, 807].map((n) => `https://picsum.photos/id/${n}/900/500`);
    images: string[] = [];

    promotion_two: Promotion = {"href":"https://loyaltyhubsin.santander.com.mx/media/images/show-image.jpg?idItem=3921&sizeImage=M&typeItem=promotion", "title": "Hot Sale - Liverpool", "desc": "EXPIRADA","type":"expired"} as Promotion


    constructor( private http: HttpClient,config: NgbCarouselConfig) {
        config.interval = 5000;
        config.keyboard = true;
        config.pauseOnHover = true;

        this.images.push("https://i.ibb.co/PWkVmvs/banner1.png");
        this.images.push("https://i.ibb.co/hfCBrLy/banner2.png");
        this.images.push("https://i.ibb.co/WVYtbX3/banner3-1.png");
        this.images.push("https://i.ibb.co/WPJhVVd/banner4.png");
        

    }

    
    allowPromotions(): boolean {
        return Boolean(true);
    }

    isPromoEnabled(promo:string){
        //console.log("promo enabled "+ this.ff.GetFlags(promo))
        return true;
    }


    promotionCreation(): boolean {

        return true
    }

    authenticated() { return true; }

}