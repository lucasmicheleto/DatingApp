import { Component, Inject, Input, OnInit } from '@angular/core';
import { Member } from '../member';
import { FileUploader } from 'ng2-file-upload';
import { AccountService } from 'src/app/services/account.service';
import { take } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit{
  @Input() member!: Member
  uploader!: FileUploader
  hasBaseDropZoneOver = false
  user!: User

  constructor(private accountService: AccountService, @Inject('BASE_URL') private baseUrl: string) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
        }
      }
    })
  }
  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e:any){
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl+"api/users/add-photo",
      authToken: "Bearer "+this.user.token,
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, res, state, headers) => {
      if(res){
        const photo = JSON.parse(res);
        this.member.photos.push(photo);
      }
    }
  }
}
