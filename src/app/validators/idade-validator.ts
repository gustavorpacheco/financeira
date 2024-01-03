import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validarIdade(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {


    if (!control) {
        return null;
    }

    if (!control.value) {
        return null;
    }
      const data = new Date(control.value);

      let data60AnosAntes = new Date();

      data60AnosAntes.setFullYear(data60AnosAntes.getFullYear() - 60);

      if ( data.getTime() < data60AnosAntes.getTime()) {
        return { idadeInvalida: true }
      }

      let data18AnosAntes = new Date();

      data18AnosAntes.setFullYear(data18AnosAntes.getFullYear() - 18);

      if ( data.getTime() > data18AnosAntes.getTime()  ) {
        return { idadeInvalida: true }
      }
      return null;
    }
}
