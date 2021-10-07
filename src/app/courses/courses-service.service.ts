import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../model/course";

@Injectable()
// @Injectable({
//   providedIn: "root",
// })
// In case if we are creating dependency injection manually then above can be commented
export class CoursesServiceService {
  constructor(private httpClient: HttpClient) {}

  loadCourses(): Observable<Course[]> {
    const params = new HttpParams().set("page", "1").set("pageSize", "10");
    return this.httpClient.get<Course[]>("/api/courses", { params });
  }

  saveCourse(course: Course) {
    const headers = new HttpHeaders().set("X-Auth", "userId");
    return this.httpClient.put(`/api/courses/${course.id}`, course, {
      headers,
    });
  }
}
