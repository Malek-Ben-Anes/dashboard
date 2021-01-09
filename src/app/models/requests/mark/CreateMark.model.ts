export class CreateMarkRequest {
    studentId: string;
    marks: Mark[];
}

class Mark {
    lessonId: lessonId;
    mark: number;
    observation: string;
}

class lessonId {
    teacherId: string;
    subjectId: string;
    groupId: string;
}