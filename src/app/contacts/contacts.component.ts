import { Router } from '@angular/router';
import { ContactService } from './contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirm } from '../shared/ngbd-modal-confirm';

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
    private router: Router,
    private _modalService: NgbModal) { }

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

  onDelete(c: Contact) {
    const modalRef = this._modalService.open(NgbdModalConfirm);
    modalRef.componentInstance.contact = c;
    modalRef.componentInstance.confirmationBoxTitle = 'Confirmation?';
    modalRef.componentInstance.confirmationMessage = 'Do you want to cancel?';

    modalRef.result
      .then((userResponse) => {
        console.log(`User's choice: ${userResponse}`);
        if (userResponse === 'Ok') {
          this.contactService.delete(c.id)
            .subscribe(() => {
              this.getContacts();
            });
        }
      })
      .catch(err => console.log(`User's choice: ${err}`));
  }
}
