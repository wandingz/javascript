import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-templete',
  templateUrl: './templete.component.html',
  styleUrls: ['./templete.component.css']
})
export class TempleteComponent implements OnInit {
  user: any = {}
  
  constructor() { }

  ngOnInit() {
  }

}
