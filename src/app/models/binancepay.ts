import { environment } from "src/environments/environment";
import { Post } from "./post";
import { User } from "./user";
import { Payment } from "./payment";
const base_url = environment.mediaUrlRemoto;

export class Binancepay {
  constructor(

    public monto: string,
    public usuario: User,
    public pago: Payment,
    public blog: Post,
    public status: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public img?: string,
    public _id?: string


){}


  get imagenUrl(){

    if(!this.img){
      return `${base_url}/binancepays/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${base_url}/binancepays/${this.img}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }

}
