
import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
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
export class ProjectEditComponent implements OnInit, OnChanges {

  @Input() projectSeleccionado;
  type: ProjectType;
  projectForm:FormGroup;
  title:string;
  usuario:User;
  project: Project;
  id:string;
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
      this.validarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projectSeleccionado'] && changes['projectSeleccionado'].currentValue) {
      const project = changes['projectSeleccionado'].currentValue;
      this.projectForm.patchValue({
        id: project._id,
        name: project.name,
        url: project.url,
        category: project.category,
        hasPresentation: project.hasPresentation,
        type: project.type,
        deliveryDate: project.deliveryDate,
        partners: project.partners,
        file: project.file,
      });
      this.title = 'Editando Categoría';
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
