import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  @Input() display: string = 'block';

  title:string = 'Projectos';
  projects: Project;
  query:string = '';
  p: number = 1;
  count: number = 8;
  loading:boolean;

  selectedProject: Project;

  constructor(
    private projectService: ProjectService,

  ) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(){
    this.projectService.getProjects().subscribe((resp:any)=>{
      this.projects = resp;
      // console.log(resp);
    })
  }

  onEditProject(project: Project) {
    this.selectedProject = project;
  }
  onDeleteProject(project: Project) {
    this.selectedProject = project;

    this.projectService.deleteProject(project._id).subscribe((resp:any)=>{
      this.getProjects();
    })
  }

  search(){
    
  }

  goBack(){

  }

  PageSize(){
    
  }

}
