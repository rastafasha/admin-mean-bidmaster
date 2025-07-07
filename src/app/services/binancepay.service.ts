import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Binancepay } from '../models/binancepay';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BinancepayService {

  public binancepay: Binancepay;

  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }


  getBinancepays()  {
    const url = `${baseUrl}/binancepay`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, binancepays: Binancepay}) => resp.binancepays)
      )
  }

  getBinancepay(_id: string) {
    const url = `${baseUrl}/binancepay/${_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, binancepay: Binancepay}) => resp.binancepay)
        );
  }


  createBinancepay(binancepay:any) {
    const url = `${baseUrl}/binancepay/crear`;
    return this.http.post(url, binancepay, this.headers);

  }

   updateBinancepay(binancepay: Binancepay) {
    const url = `${baseUrl}/binancepay/editar/${binancepay._id}`;
    return this.http.put(url, binancepay, this.headers);

  }

  activar(binancepay: Binancepay):Observable<any> {
    const url = `${baseUrl}/binancepay/activar/${binancepay}`;
    return this.http.get(url, this.headers);

  }
  desactivar(binancepay: Binancepay):Observable<any> {
    const url = `${baseUrl}/binancepay/desactivar/${binancepay}`;
    return this.http.get(url, this.headers);

  }

  deleteBinancepay(binancepay: Binancepay) {
    const url = `${baseUrl}/binancepay/borrar/${binancepay}`;
    return this.http.delete(url, this.headers);
  }

  getRecientes() {
    const url = `${baseUrl}/binancepay/recientes`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, binancepays: Binancepay}) => resp.binancepays)
      )
  }

  getDestacados() {
    const url = `${baseUrl}/binancepay/destacados`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, binancepays: Binancepay}) => resp.binancepays)
      )
  }




}
