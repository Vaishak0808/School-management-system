import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username:any
  password:any

  constructor(public service:ServicesService,
              public router:Router){

  }


Login(){
console.log("this.username",this.username);

  if(!this.username){
    Swal.fire({
      title: "Warning?",
      text: "Email is required",
      icon: "warning"
    });
    return
  }
  if(!this.password){
    Swal.fire({
      title: "Warning?",
      text: "Password is required",
      icon: "warning"
    });
    return
  }

  let dctData = {
    'password':this.password,
    'username':this.username
  }

  this.service.post('userdetails/login/',dctData).subscribe(res=>{
    if(res.body.status == 1){
      localStorage.setItem('token', res.body.token)
      localStorage.setItem('role', res.body.userdetails.role.vchr_name)
      // if(res.body.userdetails.role.vchr_name === 'ADMIN') {
      //   this.router.navigate(['list'])
      // }
      // else{
        this.router.navigate(['home'])
      // }
    }
    else{
      Swal.fire({
        title: "Error?",
        text: res.body.reason,
        icon: "error"
      });
      return
    }
  })

}

}
