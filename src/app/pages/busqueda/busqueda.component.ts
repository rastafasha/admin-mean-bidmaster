import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';
import { BusquedasService } from 'src/app/services/busqueda.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  

  categorias: Category;
  usuarios: User;

  query:string ='';

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService,
    private location: Location,
     ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      ({termino}) => {
        this.busquedaGlobal(termino);
      }
    )
  }


  busquedaGlobal(termino: string){
    this.busquedasService.searchGlobal(termino).subscribe(
      (resp:any) => {
        this.usuarios = resp.usuarios;
        this.categorias = resp.categorias;
      }
    )
  }

  search() {

    if(!this.query|| this.query === null){
      this.ngOnInit();
    }else{
      return this.busquedasService.searchGlobal(this.query).subscribe(
        (resp:any) => {
          this.usuarios = resp.usuarios;
        this.categorias = resp.categorias;
      
          
        }
      )
    }
    
        
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
