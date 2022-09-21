import {ProductItem} from "./product-item.model";
import {Client} from "./client.model";


export class  Caddy {
  public name: string;
  public  items: Map<number,ProductItem> = new Map() ;
  public client: Client | undefined;


  constructor(name:string) {
    this.name = name;
  }
}
