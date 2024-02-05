import { Component } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-results-add',
  templateUrl: './results-add.component.html',
  styleUrls: ['./results-add.component.css']
})
export class ResultsAddComponent {

  subjects = []
  students = []
  name:any
  showTable = false
  SelectedStudent:any
  SelectedStudentId:any
  results:any = {}
  grades = ["A", "B", "C", "D", "F"]

  constructor(
    private server:ServicesService,
    public router: Router,
  ){ }
  
  ngOnInit(){
    this.LoadFilters()
  }

  LoadFilters(){
    this.server.getDatawithToken('results/filters/').subscribe(res=>{
      console.log(res);
      
      if(res.body.status == 1){

        this.subjects = res.body['subjects']
        this.students = res.body['students']
      }
    })
  }

  selectStudent(event:any){
    console.log(event);
    this.SelectedStudentId = event.value
    this.server.postDatawithToken('results/filters/', {'student_id':this.SelectedStudentId}).subscribe(res=>{
      console.log(res);
      if(res.body.status == 1){
        this.showTable = true
      }
      else{
        this.showTable=false
      
        Swal.fire({
          position:'center',
          title:'Results already added',
          icon:'error',
        })
      }
    },
    error => {
      this.showTable=false
      Swal.fire({
        position:'center',
        title:'Error',
        icon:'error',
        text: error.text
      })
    })
    
  }

  AddGrade(subject:any, event:any) {
    this.results[subject['id']] = {
      'subject': subject,
      'grade':event.value
    }
    console.log(this.results);

    
  }

  AddResults() {
    console.log(this.results);
    
    
    this.server.postDatawithToken('results/results/', {'student_id':this.SelectedStudentId, 'results':this.results}).subscribe(res=>{
      console.log(res);
      if(res.body.status == 1){
        this.router.navigate(['results'])
      }
      else{
        Swal.fire({
          position:'center',
          title:'Something went wrong',
          icon:'error',
        })
      }
    },
    error => {
      
      Swal.fire({
        position:'center',
        title:'Error',
        icon:'error',
        text: error.text
      })
    })
  }

}
