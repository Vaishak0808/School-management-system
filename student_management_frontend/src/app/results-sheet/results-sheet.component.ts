import { Component } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
interface GradeData {
  id: number;
  dat_created: string;
  staff__first_name: string;
  staff__last_name: string;
  student__first_name: string;
  student__last_name: string;
  json_grade: Record<string, { grade: string; subject: { id: number; vchr_name: string; dat_created: null } }>;
}

@Component({
  selector: 'app-results-sheet',
  templateUrl: './results-sheet.component.html',
  styleUrls: ['./results-sheet.component.css']
})
export class ResultsSheetComponent {

  resultData: GradeData[] = [];

  constructor(
    private server:ServicesService,
    public router: Router,
  ){ }
  
  ngOnInit(){
    this.getData()
  }

  getData(){
    this.server.getDatawithToken('results/results/').subscribe(res=>{
      console.log(res);
      
      if(res.body.status == 1){

        this.resultData = res.body['results']
      }
    })
  }
  addPage() {
    this.router.navigate(['add-results'])
  }
}
