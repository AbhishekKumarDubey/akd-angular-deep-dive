import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from "@angular/core";

@Directive({
  selector: "[highlighted]",
  exportAs: "hl",
})
export class HighlightedDirective {
  @Input("highlighted") isHighlighted = false;

  @Output() toggleHighlight = new EventEmitter();

  constructor() {}

  // @HostBinding("className")
  // get cssClasses() {
  //   return "highlighted";
  // }

  @HostBinding("class.highlighted")
  get cssClasses() {
    return this.isHighlighted;
  }

  @HostListener("mouseover", ["$event"])
  mouseOver($event) {
    console.log($event);
    this.isHighlighted = true;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  @HostListener("mouseleave")
  mouseLeave() {
    this.isHighlighted = false;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  // @HostBinding("attr.disabled")
  // get disabled() {
  //   return true;
  // }

  // @HostBinding('style.border')
  // get cssClasses() {
  //   return "1px solid red";
  // }

  toggle() {
    this.isHighlighted = !this.isHighlighted;
    this.toggleHighlight.emit(this.isHighlighted);
  }
}