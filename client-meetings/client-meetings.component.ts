import { Component, OnInit } from '@angular/core';
import { MeetingsModel } from '../meetings-model';
import { MeetingsServerService } from '../meetings-server.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-meetings',
  templateUrl: './client-meetings.component.html',
  styleUrls: ['./client-meetings.component.css']
})
export class ClientMeetingsComponent implements OnInit {
  meetingDetails: Array<MeetingsModel> = [];
  constructor(public clientMeetingService: MeetingsServerService) { }

  buttonName = "Schedule Meeting";

  meetingRef = new FormGroup({
    id: new FormControl(),
    meetingTopic: new FormControl(),
    noOfPeople: new FormControl(),
    names: new FormControl(),
    emailId: new FormControl(),
    meetingDate: new FormControl(),
    meetingTime: new FormControl(),
    createdOn: new FormControl(),
    shortDesp: new FormControl(),
    meetingStatus: new FormControl(),

  });


  ngOnInit(): void {
    this.loadMeetingDetails();
    
  }

  loadMeetingDetails(): void {
    this.clientMeetingService.loadMeetingDetails().subscribe({
      next: (data: any) => {
        this.meetingDetails = data;
        console.log(this.meetingDetails);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log("Load All Clients Info")
      }


    })
  }

  

  addMeeting(): void {
    let info = this.meetingRef.value;

    if (this.buttonName == "Update Meeting") {
      this.clientMeetingService.updateClient(info).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          alert("..(1)File Updated Successfully..!");
          this.loadMeetingDetails();
          this.buttonName = "Schedule Meeting";
          let ref = document.getElementById('cancel')
          ref?.click();
        }
      })
    } else {
      this.clientMeetingService.addClient(info).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          alert("..(1)File Created Successfully..!");
          this.loadMeetingDetails();
          this.buttonName = "Schedule Meeting";
        }

      })
    }

    this.meetingRef.reset();


  }

  //this get all the clients information to model form for update
  getMeetingVal(meetingDetails: any): void {

    this.meetingRef.get("id")?.setValue(meetingDetails.id);
    this.meetingRef.get("meetingTopic")?.setValue(meetingDetails.meetingTopic);
    this.meetingRef.get("noOfPeople")?.setValue(meetingDetails.noOfPeople);
    this.meetingRef.get("names")?.setValue(meetingDetails.names);
    this.meetingRef.get("emailId")?.setValue(meetingDetails.emailId);
    this.meetingRef.get("meetingDate")?.setValue(meetingDetails.meetingDate);
    this.meetingRef.get("meetingTime")?.setValue(meetingDetails.meetingTime);
    this.meetingRef.get("createdOn")?.setValue(meetingDetails.createdOn);
    this.meetingRef.get("shortDesp")?.setValue(meetingDetails.shortDesp);
    this.meetingRef.get("meetingStatus")?.setValue(meetingDetails.meetingStatus);
    this.buttonName = "Update Meeting";

  }


  //this deletes client by id
  deleteClient(id: any): void {
    if (confirm("Are you sure? ..Click OK..!, to delete this file permanently...") == true) {
      this.clientMeetingService.deleteClient(id).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          this.loadMeetingDetails();
          alert("..(1)File Deleted Successfully..!");
        }


      })
    }
  }


}


