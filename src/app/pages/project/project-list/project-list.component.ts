import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project, ProjectType } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { BusquedasService } from 'src/app/services/busqueda.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjecttypeService } from 'src/app/services/projecttype.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
 @Input() displaycomponent: string = 'block';
 @Input() limit!:number;
 @Input() userprofile!:User;

  selectedType: string = '';

  title:string = 'Projectos';
  projects: Project[];
  query:string = '';
  p: number = 1;
  count: number = 5;
  loading:boolean = false;
  categories: ProjectType[];
  selectedProject: Project;
  usuario:any;
  usuario_id:any;

  constructor(
    private projectService: ProjectService,
    private busquedasService: BusquedasService,
    private proyectTypeService: ProjecttypeService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,

  ) { 
    let USER = localStorage.getItem('user');
        this.usuario = JSON.parse(USER ? USER: '');
  }

  

  ngOnInit(): void {
    this.getCategories();
    this.activatedRoute.params.subscribe((resp:any)=>{
        this.usuario_id = resp.id;
        // this.cargarPresupuesto();
        if(this.usuario_id ){
          this.getProjectsByUser(this.usuario_id);
        }
      })


   if(this.usuario.role === 'PARTNER' ){
    // this.usuario.uid = this.usuario_id;
     this.getProjectsByUser(this.usuario.uid);
     
  } else {
       this.getProjects();
     }
    
  }

  getProjects(){
    this.loading = true;
    this.projectService.getProjects().subscribe((resp:any)=>{
      this.projects = resp;
      this.loading = false;
    })
  }

  getProjectsByUser(id:string){
    //  this.userprofile.uid = this.usuario_id
    // console.log('getProjectsByUser called with userprofile:', this.userprofile.uid);
    this.loading = true;
    this.projectService.getByUser(id).subscribe((resp:any)=>{
      this.projects = resp;
      this.loading = false;
    })
  }

  getCategories(){
    this.proyectTypeService.getProjectTypes().subscribe((resp:any)=>{
      this.categories = resp;
    })

  }

  onEditProject(project: Project) {
    this.selectedProject = project;
  }
  onDeleteProject(project: Project) {
    this.selectedProject = project;

    Swal.fire({
            title: 'Estas Seguro?',
            text: "No podras recuperarlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.projectService.deleteProject(project._id).subscribe((resp:any)=>{
      this.getProjects();
    })
              Swal.fire(
                'Borrado!',
                'El Archivo fue borrado.',
                'success'
              )
              this.ngOnInit();
            }
          });
      
  }

  search(){
    if ((!this.query || this.query === null) && !this.selectedType) {
      this.ngOnInit();
    } else {
      return this.busquedasService.searchGlobal(this.query).subscribe(
        (resp: any) => {
          let filteredProjects = resp.projects;
          if (this.selectedType) {
            filteredProjects = filteredProjects.filter(
              (project: Project) => project.type.name === this.selectedType
            );
          }
          this.projects = filteredProjects;
          this.projectService.emitFilteredProjects(filteredProjects);
        }
      );
    }
  }

  goBack(){

  }

  PageSize(){
    this.getProjects();
    this.query = '';
    this.selectedType = '';
    this.getCategories()
    
  }
  openEditModal(): void {
    this.selectedProject = null;
  }

   }

