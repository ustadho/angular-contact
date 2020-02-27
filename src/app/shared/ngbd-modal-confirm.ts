import { Contact } from './../contacts/contact.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Delete confirmation</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">{{contact.fullName}} </span>?</strong></p>
    <p>All information associated to this will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel')"> Cancel </button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok')"> Ok </button>
  </div>
  `
})
export class NgbdModalConfirm {
  @Input() contact: Contact;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(public modal: NgbActiveModal) {}

  passBack() {
    this.modal.close(this.contact);
  }
}
