import { Component } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  userData = []

  constructor(
    private server:ServicesService,
    public router: Router,
  ){ }
  
  ngOnInit(){
    this.getData()
  }

  getData(){
    this.server.getDatawithToken('userdetails/user_api/').subscribe(res=>{
      console.log(res);
      
      if(res.body.status == 1){

        this.userData = res.body['users']
      }
    })
  }

}
