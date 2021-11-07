import {Component, OnInit, Input} from '@angular/core';

import {BASE_URL} from '@app/app.component';
import {FileUploadService} from '@app/services/file-upload.service';
import {User} from '@app/models/User';
import {Url} from '@app/models/shared';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  BASE_URL: string = BASE_URL;

  @Input('user') user: User;

  selectedFile: File
  isUploading = false;

  constructor(private userService: UserService) { }

  ngOnInit() {}

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.isUploading = true;
    this.userService.uploadPhoto(this.user, this.selectedFile)
        .then((data: any) => {
          this.user.photo = data.body.url + '?random+\=' + Math.random();
          this.isUploading = false;
        })
        .catch((err) => {
          alert(err); this.isUploading = false;
        });
  }
}
