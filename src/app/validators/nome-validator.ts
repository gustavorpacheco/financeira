import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validarSobrenome(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {


    if (!control) {
        return null;
    }

    if (!control.value) {
        return null;
    }
      const nameArray = control.value.split(' ');

      return nameArray.length < 2 || nameArray[1] == '' ? {sobrenome:true}: null;
    }
}
