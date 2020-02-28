import { customValidationService } from './../../validator/custom-validation.service';
import { ContactService } from './../contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { phoneNumberValidator } from 'src/app/validator/phone-validator';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  subscription: Subscription;


  // if we use, we must set value all of the attribut below when interpolate the data
  contactForm = new FormGroup({
    id: new FormControl(null),
    fullName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z ]*$/)
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[+]?\d+$/)
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.maxLength(100)
    ])
  });
  editMode = false;
  editId: number;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id > 0) {
      this.getContact(id);
    }
  }

  getContact(id: number): void {
    this.editId = id;
    this.editMode = id > 0 ? true : false;
    this.contactService.getContact(id)
    .subscribe(c => {
      this.contactForm.setValue({
        id: c.id, // ID also have to set due to we already declare as FormGroup
        fullName: c.fullName,
        phoneNumber: c.phoneNumber,
        address: c.address
      });
    });
  }

  onSubmit() {
    console.log('onSumbit()', this.contactForm.value);
    this.contactService.save(this.contactForm.value)
    .subscribe( res => {
      console.log(res);
      this.router.navigate(['../'], {relativeTo: this.route}); // up to 1 level
    });
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route}); // up to 1 level
  }

  get phoneNumber() {
    return this.contactForm.get('phoneNumber');
  }

  get fullName() {
    return this.contactForm.get('fullName');
  }

  get address() {
    return this.contactForm.get('address');
  }
}
