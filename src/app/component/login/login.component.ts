import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/Login/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Forms_Login_SingIn!: FormGroup
  MsgErros!: String
  inputTypes: String = "password"
  MsgErrors: String | undefined
  Btn_Change_Page_Login_Or_SingIn : boolean = false
  constructor(private fb: FormBuilder, private authService: AuthService , private router : Router) { }
  ngOnInit(): void {

    this.Forms_Login_SingIn = this.fb.group({
      username: this.fb.control(null , Validators.required  ),
      mdp: this.fb.control(null , Validators.required),


      firstname : this.fb.control(null),
      lastname : this.fb.control(null),
      C_Mdp : this.fb.control(null),
      Roles : this.fb.control(null),


    })



  }

  public On_sumbit_Login() {
    let user = this.Forms_Login_SingIn.value.username
    let mdp = this.Forms_Login_SingIn.value.mdp
    if ((user == undefined) && (mdp == undefined)) this.MsgErrors = "Vous devez renseigner votre nom d'utilisateur et votre mot de passe ? "
    this.authService.Login(user, mdp).subscribe({
      next: (appUser) => {
        this.authService.authenticateUser(appUser).subscribe({
          next: (data) => {
            this.router.navigateByUrl("/home")
          },
          error: (err) => {
            this.MsgErrors = err
          },
        })
      },
      error: (err) => {
        this.MsgErrors = err
      },
    })
  }

  //   public On_sumbit_Login() {
  //   let user = this.Forms_Login_SingIn.value.username
  //   let mdp = this.Forms_Login_SingIn.value.mdp
  //   if ((user == undefined) && (mdp == undefined)) this.MsgErrors = "Vous devez renseigner votre nom d'utilisateur et votre mot de passe ? "
  //   this.authService.Login(user, mdp).subscribe({
  //     next: (data) => {
  //       this.authService.authenticateUser(data).subscribe({
  //         next : (users) => {
  //           this.router.navigateByUrl("/home/Page")
  //         }
  //       })
  //     },
  //     error: (err) => {
  //       this.MsgErrors = err
  //     },
  //   })
  // }




  // Configuration Authentication Spring Security JWT Whit Angular

  //   public On_sumbit_Login() {
  //   let user = this.Forms_Login_SingIn.value.username
  //   let mdp = this.Forms_Login_SingIn.value.mdp
  //   if ((user == undefined) && (mdp == undefined)) this.MsgErrors = "Vous devez renseigner votre nom d'utilisateur et votre mot de passe ? "
  //   this.authService.LoginJWT(user, mdp).subscribe({
  //     next: (data) => {
  //       console.log(data)
  //     },
  //     error: (err) => {
  //       console.log(err);

  //     },
  //   })
  // }


  ChangeInputToText() {
    this.inputTypes = "text"
  }
  ChangeInputToPassword() {
    this.inputTypes = "password"
  }
  CloseAlertErrors() {
    this.MsgErrors = undefined
  }



  func_Change_Page_To_SingIn()
  {
    this.Btn_Change_Page_Login_Or_SingIn = true
  }


  func_Change_Page_To_Login()
  {
    this.Btn_Change_Page_Login_Or_SingIn = false
  }


  On_Submit_For_SingIn()
  {

    let firstname = this.Forms_Login_SingIn.value.firstname
    let lastname = this.Forms_Login_SingIn.value.lastname

    let mdp = this.Forms_Login_SingIn.value.mdp
    let username = this.Forms_Login_SingIn.value.username

    let C_Mdp = this.Forms_Login_SingIn.value.C_Mdp
    let Roles = this.Forms_Login_SingIn.value.Roles

    if(mdp === C_Mdp)
    {
      this.authService.Check_User_If_Not_Existe(username).subscribe({
        next : (data) => {
          if(data)
          {
            this.MsgErrors = "Vous êtes déjà inscrit ! "
          }else{
            const data1 = {firstname,lastname,username,mdp,Roles}
            this.authService.Create_User(data1).subscribe({
              next : () => {
                this.func_Change_Page_To_Login()
              },
              error : (err) =>  {
                  this.MsgErrors = err
              },
            })
          }
        },
        error : (err) =>  {
            this.MsgErrors = err
        },
      })
    }else{
      this.MsgErrors = "Vérifier et confirmer le mot de passe ! "
    }

  }


}
