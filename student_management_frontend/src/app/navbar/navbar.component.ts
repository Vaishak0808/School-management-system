import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private server:ServicesService,
    public router: Router,
  ){ }

  userLogout(){
    this.server.getData('userdetails/logout/').subscribe(res=>{
      console.log(res);
      
      if(res.body.status == 1){
        localStorage.clear()
        this.router.navigate(['login'])
      }
    })
  }

}
