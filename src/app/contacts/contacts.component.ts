import { AppConstant } from './../shared/app.constant';
import { NgbdSortableHeader, SortEvent, compare } from './../shared/ngbd-sortable-header';
import { Router } from '@angular/router';
import { ContactService } from './contact.service';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
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
    private modalService: NgbModal) { }
    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  ngOnInit(): void {
    this.getContacts('id', 'asc');
  }

  getContacts(col: string, direction: string): void {
    this.isFetching = true;
    this.contactService.getContacts(col, direction)
      .subscribe(contacts => {
        this.contacts = contacts;
        this.isFetching = false;
      },
      err => console.log('Error on fetching data : ' + err)
      );
  }

  onUpdate(id: number) {
    this.contactService.getContact(id)
      .subscribe(c => {

      });
  }

  onAdd() {
    this.router.navigate(['/contacts/new']);
  }

  onDelete(c: Contact) {
    const modalRef = this.modalService.open(NgbdModalConfirm);
    modalRef.componentInstance.contact = c;
    modalRef.componentInstance.confirmationBoxTitle = AppConstant.MODAL_CONFIRMATION_TITLE;
    modalRef.componentInstance.confirmationMessage = AppConstant.MODAL_CONFIRMATION_MESSAGE;

    modalRef.result
      .then((userResponse) => {
        console.log(`User's choice: ${userResponse}`);
        if (userResponse === 'Ok') {
          this.contactService.delete(c.id)
            .subscribe(() => {
              this.getContacts('id', 'asc');
              // this.onSort({column, direction}: SortEvent);
            });
        }
      })
      .catch(err => console.log(`User's choice: ${err}`));
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.getContacts(column, direction);
  }
}
