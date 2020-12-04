import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';

// This interface may be useful in the times ahead...
interface Member {
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];
  state: String;
  memberid: String;
  member = {};
  team: any;
  update: Boolean;
  active = true;
  constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private route: ActivatedRoute) {
    this.createForm();
    this.memberid = this.route.snapshot.paramMap.get("id");
    
  }

  ngOnInit() {
    if (this.memberid) {
      this.update = true;
      this.appService.editMember(this.memberid).subscribe(data => {
        this.member = data;
        this.team = data['team'];
        console.log(this.team)
        this.state = data['status'];
      })
    }
    this.appService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  ngOnChanges() {}

  createForm() {
    this.memberForm = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      jobTitle: ['', Validators.required],
      team: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onItemChange(state) {
    this.state = state;
  }

  // TODO: Add member to members
  onSubmit(form: FormGroup) {
   
    if (this.memberid) {
      this.memberModel = form.value;
      this.appService.updateMember(this.memberid, this.memberModel);
    }
    else {
      this.memberModel = form.value;
      
      this.appService.saveMember(this.memberModel);
    }

  }
}
