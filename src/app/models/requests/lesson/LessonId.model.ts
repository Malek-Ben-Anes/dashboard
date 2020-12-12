export class LessonIdRequest {
    teacherId: string;
    subjectId: string;
    groupId: string;

    constructor(_teacherId: string, _subjectId: string, _groupId: string) {
      this.teacherId = _teacherId;
      this.subjectId = _subjectId;
      this.groupId = _groupId;
    }
}
