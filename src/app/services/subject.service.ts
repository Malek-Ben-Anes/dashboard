import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../models/Teacher';
import { Subject } from '../models/Subject';
import { Gender } from '../models/User';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { reject } from 'q';


//const url: string = 'http://localhost:8090/api/teachers';

const SUBJECT_URL: string = 'https://laplumedor.cfapps.io/api/subjects';
//const SUBJECT_URL: string = 'http://localhost:8090/api/subjects';



@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  
  subjects: Subject[] = [];
  teachers: Subject[] = [];

  constructor(private http: HttpClient) {
    console.log("constructor");
    //this.getTeachers();
  }

  // getTeachers(){
  //   return this.http.get<Teacher[]>(TEACHER_URL).subscribe(
  //     teachers => { 
  //       this.teachers = teachers; 
  //       this.emitTeachers();
  //       console.log(this.teachers);
  //     }, (err: HttpErrorResponse) => {
  //       if (err.error instanceof Error) {
  //         console.log("Client-side error occured.");
  //       } else {
  //         console.log("Server-side error occured.");
  //       }
  //     }
  //   );
  // }
  
  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(SUBJECT_URL);
  }
    /*.subscribe(
      // return of(HEROES);
          teachers => { 
            this.teachers = teachers; 
            this.emitTeachers();
            console.log(this.teachers);
          }
        );*/
  

  getSingleSubject(id: number): Observable<Subject>  {
    return this.http.get<Subject>(SUBJECT_URL + '/' + id);
  }
  
    /*return new Promise((resolve, reject) => {
        let singleTeacher = this.teachers.find((el) => {
            return el.id == id
        })
        if (singleTeacher )
          resolve(singleTeacher);
        else 
          reject("can't find this teacher");
      })
      let SingleTeacher: Teacher = new Teacher();
      this.http.get<Teacher>(url + '/' + id).subscribe( teacher => { 
        SingleTeacher = teacher;
        resolve(SingleTeacher); }*/

  saveSubject(subject: Subject) : Observable<Subject>  {
    return this.http.post<Subject>(SUBJECT_URL, subject);
    
    /*.subscribe(teacherAdded => {
      this.teachers.push(<Teacher>teacherAdded);
      this.emitTeachers();
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    }
    )*/
  }
  updateSubject(subject: Subject) : Observable<Subject>  {

    return this.http.put<Subject>(SUBJECT_URL  + '/' + subject.id, subject);
    // const req = this.http.put<Teacher>(TEACHER_URL, teacher).subscribe( (teacherUpdated: Teacher) => {
    //   let singleTeacher = this.teachers.find((el) => {
    //     return el.id == teacherUpdated.id
    // })
    //   singleTeacher = teacherUpdated;
    //   console.log(singleTeacher);
    //   this.emitTeachers();
    // }, (err: HttpErrorResponse) => {
    //   if (err.error instanceof Error) {
    //     console.log("Client-side error occured.");
    //   } else {
    //     console.log("Server-side error occured.");
    //   }
    // }
    // )
  }




  // createNewTeacher(newTeacher: Teacher) {
  //   this.teachers.push(newTeacher);
  //   this.saveTeacher(newTeacher);
  //   this.emitTeachers();
  // }

  // removeTeacher(teacher: Teacher) {
  //   const teacherIndexToRemove = this.teachers.findIndex(
  //     (teacherElement) => {
  //       if (teacherElement === teacher) {
  //         return true;
  //       }
  //     }
  //   );
  //   this.teachers.splice(teacherIndexToRemove, 1);
  //   //this.saveTeacher(newTeacher);
  //   this.emitTeachers();
  // }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        /*const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.downloadURL);
          }
        );*/
      }
    );
  }

  /*
  
  removeBook(book: Book) {
      if(book.photo) {
        const storageRef = firebase.storage().refFromURL(book.photo);
        storageRef.delete().then(
          () => {
            console.log('Photo removed!');
          },
          (error) => {
            console.log('Could not remove photo! : ' + error);
          }
        );
      }
      const bookIndexToRemove = this.books.findIndex(
        (bookEl) => {
          if(bookEl === book) {
            return true;
          }
        }
      );
      this.books.splice(bookIndexToRemove, 1);
      this.saveBooks();
      this.emitBooks();
  }
  */


}
