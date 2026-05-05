import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

// declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit {

  errors: any = null;
  roles: string[] = [];
  loginForm: FormGroup;
  registerForm: FormGroup;
  public auth2: any;
  public formSumitted = false;
  user: User;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UserService,
    private ngZone: NgZone
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      roles: ['USER'],
      terminos: [false, Validators.required],

    }, {
      validators: this.passwordsIguales('password', 'confirmPassword')

    });
  }

  ngOnInit() {
    // this.renderButton();

  }
  login() {

    this.usuarioService.login(this.loginForm.value).subscribe(
      resp => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/dashboard');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    )

  }


  // Registro
  crearUsuario() {
     this.formSumitted = true;
    if(this.registerForm.invalid){
      return;
    }

    //realizar el posteo del usuario
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
      resp =>{
        console.log(resp);
        // this.router.navigateByUrl('/login');
        this.usuarioService.getLocalStorage();
         if(localStorage.getItem('user')){
          setTimeout(()=>{
            this.router.navigateByUrl('/profile');
          },500);
        }
      },(err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSumitted) {
      return true;
    } else {
      return false;
    }


  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSumitted;
  }

  passwordNoValido() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('confirmPassword').value;

    if ((pass1 !== pass2) && this.formSumitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }
  // Registro



}
