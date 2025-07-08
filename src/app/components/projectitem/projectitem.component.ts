import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-projectitem',
  templateUrl: './projectitem.component.html',
  styleUrls: ['./projectitem.component.css']
})
export class ProjectitemComponent implements OnInit {

  @Input() project:Project

  constructor() { }

  ngOnInit(): void {
  }

}
