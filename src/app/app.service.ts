import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  api = 'http://localhost:3000';
  username: string;
  isLoggedin = false;
  constructor(private http: HttpClient, private router: Router) {
  
  }

  // Returns all members
  getMembers() {
    return this.http.get(`${this.api}/members`)
    .pipe(catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
    if (this.username) {
      this.isLoggedin = true;
    }
  }

  addMember(memberForm) {}
  editMember(id) {
    return this.http.get(`${this.api}/members/${id}`).pipe(catchError(this.handleError));
  }
  getTeams() {
    return this.http.get(`${this.api}/teams`)
    .pipe(catchError(this.handleError));
    
  }

  updateMember(id, data) {
    return this.http.patch(`${this.api}/members/${id}`, data).subscribe(res => {
      this.router.navigate(['members']);
    })
  }

  saveMember(data: Object) {
    return this.http.post(`${this.api}/members`, data).subscribe(res => {
      this.router.navigate(['members']);
    })
  }

   deleteMember(id) {
    this.http.delete(`${this.api}/members/${id}`).subscribe(res => {
      location.reload();
    })
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
