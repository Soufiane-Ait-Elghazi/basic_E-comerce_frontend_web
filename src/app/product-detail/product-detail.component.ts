import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogueService} from "../catalogue.service";
import {Product} from "../model/product.model";
import {AuthenticationService} from "../services/authentication.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
   public currentProduct: Product | undefined;
   mode: number = 0;
  editPhoto: boolean = false;
  selectedFiles: any;
  currentFileUpload: any;
  progress: number | undefined;
  timeStamp: number=0;



  constructor(public catalogueService:CatalogueService,private router:Router,private route:ActivatedRoute,public authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    let url = atob(this.route.snapshot.params['url'])
    this.catalogueService.getProduct(url).subscribe((data:Product)=>{
        this.currentProduct=data;
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
    this.catalogueService.uploadPhotoProduct(this.currentFileUpload,this.currentProduct?.id).subscribe(event=>{
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

  onEditProduct() {
    this.mode = 1;
  }
}
