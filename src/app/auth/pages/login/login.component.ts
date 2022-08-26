import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from '../../interfaces/usuario';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  hide = false;
  user!: Usuario | undefined;

  constructor(private fb: FormBuilder, private loginService: LoginService) { }


  ngOnInit(): void {
    this.myForm = this.fb.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get userName() {
    return this.myForm.get('userName') as FormControl;
  }

  get password() {
    return this.myForm.get('password') as FormControl;
  }

  getErrorMessagePassword() {

    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('email') ? 'Not a valid email' : '';

  }
  getErrorMessageUserName() {
    if (this.userName.hasError('required')) {
      return 'You must enter a value';
    }

    return this.userName.hasError('email') ? 'Not a valid email' : '';

  }

  login(event: any) {
    const myUserName = this.myForm.value.userName;
    const myPassword = this.myForm.value.password;
    console.log(this.myForm.value);
    console.log(this.userName.valid);
    console.log(this.password.valid);

    if (!this.myForm.valid) {
      Swal.fire({
        title: 'Error',
        text: 'Debes completar todos los campos',
        icon: 'error'
      });
      return;
    }


    this.loginService.findPersona(myUserName).subscribe(data => {
      const myPersonas = data;
      this.user = myPersonas.find(x => x.nombre === myUserName);
      if (this.user) {
        //Navegar a la pagina de inicio
        console.log(this.user);
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Usuario no encontrado',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }

    },
      error => {
        console.log(error);
        Swal.fire({
          title: 'Error Comunicandose con el Servidor',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    );
  }

}
