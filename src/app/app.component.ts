import {
  OnInit,
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  InjectionToken,
  Inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  DoCheck,
  Injector,
} from "@angular/core";
//import { HttpClient, HttpParams } from "@angular/common/http";
import { Course } from "./model/course";
//import { COURSES } from "../db-data";
import { CourseCardComponent } from "./courses/course-card/course-card.component";
import { HighlightedDirective } from "./courses/directives/highlighted.directive";
import { Observable } from "rxjs";
import { CoursesServiceService } from "./courses/courses-service.service";
import { HttpClient } from "@angular/common/http";
import { AppConfig, CONFIG_TOKEN } from "src/config";
import { createCustomElement } from "@angular/elements";
import { CourseTitleComponent } from "./course-title/course-title.component";

//provider factory function when have to do manually
// function courseServiceProviderFactoryFunc(
//   http: HttpClient
// ): CoursesServiceService {
//   return new CoursesServiceService(http);
// }

//Unique identifier, using export so that using this identifier we can use it in another component
// export const COURSES_SERVICE = new InjectionToken<CoursesServiceService>(
//   "COURSES_SERVICE"
// );

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
  // providers: [
  //   {
  //     provide: COURSES_SERVICE,
  //     useFactory: courseServiceProviderFactoryFunc,
  //     deps: [HttpClient],
  //   },
  // ],
})
export class AppComponent implements OnInit, AfterViewInit, DoCheck {
  //courses: Course[];
  courses$: Observable<Course[]>;

  coursesTotal: number = 0;

  loaded: boolean = false;

  myStr: string = "abcdefghijk";

  object: { [key: number]: string } = { 2: "foo", 1: "bar" };

  map = new Map([
    [2, "foo"],
    [1, "bar"],
  ]);

  //@ViewChild(HighlightedDirective) highlighted: HighlightedDirective;
  @ViewChild(CourseCardComponent, { read: HighlightedDirective })
  highlighted: HighlightedDirective;

  @ViewChild("viewChildContainer")
  container: ElementRef;

  @ViewChildren(CourseCardComponent, { read: ElementRef })
  cards: QueryList<ElementRef>;

  constructor(
    private coursesService: CoursesServiceService,
    @Inject(CONFIG_TOKEN) private config: AppConfig,
    private cd: ChangeDetectorRef,
    private injector: Injector
  ) { }

  //constructor(private coursesService: CoursesServiceService) {}
  // constructor(
  //   @Inject(COURSES_SERVICE) private coursesService: CoursesServiceService
  // ) {}

  ngOnInit() {
    //const params = new HttpParams().set("page", "1").set("pageSize", "10");

    // this.http
    //   .get("/api/courses", { params })
    //   .subscribe((courses: any) => (this.courses = courses.payload));
    this.courses$ = this.coursesService.loadCourses();
    this.loaded = true;

    const htmlElement = createCustomElement(CourseTitleComponent, { injector: this.injector});
    customElements.define('course-title', htmlElement);
  }

  ngDoCheck() {
    if (this.loaded) {
      this.cd.markForCheck();
      console.log("calling cd.markForCheck()")
      this.loaded = undefined;
    }
  }

  ngAfterViewInit() {
    console.log(this.container);
    console.log(this.cards);
    console.log(this.cards.first);
    // this.cards.changes.subscribe((r) =>
    //   console.log("length >>>" + this.courses.length)
    // );

    console.log(this.highlighted);
  }

  onCourseSelected(course: Course) {
    console.log("App component called", course);
    //this.courses = this.courses.filter((c) => c.id !== course.id); // this is to check this.cards.changes.subscribe(r => console.log("length >>>" + this.courses.length))
  }

  onToggle(isHighlighted: boolean) {
    console.log(isHighlighted);
  }

  save(course: Course) {
    this.coursesService
      .saveCourse(course)
      .subscribe(() => console.log("Course saved!"));
  }

  onEditCourse() {
    // const newCourse: any = {...this.courses[0]}
    // newCourse.discription = "New Value";
    // this.courses[0] = newCourse;
  }
}
