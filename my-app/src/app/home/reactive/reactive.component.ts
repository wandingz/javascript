import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;

  submit() {
    console.log(this.form);
  }

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      firstname: ["", [Validators.required, Validators.minLength(2)]],
      lastname: '',
      email: ["", [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      gender: '',
      details: '',
    });
    console.log(this.form)
  }

  updateValidation(flg) {
    var details = this.form.get('details');
    if (flg === 'other') {
      details.setValidators([Validators.required, Validators.minLength(4)]);
    } else {
      details.clearValidators();
    }
    details.updateValueAndValidity({emitEvent:false, onlySelf:true});
  }

  applyDefault() {
    this.form.setValue({
      firstname: "Yi",
      lastname: 'Zhao',
      email: "zhaoyi@zhaoyi.com",
      gender: 'male',
      details: '',
    })
  }

}
