import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "../catalogue.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {AuthenticationService} from "../services/authentication.service";
import {Product} from "../model/product.model";
import {CaddyService} from "../services/caddy.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 products: any;
 editPhoto: boolean = false;
 currentProduct: any;
 selectedFiles: any;
 currentFileUpload: any;
 progress: number | undefined;
 title: string="";
 timeStamp: number=0;

  constructor(public catalogueService:CatalogueService,
              private route:ActivatedRoute,
              private router : Router,
              public authenticationService:AuthenticationService,
              public caddyService:CaddyService) {}

  ngOnInit(): void {
    this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        let url = val.url;
        console.log(url);
        let p1 = this.route.snapshot.params['p1']
        if(p1 == 1){
          this.title = "Selected products"
          this.getProducts("/products/search/selectedProducts");
        }else if(p1 == 2){
          this.title = "Products by category";
          let idCat = this.route.snapshot.params['p2']
          this.getProducts("/categories/"+idCat+"/products");
        }else if(p1 == 3){
          this.title = "Promoted products"
          this.getProducts("/products/search/promotedProducts");
        }else if(p1 == 4){
          this.title = "Available products"
          this.getProducts("/products/search/availableProducts");
        }else{
          alert("!!")
        }
      }
    });
    let p1 = this.route.snapshot.params['p1']
    if(p1 == 1){
      this.getProducts("/products/search/selectedProducts");
    }
  }

  private getProducts(url:string) {
    this.catalogueService.getResource(url).subscribe((data: any)=>{
      this.products = data;
    },(error: any) => {
      console.log(error)
    });
  }

  onEditPhoto(p: any) {
    this.currentProduct = p;
    this.editPhoto = true;
  }

  onSelectFile($event: Event) {
    this.selectedFiles= ($event.target as HTMLInputElement).files;
  }


  uploadPhoto() {
    this.progress = 0
    this.currentFileUpload =this.selectedFiles.item(0)
      this.catalogueService.uploadPhotoProduct(this.currentFileUpload,this.currentProduct.id).subscribe(event=>{
        if(event.type === HttpEventType.UploadProgress){
          this.progress = Math.round(100* event.loaded /100 /*(event.total)*/);
        }else if(event instanceof  HttpResponse){
         this.timeStamp = Date.now();
        }
      },error => {
        alert("Probleme de chargement !!")
      });
    }


  getTS() {
    return this.timeStamp;
  }


  onProductDetails(p:Product) {
    let url = btoa(p._links.product.href)
    console.log(url)
    this.router.navigateByUrl("product-details/"+url)
  }

  onAddProductToCaddy(p: Product ) {
     this.caddyService.addProductToCaddy(p)
  }
}
