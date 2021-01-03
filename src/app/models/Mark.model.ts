export class Mark {
    id: string;
    studentId: string;
    lesson: Lesson;
    observation: string;
    mark: number;
    updatable: boolean;
    createdAt: Date;
    updatedAt: Date;
}
class Lesson {
  subjectName: string;
  teacherName: string;
  groupName: string;
}
