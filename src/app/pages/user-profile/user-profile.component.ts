import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/user';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { planPaypalSubcription } from 'src/app/models/planPaypalSubcription';
import { PlanPaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  title = "Detalles de la cuenta";
  usuario: User;
  user: User;
  profile: Profile;
  public blogs: Post;
  error: string;
  subcriptions: planPaypalSubcription;

  public pagos: Payment[] =[];
  userPagos: Payment;
  uid:string;

  rolesSelected:number;

  p: number = 1;
  count: number = 8;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private paymentService: PaymentService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private subcriptionPaypalService: PlanPaypalSubcriptionService,

  ) {
    this.usuario = userService.usuario;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.closeMenu();
    this.activatedRoute.params.subscribe( ({id}) => this.getUserRemoto(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getProfile(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getPagos(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getBlogs(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getUserSubcription(id));
    
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }



  getUserRemoto(id){
    this.userService.getUserById(id).subscribe(
      res =>{
        this.usuario = res;
        error => this.error = error;
        // console.log(this.usuario);
      }
    );

  }

  getProfile(id:string){
    
    this.profileService.getByUser(id).subscribe(
      res =>{
        this.profile = res[0];
        error => this.error = error;
      }
    );

    
  }

  getPagos(id){
    this.paymentService.getPagosbyUser(id).subscribe(
      res =>{
        this.pagos = res;
        error => this.error = error;
      }
    );
  }
  getUserSubcription(id:string){

    this.subcriptionPaypalService.getByUser(id).subscribe((data: any) => {
      this.subcriptions = data;
    });
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  updateUser(userprofile: Profile){
    this.profileService.updateProfile(userprofile ).subscribe(
      resp =>{ console.log(resp);
        Swal.fire('Actualizado', `actualizado correctamente`, 'success');

      }
    )
  }

  getBlogs(_id:string){
    this.postService.getByUser(_id).subscribe(
      res =>{
        this.blogs = res;
        error => this.error = error;
        // console.log(this.blogs);
      }
    );
  }
}
