import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-projecttypeedit',
  templateUrl: './projecttypeedit.component.html',
  styleUrls: ['./projecttypeedit.component.css']
})
export class ProjecttypeeditComponent implements OnInit {

  projecttypeForm:FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit(){}

}
