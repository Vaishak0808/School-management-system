import { Component } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.css']
})
export class SubjectsListComponent {

  subjects = []
  name:any

  constructor(
    private server:ServicesService,
    public router: Router,
    private toastr: ToastrService,
  ){ }
  
  ngOnInit(){
    this.getData()
  }

  getData(){
    this.server.getDatawithToken('results/subjects/').subscribe(res=>{
      console.log(res);
      
      if(res.body.status == 1){

        this.subjects = res.body['subjects']
      }
    })
  }

  addData(){
    if(!this.name || this.name === '' || this.name=== undefined) {
        
      Swal.fire({
        position:'center',
        title:'Subject name is required',
        icon:'error',
      })
      return
    }
    this.server.postDatawithToken('results/subjects/', {'name' : this.name}).subscribe(res=>{
      console.log(res);
      
      if(res.body.status == 1){
        Swal.fire({
          position:'center',
          title:'Added successfully',
          icon:'success',
        })
        this.subjects = res.body['subjects']
        this.name=null
      }
    })
  }

}
