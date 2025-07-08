
import { Component, Input, OnInit, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Project, ProjectType } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjecttypeService } from 'src/app/services/projecttype.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit, OnChanges {

  @Input() projectSeleccionado;
  @Output() refreshProjectList: EventEmitter<void> = new EventEmitter<void>();

  type: ProjectType;
  projectForm:FormGroup;
  title:string;
  usuario:User;
  partners:User[];
  project: Project;
  id:string;
  categorias : ProjectType;
  public imagenSubir!: File;
  public imgTemp: any = null;


  constructor(
    private fb: FormBuilder,
    private usuarioService: UserService,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private projectTypeService: ProjecttypeService,
    private fileUploadService: FileUploadService,
  ) {
    this.usuario = usuarioService.usuario;
    const base_url = environment.apiUrl;
  }

  ngOnInit(): void {
      this.validarFormulario();
      this.getCategorias();
      this.getPartners();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projectSeleccionado'] && changes['projectSeleccionado'].currentValue) {
      const project = changes['projectSeleccionado'].currentValue;
      this.setPartnersFormArray(project.partners);
      this.projectForm.patchValue({
        id: project._id,
        name: project.name,
        url: project.url,
        category: project.category,
        hasPresentation: project.hasPresentation,
        type: project.type,
        deliveryDate: project.deliveryDate,
        file: project.file,
      });
      this.title = 'Editando Categoría';
    }
  }

  getCategorias(){
    this.projectTypeService.getProjectTypes().subscribe((resp:any)=>{
      // console.log(resp);
      this.categorias = resp;
    })

  }

  getPartners(){
    this.usuarioService.getAllEditors().subscribe((resp:any)=>{
      // console.log(resp);
      this.partners = resp;
      this.setPartnersFormArray([]);
    })
  }

  setPartnersFormArray(selectedPartners: string[]) {
    const partnersFormArray = this.fb.array([]);
    if (this.partners && this.partners.length > 0) {
      this.partners.forEach(partner => {
        const isSelected = selectedPartners.includes(partner.uid);
        partnersFormArray.push(new FormControl(isSelected));
      });
    }
    this.projectForm.setControl('partners', partnersFormArray);
  }

  cambiarImagen(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    // your code here, using 'file'
  }
  

    const reader = new FileReader();
    // reader.readAsDataURL(file);

    reader.onloadend = () =>{
      this.imgTemp = reader.result;
    }
}

  subirImagen(){
    this.fileUploadService
    .actualizarFoto(this.imagenSubir, 'projects', this.project._id || '')
    .then(img => { this.project.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');
    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    })
  }


   
  
validarFormulario(){
      this.projectForm = this.fb.group({
        name: ['',Validators.required],
        url: ['',Validators.required],
        category: ['',Validators.required],
        hasPresentation: [false,Validators.required],
        deliveryDate: ['',Validators.required],
        partners: this.fb.array([], Validators.required),
        type: ['',Validators.required],
        file: ['',Validators.required],
        id: ['',],
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
              img: res.img,
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

      const {nombre, partners } = this.projectForm.value;

      // Extract selected partner IDs from the FormArray
      const selectedPartners = this.projectForm.value.partners
        .map((checked, i) => checked ? this.partners[i].uid : null)
        .filter(v => v !== null);

      const dataToSend = {
        ...this.projectForm.value,
        partners: selectedPartners,
      };

      if(this.projectSeleccionado){
        //actualizar
        const data = {
          ...dataToSend,
          _id: this.projectSeleccionado._id
        }
        this.projectService.updateProject(data).subscribe(
          resp =>{
            Swal.fire('Actualizado', `${nombre}  actualizado correctamente`, 'success');
            // Close modal programmatically
            const modalElement = document.getElementById('editProject');
            const modal = bootstrap.Modal.getInstance(modalElement);
            if(modal){
              modal.hide();
            }
            // Emit event to refresh project list
            this.refreshProjectList.emit();
          });

      }else{
        //crear
        this.projectService.createProject(dataToSend)
        .subscribe( (resp: any) =>{
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          // Close modal programmatically
          const modalElement = document.getElementById('editProject');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if(modal){
            modal.hide();
          }
          // Emit event to refresh project list
          this.refreshProjectList.emit();
          // this.enviarNotificacion();
        })
      }

    }
  
  
  

}
