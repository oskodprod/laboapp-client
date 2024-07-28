import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { LoginComponent } from './auth/login/login.component';  //okno logowania
//import { AddSamplingComponent } from './sampling/add-sampling/add-sampling.component';  //okno dodania protokołu
import { FilterSamplingComponent } from './sampling/filter-sampling/filter-sampling.component'; //filtr protokołów
import { ViewSamplingComponent } from './sampling/view-sampling/view-sampling.component'; //formularz edycji protokołu
//import { FilterSampleComponent } from './sample/filter-sample/filter-sample.component'; //filtr próbek
import { TestSampleComponent } from './sample/test-sample/test-sample.component';       //strona z filtrem do badań próbek
import { ViewSampleComponent } from './sample/view-sample/view-sample.component';       //karta badania próbki
import { FilterRecipeComponent } from './recipe/filter-recipe/filter-recipe.component';//filtr receptur
//import { AddRecipeComponent } from './recipe/add-recipe/add-recipe.component';        //dodaj recepturę
import { ViewRecipeComponent } from './recipe/view-recipe/view-recipe.component';     //edycja receptury
import { AddReportComponent } from './report/add-report/add-report.component';        //dodaj sprawozdanie
import { FilterReportComponent } from './report/filter-report/filter-report.component';//filtr sprawozdań
import { ViewReportComponent } from './report/view-report/view-report.component'; //podgląd sprawozdania
import { ListLabratComponent } from './admin/list-labrat/list-labrat.component';  //lista pracowników
//import { AddLabratComponent } from './admin/add-labrat/add-labrat.component';   //okno dodania pracownika
import { ViewLabratComponent } from './admin/view-labrat/view-labrat.component';//formularz edycji pracownika
import { ListClientComponent } from './admin/list-client/list-client.component';  //lista klientów
//import { AddClientComponent } from './admin/add-client/add-client.component'; //okno dodania klienta
import { ViewClientComponent } from './admin/view-client/view-client.component'; //formularz edycji klienta
import { ListFormfieldComponent } from './admin/list-formfield/list-formfield.component'; //lista pozycji formularza z dodawaniem
import { FilterCompanyComponent } from './admin/filter-company/filter-company.component'; //filtr firm
//import { AddCompanyComponent } from './admin/add-company/add-company.component';   //okno dodania firmy
import { ViewCompanyComponent } from './admin/view-company/view-company.component'; //edycja firmy
import { HomeComponent } from './home/home.component'; //widok po zalogowaniu
import { AddUserComponent } from './admin/add-user/add-user.component'; //dodanie użytkownika, tylko testy
import { ViewUserComponent } from './admin/view-user/view-user.component'; //edycja użytkownika test
import { GeneratedReportComponent } from './report/generated-report/generated-report.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  //{ path: 'addpro', component: AddSamplingComponent canActivate: [AuthGuard] },
  { path: 'filpro', component: FilterSamplingComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'editpro/:samplingId', component: ViewSamplingComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  //{ path: 'filsam', component: FilterSampleComponent canActivate: [AuthGuard] },
  { path: 'tests', component: TestSampleComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'sample/:sampleId', component: ViewSampleComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'filrec', component: FilterRecipeComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  //{ path: 'addrec', component: AddRecipeComponent canActivate: [AuthGuard] },
  { path: 'addrep', component: AddReportComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'filrep', component: FilterReportComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'report/:reportId', component: ViewReportComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'generated/:reportId', component: GeneratedReportComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'labrats', component: ListLabratComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  //{ path: 'addlab', component: AddLabratComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'labrat/:labratId', component: ViewLabratComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'clients', component: ListClientComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  //{ path: 'addcli', component: AddClientComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'client/:clientId', component: ViewClientComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'formfields', component: ListFormfieldComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'filcomp', component: FilterCompanyComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  //{ path: 'addcomp', component: AddCompanyComponent canActivate: [AuthGuard] },
  { path: 'company/:companyId', component: ViewCompanyComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },
  { path: 'recipe/:recipeId', component: ViewRecipeComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' },

  { path: 'addusr', component: AddUserComponent, /*canActivate: [AuthGuard]*/ }, //tylko do testów
  { path: 'user/:userId', component: ViewUserComponent }, //testy
  { path: '**', redirectTo: '' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
