import { Component, OnInit } from '@angular/core';
import { ClientDetailsService } from '../client-details.service';
import { ClientsDetails } from '../clients-details';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { ClientModal } from '../client-modal';

@Component({
  selector: 'app-clients-details',
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.css']
})
export class ClientsDetailsComponent implements OnInit {
   info: Array<ClientModal> = [];
  constructor(public api: ApiService) { }

  buttonName = "Add Client";


  clientRef = new FormGroup({
    id: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    emailId: new FormControl(),
    city: new FormControl(),
    mobile: new FormControl(),

  })

  ngOnInit(): void {
    this.loadClientsInfo();

  }

  loadClientsInfo(): void {
    this.api.loadClietsInfo().subscribe({
      next: (data: any) => {
        this.info = data;
        console.log(this.info);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log("Load All Clients Info")
      }


    })
  }

  addClient(): void {
    let info = this.clientRef.value;

    if (this.buttonName == "Update Client") {
      this.api.updateClient(info).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          alert("..(1)File Updated Successfully..!");
          this.loadClientsInfo();
          this.buttonName = "Add Client";
          let ref = document.getElementById('cancel')
          
          ref?.click();
          
        }
        
      })
    } else {
      this.api.addClient(info).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          alert("..(1)File Created Successfully..!");
          this.loadClientsInfo();
          this.buttonName = "Add Client";
        }

      })
    }

    this.clientRef.reset();


  }

  //this get all the clients information to model form for update
  getClientsVal(info: any): void {

    this.clientRef.get("id")?.setValue(info.id);
    this.clientRef.get("firstName")?.setValue(info.firstName);
    this.clientRef.get("lastName")?.setValue(info.lastName);
    this.clientRef.get("emailId")?.setValue(info.emailId);
    this.clientRef.get("city")?.setValue(info.city);
    this.clientRef.get("mobile")?.setValue(info.mobile);
    this.buttonName = "Update Client";

  }


  //this deletes client by id

  deleteClient(id: any): void {
    if (confirm("Are Sure? ..Click OK..!, to delete this file permanently...") == true) {
      this.api.deleteClient(id).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          this.loadClientsInfo();
          alert("..(1)File Deleted Successfully..!");
        }


      })
    }
  }


}