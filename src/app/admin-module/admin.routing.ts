import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from 'app/content/content.component';
import { Library } from 'app/models/Library';
import { AuthGuardService } from 'app/services/auth/auth-guard.service';
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component';
import { TeacherComponent } from './teacher/teacher/teacher.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { GroupComponent } from './group/group/group.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { StudentComponent } from './student/student/student.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { LessonDetailComponent } from './lesson-list/lesson-detail/lesson-detail.component';
import { MarkComponent } from './marks/marks.component';
import { BulletinComponent } from './student/student/bulletin/bulletin.component';
import { SubjectComponent } from './subject/subject.component';
import { NotificationsComponent } from './notifications/notifications.component';

export class RouterLink {
    public static TEACHERS = 'teachers';
    public static TEACHER_PROFILE = 'teacher-profile';
    public static TEACHER_PROFILE_ID = 'teacher-profile/:id';
    public static STUDENTS = 'students';
    public static STUDENT_PROFILE = 'student-profile';
    public static APP_STUDENT_PROFILE = '/app/student-profile/';
    public static STUDENT_PROFILE_ID = 'student-profile/:id';
    public static SUBJECTS = 'subjects';
    public static GROUPS = 'groups';
    public static GROUP_DETAIL = 'group-detail';
    public static APP_GROUP_DETAIL = '/app/group-detail/';
    public static GROUP_DETAIL_ID = 'group-detail/:id';
    public static LESSONS = 'lessons';
    public static LESSON_DETAIL = 'lesson-detail';
    public static LESSON_DETAIL_ID = 'lesson-detail/:id';
    public static MARKS = 'marks';
    public static BULLETIN = 'bulletin';
    public static MESSAGES = 'messages';
    public static NOTIFICATIONS = 'notifications';
}

const routes: Routes = [
    {
        path: 'app',
        component: ContentComponent,
        children: [
            {
                path: RouterLink.TEACHERS,
                canActivate: [AuthGuardService],
                component: TeacherListComponent,
                data: { expectedRole: Library.ROLE_ADMIN }
            },
            {
                path: RouterLink.TEACHER_PROFILE_ID,
                canActivate: [AuthGuardService],
                component: TeacherComponent,
                data: { expectedRole: Library.ROLE_ADMIN }
            },
            {
                path: RouterLink.TEACHER_PROFILE,
                canActivate: [AuthGuardService],
                component: TeacherComponent,
                data: { expectedRole: Library.ROLE_ADMIN }
            },
            {
                path: RouterLink.STUDENTS,
                canActivate: [AuthGuardService],
                component: StudentListComponent,
                data: { expectedRole: Library.ROLE_ADMIN }
            },
            {
                path: RouterLink.STUDENT_PROFILE_ID,
                canActivate: [AuthGuardService],
                component: StudentComponent,
                data: { expectedRole: Library.ROLE_ADMIN }
            },
            {
                path: RouterLink.STUDENT_PROFILE,
                canActivate: [AuthGuardService],
                component: StudentComponent,
                data: { expectedRole: Library.ROLE_ADMIN }
            },
            {
                path: RouterLink.SUBJECTS,
                canActivate: [AuthGuardService],
                component: SubjectComponent,
                data: { expectedRole: Library.ROLE_ADMIN }
            },
            {
                path: RouterLink.GROUPS,
                canActivate: [AuthGuardService],
                component: GroupListComponent,
                data: { expectedRole: Library.ROLE_ADMIN }
            },
            {
                path: RouterLink.GROUP_DETAIL,
                canActivate: [AuthGuardService],
                component: GroupComponent,
                data: { expectedRole: Library.ROLE_ADMIN }
            },
            {
                path: RouterLink.GROUP_DETAIL_ID,
                canActivate: [AuthGuardService],
                component: GroupComponent,
                data: { expectedRole: Library.ROLE_ADMIN }
            },
            {
                path: RouterLink.LESSONS,
                canActivate: [AuthGuardService],
                component: LessonListComponent,
                data: { expectedRole: Library.ROLE_ADMIN }
            },
            {
                path: RouterLink.LESSON_DETAIL,
                canActivate: [AuthGuardService],
                component: LessonDetailComponent,
                data: { expectedRole: Library.ROLE_ADMIN }
            },
            {
                path: RouterLink.LESSON_DETAIL_ID,
                canActivate: [AuthGuardService],
                component: LessonDetailComponent,
                data: { expectedRole: Library.ROLE_ADMIN }
            },
            {
                path: RouterLink.MARKS,
                canActivate: [AuthGuardService],
                component: MarkComponent,
                data: { expectedRole: Library.ROLE_ADMIN }
            },
            {
                path: RouterLink.BULLETIN,
                canActivate: [AuthGuardService],
                component: BulletinComponent,
                data: { expectedRole: Library.ROLE_ADMIN }
            },
            {
                path: RouterLink.NOTIFICATIONS,
                canActivate: [AuthGuardService],
                component: NotificationsComponent
            },
            {
                path: '',
                canActivate: [AuthGuardService],
                component: StudentListComponent,
                data: { expectedRole: Library.ROLE_ADMIN }
            },
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AdminRoutingStudentModule { }
