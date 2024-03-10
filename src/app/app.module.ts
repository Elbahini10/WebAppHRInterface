import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { AddComponent } from './component/home/Employeur/add/add.component';
import { ListComponent } from './component/home/Employeur/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './component/home/Employeur/profile/profile.component';
import { UpdateEmployeurComponent } from './component/home/Employeur/alert/update-employeur/update-employeur.component';
import { DeleteEmployeurComponent } from './component/home/Employeur/alert/delete-employeur/delete-employeur.component';
import { LoginComponent } from './component/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { CompteUserComponent } from './component/compte-user/compte-user.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { CodeConfirmationComponent } from './component/forgot-password/code-confirmation/code-confirmation.component';
import { UpdatePasswordComponent } from './component/forgot-password/update-password/update-password.component';
import { ListStagiairesComponent } from './component/home/Stagiaires/list-stagiaires/list-stagiaires.component';
import { AddStagiairesComponent } from './component/home/Stagiaires/add-stagiaires/add-stagiaires.component';
import { PlanningComponent } from './component/home/planing/planning/planning.component';
import { ListPlaningComponent } from './component/home/planing/list-planing/list-planing.component';
import { CreateBadgeComponent } from './component/home/Badg/create-badge/create-badge.component';
import { QRCodeModule } from 'angularx-qrcode';
import { PageBadgForEmployeurComponent } from './component/home/Badg/page-badg-for-employeur/page-badg-for-employeur.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ResultNotFoundComponent } from './component/home/alert/result-not-found/result-not-found.component';
import { CongeComponent } from './component/home/conge/conge.component';
import { AddCongeComponent } from './component/home/conge/add-conge/add-conge.component';
import { TravailComponent } from './component/home/Attestation/travail/travail.component';
import { SalaireComponent } from './component/home/Attestation/salaire/salaire.component';
import { StageComponent } from './component/home/Attestation/stage/stage.component';
import { RemboursementMutuelComponent } from './component/remboursement-mutuel/remboursement-mutuel.component';
import { PersonnelComponent } from './component/remboursement-mutuel/personnel/personnel.component';
import { DestinationComponent } from './component/remboursement-mutuel/destination/destination.component';
import { PageComponent } from './component/home/page/page.component';
import { BordereauxEnvoiComponent } from './component/remboursement-mutuel/bordereaux-envoi/bordereaux-envoi.component';
import { SalaireEmployeurComponent } from './component/home/Employeur/salaire-employeur/salaire-employeur.component';
import { AlertSuccessComponent } from './component/home/alert/alert-success/alert-success.component';



const route: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'PageEmployeur', component: PageBadgForEmployeurComponent },
  { path: 'ForgotPassword', component: ForgotPasswordComponent },
  { path: 'CodeConfirmation', component: CodeConfirmationComponent },
  { path: 'UpdatePassword', component: UpdatePasswordComponent },
  { path: '', component: LoginComponent },

  {
    path: 'home', component: HomeComponent,
    // canActivate: [AuthenticationGuard],
    children: [
      { path: 'CreateEmploye', component: AddComponent },
      { path: 'AttestationTravail', component: TravailComponent },
      { path: 'AttestationSalaire', component: SalaireComponent },
      { path: 'SalaireEmployer', component: SalaireEmployeurComponent },
      { path: 'AttestationStage', component: StageComponent },
      { path: 'ListEmploye', component: ListComponent },
      { path: 'ListStagiaire', component: ListStagiairesComponent },
      { path: 'CreateStagiaire', component: AddStagiairesComponent },
      { path: 'Planing', component: PlanningComponent },
      { path: 'ListPlaning', component: ListPlaningComponent },
      { path: 'CreateBadg', component: CreateBadgeComponent },
      { path: 'conge', component: CongeComponent },
      { path: 'RemboursementMutuel', component: RemboursementMutuelComponent },
      { path: 'RemboursementMutuel/personnel', component: PersonnelComponent },
      { path: 'RemboursementMutuel/destination', component: DestinationComponent },
      { path: 'RemboursementMutuel/bordereaux-envoi', component:  BordereauxEnvoiComponent},
      { path: 'Page', component: PageComponent },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AddComponent,
    ListComponent,
    ProfileComponent,
    UpdateEmployeurComponent,
    DeleteEmployeurComponent,
    LoginComponent,
    CompteUserComponent,
    ForgotPasswordComponent,
    CodeConfirmationComponent,
    UpdatePasswordComponent,
    ListStagiairesComponent,
    AddStagiairesComponent,
    PlanningComponent,
    ListPlaningComponent,
    CreateBadgeComponent,
    PageBadgForEmployeurComponent,
    ResultNotFoundComponent,
    CongeComponent,
    AddCongeComponent,
    TravailComponent,
    SalaireComponent,
    StageComponent,
    RemboursementMutuelComponent,
    PersonnelComponent,
    DestinationComponent,
    PageComponent,
    BordereauxEnvoiComponent,
    SalaireEmployeurComponent,
    AlertSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(route),
    QRCodeModule,
    NgxExtendedPdfViewerModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
