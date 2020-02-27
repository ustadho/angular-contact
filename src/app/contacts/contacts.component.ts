import { Router } from '@angular/router';
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

  constructor(
    private contactService: ContactService,
    private router: Router) { }

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

  onUpdate(id: number) {
    this.contactService.getContact(id)
    .subscribe(c => {
      console.log('contact detail: ', c);
    });
  }

  onAdd() {
    this.router.navigate(['/contacts/new']);
  }
}
