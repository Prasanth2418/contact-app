import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/Models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading:boolean=false
  public contact:any={} as IContact
  public errorMessage:string|null=null;

  constructor( private contactService : ContactService,private router:Router) { }

  ngOnInit(): void {
  }
 public createContact(){

  this.contactService.createContact(this.contact).subscribe((data)=>{
    this.router.navigate(["/contacts/list"]).then();
 },(error)=>{
   this.errorMessage=error
   this.router.navigate(["/contacts/add"])
 })
 
 }
}
