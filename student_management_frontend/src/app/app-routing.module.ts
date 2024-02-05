import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { ResultsSheetComponent } from './results-sheet/results-sheet.component';
import { ResultsAddComponent } from './results-add/results-add.component';
import { SubjectsListComponent } from './subjects-list/subjects-list.component';
import { GradeCardComponent } from './grade-card/grade-card.component';

const routes: Routes = [
  { path: '', component:LoginComponent },
  { path:'register',component : RegistrationComponent},
  { path : '',
    component : LayoutComponent,
      children:[
      { path:'home',component : HomeComponent},
      { path:'list',component : UserListComponent},
      { path:'results',component : ResultsSheetComponent},
      { path:'add-results',component : ResultsAddComponent},
      { path:'subjects',component : SubjectsListComponent},
      { path:'grade',component : GradeCardComponent},
    ]
  },
  { path: 'login', component:LoginComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
