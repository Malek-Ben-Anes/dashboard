import {Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild} from '@angular/core';
import {Student} from '@app/models/Student.model';
import {MarkService} from '@app/services/mark.service';
import {Mark} from '@app/models/Mark.model';
import {Lesson} from '@app/models/Lesson.model';
import {TranslateService} from '@ngx-translate/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-group-marks-student-detail',
  templateUrl: './group-marks-student-detail.component.html',
  styleUrls: ['./group-marks-student-detail.component.scss'],
})
export class GroupMarksStudentDetailComponent implements OnInit, OnChanges {
  @Input('student')
  student: Student;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // marks to be displayed after filtering action.
  studentMarks: Mark[] = [];

  dataSource = new MatTableDataSource<Mark>();
  displayedColumns: string[] = ['subjectName', 'teacherName', 'mark', 'observation', 'updatedAt'];

  isLoading = false;

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
    this.isLoading = true;
    this.markService.findAll(studentId).subscribe((marks) => {
      this.studentMarks = marks.reverse();
      this.refershPaginator();
    });
  }

  private refershPaginator() {
    this.isLoading = false;
    this.dataSource = new MatTableDataSource<Mark>(this.studentMarks);
    this.dataSource.paginator = this.paginator;
  }
}
