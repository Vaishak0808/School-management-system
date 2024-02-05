import { Component } from '@angular/core';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import Swal from 'sweetalert2'
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})


export class RegistrationComponent {

  mobile:any
  email:any
  firstname:any
  lastname:any
  password:any
  confirmpassword:any
  userForm
  lstRole = []
  lstCountry = []
  SelectedRole:any
  SelectedRoleId:any
  SelectedCountry:any
  SelectedCountryId:any

  constructor(
    private server:ServicesService,
    public router: Router,
  ){


    function mobileNumberValidator(control: FormControl): { [key: string]: any } | null {
      const mobileNumberPattern = /^\d{10}$/; // regular expression to validate a 10-digit mobile number
      return mobileNumberPattern.test(control.value) ? null : { 'invalidMobileNumber': true };
    }
    
    this.userForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required,mobileNumberValidator]),
      password: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required]),
     
    })
  }
  
  ngOnInit(){
    this.getDropDownData()
  }

  ChangeRole(role:any){
    
    this.SelectedRole = role['vchr_name']
    this.SelectedRoleId = role['id']
    
  }
  ChangeCountry(country:any){
    this.SelectedCountry = country['vchr_name']
    this.SelectedCountryId = country['id']
  }

  getDropDownData(){
    this.server.getData('userdetails/dropdown/').subscribe(res=>{
      if(res.body.status == 1){
        this.lstRole = res.body['lst_role']
        this.lstCountry = res.body['lst_country']
      }
    })
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

 

  SaveUserData() {    
    if (!this.firstname || (this.firstname && this.firstname.trim() == '')) {
      Swal.fire({
        title: "Warning?",
        text: "First name is required",
        icon: "warning"
      });
      return
    }
    if(!this.lastname || (this.lastname && this.lastname.trim() == '')){
      Swal.fire({
        title: "Warning?",
        text: "Last name is required",
        icon: "warning"
      });
      return
    }
    if(!this.email || (this.email && this.email.trim() == '')){
      Swal.fire({
        title: "Warning?",
        text: "Email is required",
        icon: "warning"
      });
      return
    }
    if(this.email && !this.isValidEmail(this.email)){
      Swal.fire({
        title: "Warning?",
        text: "Email is not valid",
        icon: "warning"
      });
      return
    }
    
    if(!this.mobile){
      Swal.fire({
        title: "Warning?",
        text: "Mobile no. is required",
        icon: "warning"
      });
      return
    }
    
    if(String(this.mobile).length != 10){
      Swal.fire({
        title: "Warning?",
        text: "Mobile no. is not valid",
        icon: "warning"
      });
      return
    }

    if(!this.SelectedRole){
      Swal.fire({
        title: "Warning?",
        text: "Role is required",
        icon: "warning"
      });
      return
    }
    if(!this.SelectedCountry){
      Swal.fire({
        title: "Warning?",
        text: "Country is required",
        icon: "warning"
      });
      return
    }

    if(!this.password || (this.password && this.password.trim() == '')){
      Swal.fire({
        title: "Warning?",
        text: "Password is required",
        icon: "warning"
      });
      return
    }
    if(!this.confirmpassword || (this.confirmpassword && this.confirmpassword.trim() == '')){
      Swal.fire({
        title: "Warning?",
        text: "confirmpassword is required",
        icon: "warning"
      });
      return
    }
    if(this.password != this.confirmpassword){
      Swal.fire({
        title: "Warning?",
        text: "Password Does not match",
        icon: "warning"
      });
      return
    }

    let dctData = {
      'first_name':this.firstname,
      'last_name':this.lastname,
      'email':this.email,
      'mobile':this.mobile,
      'role':this.SelectedRoleId,
      'country':this.SelectedCountryId,
      'password':this.password
    }
    this.server.post('userdetails/registeruser/',dctData).subscribe(res=>{
      if(res.body.status == 1){
        Swal.fire({
          title: "Success?",
          text: "Registartion done successfully, Please login to continue.",
          icon: "success"
        });
        this.clearData()
        this.router.navigate([''])

      }else{
        Swal.fire({
          title: "Error?",
          text: res.body.reason,
          icon: "error"
        });
      }
    })
  }

  clearData(){
    this.mobile = null
    this.email = null
    this.firstname = null
    this.lastname = null
    this.password = null
    this.confirmpassword = null
    this.lstRole = []
    this.lstCountry = []
    this.SelectedRole = null
    this.SelectedRoleId = null
    this.SelectedCountry = null
    this.SelectedCountryId = null
  }

  

}


