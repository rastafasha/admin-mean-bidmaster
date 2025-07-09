import { Component, Input, OnInit } from '@angular/core';
import { Project, ProjectType } from 'src/app/models/project';
import { BusquedasService } from 'src/app/services/busqueda.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjecttypeService } from 'src/app/services/projecttype.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
 @Input() displaycomponent: string = 'block';
 @Input() limit!:number;
  title:string = 'Projectos';
  projects: Project;
  query:string = '';
  p: number = 1;
  count: number = 8;
  loading:boolean = false;
  categories: ProjectType;

  selectedProject: Project;

  constructor(
    private projectService: ProjectService,
    private busquedasService: BusquedasService,
    private proyectTypeService: ProjecttypeService,

  ) { }

  ngOnInit(): void {
    this.getProjects();
    this.getCategories();
  }

  getProjects(){
    this.loading = true;
    this.projectService.getProjects().subscribe((resp:any)=>{
      this.projects = resp;
      // console.log(resp);
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
    this.loading = true
     if(!this.query|| this.query === null){
      this.ngOnInit();
    }else{
      return this.busquedasService.searchGlobal(this.query).subscribe(
        (resp:any) => {
          this.projects = resp.projects;
      this.loading = false;
        }
      )
    }
  }

  goBack(){

  }

  PageSize(){
    this.getProjects();
    this.query = '';
    this.categories = null;
    this.getCategories()
    
  }
  openEditModal(): void {
    this.selectedProject = null;
  }

}
