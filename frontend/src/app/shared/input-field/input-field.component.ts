import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputFieldComponent implements OnInit {
  formLogin!: FormGroup

  @Input() id!: string;
  @Input() label!: string;
  @Input() formControler!:FormControl
  @Input() type!:string;
  @Input() control!:string;
  @Input() placeholder!:string;
  @Input() ariaLabel!:string;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }

}
