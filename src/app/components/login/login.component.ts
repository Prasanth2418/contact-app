import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public loginForm! :FormGroup;
public showType:string="password"
  constructor(private formBuilder:FormBuilder,private router :Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:[""],
      password:[""]
    })
  }
  login(){
    this.http.get<any>("http://localhost:9000/signup").subscribe(res=>{
      const user = res.find((a:any)=>{
       return a.email===this.loginForm.value.email && a.password===this.loginForm.value.password
      })
      if(user){
        alert("Login Success")
        this.loginForm.reset();
        this.router.navigate(["/contacts/list"])
      }
      else{
        alert("user not found")
      }
    },(error)=>{
      alert("something went wrong")
    })
  }
  public showPassword(event:any):void{
    if(event.target.checked){
      this.showType="text"
    }
    else{
      this.showType="password"
    }
  }
}
