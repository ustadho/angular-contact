import { ContactService } from './contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  isFetching = false;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.isFetching = true;
    this.contactService.getContacts()
    .subscribe(contacts => {
      this.contacts = contacts;
      this.isFetching = false;
    });
  }
}
