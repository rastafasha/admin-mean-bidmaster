import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { BusquedasService } from 'src/app/services/busqueda.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  @Input() projectSeleccionado:Project;

  title = 'Panel Administrativo';
  public user: User;
  public profile: User;
  display: string = 'none'

  error: string;
  uid:string;

  categorias: Category;
  usuarios: User;
  usuario: User;
  query:string ='';

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService,
    private profileService: ProfileService,
  ) {
    this.user = userService.usuario;
  }

  ngOnInit(): void {

    this.closeMenu();
    this.getUser();
    window.scrollTo(0,0);
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.uid = this.user.uid;
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserRemoto(id));
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));


  }

  getUserRemoto(id:string){
    id  = this.user.uid
    this.userService.getUserById(id).subscribe(
      res =>{
        this.usuario = res;
        error => this.error = error;
        console.log('usuarioServer',this.usuario)
      }
    );
  }

  

}
