import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {

  @Input() rating: number;
  @Output() ratingEvent: EventEmitter<number> = new EventEmitter();
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  add() {
    this.rating += 1;
    this.ratingEvent.emit(this.rating);
    this.ratingChange.emit(this.rating);
  }

}
