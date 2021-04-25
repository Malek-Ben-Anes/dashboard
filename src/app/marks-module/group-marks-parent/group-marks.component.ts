import { Component, Input, OnInit } from "@angular/core";
import { Profile } from "@app/models/enums/Profile";
import { Group } from "@app/models/Group.model";
import { Lesson } from "@app/models/Lesson.model";
import { Student } from "@app/models/Student.model";
import { Teacher } from "@app/models/Teacher.model";
import { User } from "@app/models/User";
import { AuthService } from "@app/services/auth/auth.service";
import { TokenStorageService } from "@app/services/auth/token-storage.service";
import { LessonService } from "@app/services/lesson.service";

@Component({
  selector: "app-group-marks",
  templateUrl: "./group-marks.component.html",
  styleUrls: ["./group-marks.component.scss"],
})
export class GroupMarksComponent implements OnInit {
  @Input("showForm")
  showForm: boolean;

  @Input()
  group: Group;

  student: Student;

  lessons: Lesson[];

  loggedInTeacher: User;

  constructor(
    private lessonSerivce: LessonService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
  ) {}

  ngOnInit() {
    if (this.authService.getIsLoggedUser()) {
      const loggedUser: Teacher = this.tokenStorage.getLoggedUser() as Teacher;
      this.loggedInTeacher = loggedUser.type == Profile.TEACHER ? loggedUser : undefined;
    }
    const teacherId: string = this.loggedInTeacher ? this.loggedInTeacher.id : undefined;
    this.lessonSerivce.search(teacherId, this.group.id).then((lessons) => {
      this.lessons = lessons;
    });
  }

  async onStudentSelected(event) {
    this.student = event;
  }
}
