import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IContact } from '../Models/IContact';
import { IGroup } from '../Models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private  serverUrl:string=" http://localhost:9000"

  constructor(private httpClient : HttpClient) { }

//Get All Contacts
  public getAllContacts():Observable<IContact[]>{
    let dataURL:string=`${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError));
  }

//Get single contact
  public getContact(contactId:string):Observable<IContact[]>{
    let dataURL:string=`${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError));
  }

  //Add Contact
  public createContact(contact:IContact):Observable<IContact>{
    let dataURL:string=`${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataURL,contact).pipe(catchError(this.handleError));;

  }
 
  //Update Contact
  public updateContact(contact:IContact,contactId:string):Observable<IContact>{
    let dataURL:string=`${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataURL,contact).pipe(catchError(this.handleError));;

  }

  //Delete Contact
  public deleteContact(contactId:string):Observable<{}>{
    let dataURL:string=`${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handleError));;

  }

  //Get All Groups
  public getAllGroups():Observable<IGroup[]>{
    let dataURL:string=`${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError));
  }
  //Get Single Group
  public getGroup(contact:IContact):Observable<IGroup[]>{
    let dataURL:string=`${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError));
  }
  

//Error Handling
  public handleError(error:HttpErrorResponse){
    let errorMessage:string="";
    if(error.error instanceof ErrorEvent){
      errorMessage=`Error:${error.error.message}`
    }
    else{
      errorMessage=`Status:${error.status}\nMessage:${error.message}`;
    }
    return throwError(errorMessage);
  }
}



