import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact } from 'src/app/Models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  public loading:boolean=false
  public contactId:string|null=null;
  public contact:any={} as IContact 
  public errorMessage:string|null=null;

  constructor(private activatedRoute : ActivatedRoute,private contactService:ContactService,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=>{
     this.contactId=param.get("contactId")
    });
    if(this.contactId){
      this.loading=true;
      this.contactService.getContact(this.contactId).subscribe((data)=>{
        this.contact=data;
        this.loading=false;
        
      },(error)=>{
        this.errorMessage=error;
        this.loading=false
      })
    }
    
  }
  public isNotEmpty(){
    return Object.keys(this.contact).length>0
  }
 
  public updateContact(){
   if(this.contactId){
    this.contactService.updateContact(this.contact,this.contactId).subscribe((data)=>{
      this.router.navigate(["/contacts/list"]).then();
   },(error)=>{
     this.errorMessage=error
     this.router.navigate([`/contacts/edit/${this.contactId}`])
   })
   }
   }
}
