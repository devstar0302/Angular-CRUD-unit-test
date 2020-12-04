import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];
  member = {};
  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    this.appService.getMembers().subscribe(members => {
      this.members = members;
      console.log(this.members);
    }
    );
  }

  goToAddMemberForm() {
    this.router.navigate(['detail']);
  }

  editMemberByID(id: number) {
      this.router.navigate([`/detail/${id}`]);
  }

  deleteMemberById(id) {
    alert("Are you sure?, This member will be delete permanently")
    this.appService.deleteMember(id);
  }
}
