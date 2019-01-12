import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

export class ImageService {
/*
  constructor(private http: HttpClient) {}


  public uploadImage(user: User, image: File): Observable<Object> {
    const formData = new FormData();

    formData.append('file', image);

    return this.http.post('http://localhost:8090/profile/upload-picture/' + user.id, formData);
  }*/
}

/* component code 




  selectedFile: ImageSnippet;

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        })
    });

    reader.readAsDataURL(file);
}


    <label class="image-upload-container btn btn-bwm">
      <span>Select Image</span>
      <input #imageInput
             type="file"
             accept="image/*"
             (change)="processFile(imageInput)">
    </label>
    
*/