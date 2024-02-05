import { Component } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grade-card',
  templateUrl: './grade-card.component.html',
  styleUrls: ['./grade-card.component.css']
})
export class GradeCardComponent {

  resultData!: {
    id: number;
    dat_created: string;
    staff__first_name: string;
    staff__last_name: string;
    student__first_name: string;
    student__last_name: string;
    json_grade: Record<string, { grade: string; subject: { id: number; vchr_name: string; dat_created: null } }>;
  };
  

  constructor(
    private server:ServicesService,
    public router: Router,
  ){ }
  
  ngOnInit(){
    this.getData()
  }

  getData(){
    this.server.getDatawithToken('results/grade_card/').subscribe(res=>{
      console.log(res);
      
      if(res.body.status == 1){

        this.resultData = res.body['results']
      }
    })
  }
}
