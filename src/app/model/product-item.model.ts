import {Product} from "./product.model";

export class ProductItem{
  public product : Product | undefined ;
  public price : number =0;
  constructor(public quantity :number) {

  }
}
