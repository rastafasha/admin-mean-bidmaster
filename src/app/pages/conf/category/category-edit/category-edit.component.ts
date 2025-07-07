import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  title : string;

  public categoryForm: FormGroup;
  public category: Category;
  public usuario: User;
  categories: Category;
  error: string;

  idcategory:any;

  public msm_error = '';

  public categorySeleccionado: Category;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private categoryService: CategoryService,
  ) {
    this.usuario = usuarioService.usuario;
    const base_url = environment.apiUrl;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.cargarCategory(id));
    this.validarFormulario();
    this.getCategories();
    window.scrollTo(0,0);

    if(this.categorySeleccionado){
      //actualizar
      this.title = 'Creando Categoría';

    }else{
      //crear
      this.title = 'Editar Categoría';
    }
  }

  validarFormulario(){
    this.categoryForm = this.fb.group({
      nombre: ['',Validators.required],
    })
  }

  cargarCategory(_id: string){
    if (_id !== null && _id !== undefined) {
      this.title = 'Editando Categoría';
      this.categoryService.getCategory(_id).subscribe(
        res => {
          this.categoryForm.patchValue({
            id: res._id,
            nombre: res.nombre,
          });
          this.categorySeleccionado = res;
          console.log(this.categorySeleccionado);
        }
      );
    } else {
      this.title = 'Creando Categoría';
    }

  }

  updateCategory(){

    const {nombre } = this.categoryForm.value;

    if(this.categorySeleccionado){
      //actualizar
      const data = {
        ...this.categoryForm.value,
        _id: this.categorySeleccionado._id
      }
      this.categoryService.updateCategory(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', `${nombre}  actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/categories`);
          console.log(this.categorySeleccionado);
        });

    }else{
      //crear
      this.categoryService.createCategory(this.categoryForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/categories`);
        // this.enviarNotificacion();
      })
    }

  }

  // enviarNotificacion(): void {
  //   this.alertService.success("Mensaje de Monedas","Se ha creado una nueva moneda!");
  // }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      res =>{
        this.categories = res;
        error => this.error = error
      }
    );
  }

}
