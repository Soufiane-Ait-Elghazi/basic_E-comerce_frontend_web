import { Injectable } from '@angular/core';
import {Caddy} from "../model/caddy.model";
import {Product} from "../model/product.model";
import {ProductItem} from "../model/product-item.model";

@Injectable({
  providedIn: 'root'
})
export class CaddyService {
  currentCaddyName:string = "Caddy 1";
  public caddies : Map<string,Caddy> = new Map();

  constructor() {
    let caddies = localStorage.getItem('myCaddies')
    if(caddies){
      this.caddies = JSON.parse(caddies);
    }
    else {
      let caddy = new Caddy(this.currentCaddyName)
      this.caddies.set(this.currentCaddyName, caddy)
    }
  }

  public  addProductToCaddy(product:Product){
     let caddy = this.caddies.get(this.currentCaddyName);
    let productItem = caddy?.items.get(product.id);
    if(productItem instanceof ProductItem){
      productItem.quantity += product.quantity
    }else{
      productItem = new ProductItem(0)
      productItem.price = product.currentPrice
      productItem.quantity = product.quantity
      productItem.product = product
      caddy?.items.set(product.id,productItem)
      this.saveCaddies()
    }
  }

  public getCurrentCaddy():any{
     return this.caddies.get(this.currentCaddyName);
  }

  getTotal():number {
     let total = 0;
     let items = this.getCurrentCaddy().items.values();
     for(let pi of items){
       total += pi.price * pi.quantity
     }
     return total;
  }

  public saveCaddies(){
    localStorage.setItem('mycaddies',JSON.stringify(this.caddies));
  }
}
