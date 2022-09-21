import {Component, OnInit} from '@angular/core';
import {CatalogueService} from "./catalogue.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";
import {CaddyService} from "./services/caddy.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ecom-web';
  categories:any;
  currentCategorie:any;

  constructor(private catalogueService:CatalogueService,
              private router:Router,
              private authenticationService:AuthenticationService,
              public caddyService:CaddyService) {}

  ngOnInit(): void {
    this.authenticationService.loadUserAuthenticatedFromLocalStorage()
    this.getCategories();
  }

  private getCategories() {
      this.catalogueService.getResource("/categories").subscribe((data: any)=>{
        this.categories = data;
      },(error: any) => {
        console.log(error)
      });
  }

  getProductsByCat(c: any) {
    this.currentCategorie = c;
    this.router.navigateByUrl("/products/2/"+c.id)
  }

  onSelectedProducts() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/products/1/0")
  }

  onPromotedProducts() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/products/3/0")
  }

  onAvailableProducts() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/products/4/0")
  }

  onLogAuot() {
    this.authenticationService.removeTokenFromLocalStorage();
    this.router.navigateByUrl('/login');
  }
}
