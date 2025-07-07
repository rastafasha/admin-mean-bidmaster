import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  title:string = 'Projectos';
  query:string = '';
  loading:boolean;
  p: number = 1;
  count: number = 8;

  constructor() { }

  ngOnInit(): void {
  }

  search(){
    
  }

  goBack(){

  }

}
