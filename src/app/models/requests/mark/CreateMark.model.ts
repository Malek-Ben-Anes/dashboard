import {Mark} from "@app/models/Mark.model";

export class CreateMarkRequest {
  studentId: string;
  marks: MarkRequest[];

  constructor(mark: Mark) {
    this.studentId = mark.studentId;
    const markRequest: MarkRequest = new MarkRequest();
    markRequest.lessonId = new LessonId(mark.teacherId, mark.subjectId, mark.groupId);
    markRequest.mark = mark.mark;
    markRequest.observation = mark.observation;
    this.marks = [markRequest];
  }
}

export class MarkRequest {
  lessonId: LessonId;
  mark: number;
  observation: string;
}

export class LessonId {
  teacherId: string;
  subjectId: string;
  groupId: string;

  constructor(teacherId: string, subjectId: string, groupId: string) {
    this.teacherId = teacherId;
    this.groupId = groupId;
    this.subjectId = subjectId;
  }
}
