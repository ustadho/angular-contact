import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirm } from './shared/ngbd-modal-confirm';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ContactDetailComponent,
    NgbdModalConfirm
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NgbdModalConfirm]
})
export class AppModule { }
