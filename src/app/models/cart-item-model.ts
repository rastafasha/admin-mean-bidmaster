import { Plan } from './plan';
export class CartItemModel {

    productId: string;
    productName: string;
    productPrice:number;
    description:string;
    quantity:number;
    category:string;

    constructor(product: Plan){
      this.productId= product._id;
      this.productName = product.name;
      this.category = 'DIGITAL_GOODS';
      this.description = product.adicional;
      this.productPrice = product.price;
      this.quantity = 1;
    }

}

