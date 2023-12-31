import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './guards/auth.guard';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    UsersComponent,
    RegisterComponent,
    MemberListComponent,
    MessagesComponent,
    MemberDetailComponent,
    ListsComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    NgxSpinnerModule.forRoot({ type: 'line-scale-party' }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
          { path: 'members', component: MemberListComponent },
          { path: 'members/:username', component: MemberDetailComponent },
          { path: 'member/edit', component: MemberEditComponent, canDeactivate: [preventUnsavedChangesGuard] },
          { path: 'lists', component: ListsComponent },
          { path: 'messages', component: MessagesComponent }
        ]
      },      
      { path: 'users', component: UsersComponent },
      { path: 'errors', component: TestErrorComponent },
      { path: 'not-found', component: NotFoundComponent },
      { path: 'server-error', component: ServerErrorComponent },
      { path: "**", component: HomeComponent, pathMatch: "full" }
    ]),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
