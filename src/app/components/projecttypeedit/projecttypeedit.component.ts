import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProjectType } from 'src/app/models/project';
import { ProjecttypeService } from 'src/app/services/projecttype.service';

@Component({
  selector: 'app-projecttypeedit',
  templateUrl: './projecttypeedit.component.html',
  styleUrls: ['./projecttypeedit.component.css']
})
export class ProjecttypeeditComponent implements OnInit {

  @Input() categories: ProjectType;
  displaycomponent: string = 'none';
  public categorySeleccionado: ProjectType;
  error: string;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  handleSubmit(){}

  

}
