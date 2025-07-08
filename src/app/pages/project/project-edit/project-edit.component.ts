import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Project, ProjectType } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  @Input() projectSeleccionado;
  type: ProjectType;
  projectForm:FormGroup;
  title:string;
  usuario:User;
  constructor(
    private fb: FormBuilder,
    private usuarioService: UserService,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
  ) {
    this.usuario = usuarioService.usuario;
    const base_url = environment.apiUrl;
  }

  
  


  ngOnInit(): void {
      // console.log(this.projectSeleccionado);
      this.iniciarformulario();
      this.activatedRoute.params.subscribe(({ id }) => this.cargarProject(id));
      
    }

    iniciarformulario(){
      if (this.projectSeleccionado) {
        this.title = 'Editando Proyecto';
        this.projectForm = this.fb.group({
          name: [this.projectSeleccionado.name, Validators.required],
          url: [this.projectSeleccionado.url, Validators.required],
          category: [this.projectSeleccionado.category, Validators.required],
          hasPresentation: [this.projectSeleccionado.hasPresentation, Validators.required],
          deliveryDate: [this.projectSeleccionado.deliveryDate, Validators.required],
          partners: [this.projectSeleccionado.partners, Validators.required],
          type: [this.projectSeleccionado.type, Validators.required],
          file: [this.projectSeleccionado.file, Validators.required],
          id: [this.projectSeleccionado._id, Validators.required],
        });
      } else {
        this.activatedRoute.params.subscribe(({ id }) => this.cargarProject(id));
        this.validarFormulario();
        window.scrollTo(0, 0);
        this.title = 'Creando Proyecto';
      }
    }
  
    validarFormulario(){
      this.projectForm = this.fb.group({
        name: ['',Validators.required],
        url: ['',Validators.required],
        category: ['',Validators.required],
        hasPresentation: ['',Validators.required],
        deliveryDate: ['',Validators.required],
        partners: ['',Validators.required],
        type: ['',Validators.required],
        file: ['',Validators.required],
        id: ['',Validators.required],
      })
    }
  
    cargarProject(_id: string){
      if (_id !== null && _id !== undefined) {
        this.title = 'Editando Categoría';
        this.iniciarformulario();
        this.projectService.getProject(_id).subscribe(
          res => {
            this.projectForm.patchValue({
              id: res._id,
              name: res.name,
              url: res.url,
              category: res.category,
              hasPresentation: res.hasPresentation,
              type: res.type,
              deliveryDate: res.deliveryDate,
              partners: res.partners,
              file: res.file,
            });
            this.projectSeleccionado = res;
            console.log(this.projectSeleccionado);
          }
        );
      } else {
        this.title = 'Creando Categoría';
      }
  
    }
  
    handleSubmit(){
  
      const {nombre } = this.projectForm.value;
  
      if(this.projectSeleccionado){
        //actualizar
        const data = {
          ...this.projectForm.value,
          _id: this.projectSeleccionado._id
        }
        this.projectService.updateProject(data).subscribe(
          resp =>{
            Swal.fire('Actualizado', `${nombre}  actualizado correctamente`, 'success');
            // this.router.navigateByUrl(`/dashboard/projects`);
            console.log(this.projectSeleccionado);
          });
  
      }else{
        //crear
        this.projectService.createProject(this.projectForm.value)
        .subscribe( (resp: any) =>{
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          // this.router.navigateByUrl(`/dashboard/categories`);
          // this.enviarNotificacion();
        })
      }
  
    }
  
  
  

}
