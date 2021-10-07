import {
  AfterContentInit,
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
} from "@angular/core";

import { Course } from "../../model/course";
import { CoursesServiceService } from "../courses-service.service";
import { CourseImageComponent } from "../course-image/course-image.component";

@Component({
  selector: "course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardComponent implements OnInit, AfterContentInit {
  @Input() course: Course;

  @Input() cardIndex: number;

  @Input() noImageTpl: TemplateRef<any>;

  //@Output("courseViewed") courseEmitter = new EventEmitter<Course>();

  @Output("courseChanged")
  courseEmitter = new EventEmitter<Course>();

  @ContentChild("courseCardProjection")
  projPara: ElementRef;

  @ContentChildren(CourseImageComponent, { read: ElementRef })
  images: QueryList<ElementRef>;

  constructor(@Attribute('type') private type: string, private courseService: CoursesServiceService) {
    console.log(this.type)
  }

  ngOnInit(): void {}

  ngAfterContentInit() {
    console.log("projPara", this.projPara);
    console.log("images", this.images);
  }

  onCourseViewed() {
    this.courseEmitter.emit(this.course);
  }

  onCourseSave(description) {
    this.courseEmitter.emit({ ...this.course, description });
  }

  onTitleUpdate(title: string) {
    this.course.description = title;
  }

  cardClasses() {
    if (this.course.category === "BEGINNER") {
      return "beginner";
    }
  }

  cardStyles() {
    if (this.course.category === "INTERMEDIATE") {
      return {
        "font-weight": "bold",
      };
    }
  }
}
