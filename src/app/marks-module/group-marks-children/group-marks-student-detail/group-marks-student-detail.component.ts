import {Component, OnInit, Input, SimpleChanges, OnChanges} from '@angular/core';
import {Student} from '@app/models/Student.model';
import {MarkService} from '@app/services/mark.service';
import {Mark} from '@app/models/Mark.model';
import {Lesson} from '@app/models/Lesson.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-group-marks-student-detail',
  templateUrl: './group-marks-student-detail.component.html',
  styleUrls: ['./group-marks-student-detail.component.scss'],
})
export class GroupMarksStudentDetailComponent implements OnInit, OnChanges {
  @Input('student')
  student: Student;

  allMarks: Mark[];
  // marks to be displayed after filtering action.
  studentMarks: Mark[];

  constructor(private markService: MarkService, private translate: TranslateService) { }

  ngOnInit() {
    if (this.student) {
      this.findMarks(this.student.id);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.student && changes.student.currentValue) {
      this.student = changes.student.currentValue;
      this.findMarks(this.student.id);
    }
  }

  filterMarks(studentId: string) {
    this.studentMarks = this.allMarks.filter((mark: Mark) => mark.studentId == studentId);
  }

  onSelectWeek(week: Lesson) {
    console.log(week);
  }

  getMarkStyle(mark) {
    if (mark <= 10) {
      return 'red-color';
    } else if (mark > 10 && mark <= 15) {
      return 'blue-color';
    } else {
      return 'green-color';
    }
  }

  private findMarks(studentId: string) {
    this.markService.findAll(studentId).subscribe((marks) => {
      this.allMarks = marks;
      this.filterMarks(this.student.id);
    });
  }
}
