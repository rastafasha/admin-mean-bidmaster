import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  ServerUrl = environment.apiUrl;
  usuarios:any;
  private http: HttpClient;

  query:string ='';
    searchForm!:FormGroup;

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
  }

 

  public PageSize(): void {
    // this.getDirectories();
    this.query = '';
  }


   search() {
    // return this.directorioService.search(this.query).subscribe(
    //   (res:any)=>{
    //     this.directories = res;
    //     if(!this.query){
    //       this.getDirectories();
    //     }
    //   });
  }


}
