import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective } from '@angular/forms';
import { FormValidations } from '../../shared/utils';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

  // @Input() msgErro: string;
  // @Input() mostrarErro: boolean;

  @Input() control!: FormControl;
  @Input() label!: string;

  constructor() { }

  ngOnInit() {

  }

  get errorMessage() {
    if(this.control){
      for (const propertyName in this.control.errors) {

        /*O hasOwnProperty serve para verificar se existe uma determinada propriedade.
        Se existir vai retornar valor true, caso não ficará false. */
        if (this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched) {


          /*Vai chamar a função getErrorMsg enviando os parametros nome da label,
          nome da propriedade de validação e o valor da propriedade. */

            return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
          }
      }
    }


    return null;
  }

}
