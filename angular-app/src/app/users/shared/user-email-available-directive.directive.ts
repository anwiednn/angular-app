import { Directive, Input } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, startWith } from "rxjs/operators"
import { UserService } from '../user.service';

@Directive({
  selector: '[userEmailAvailableDirective]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS, 
    useExisting: UserEmailAvailableDirectiveDirective, 
    multi: true}]
})
export class UserEmailAvailableDirectiveDirective implements AsyncValidator  {
  @Input("userEmailAvailableDirective") id: number | null;

  constructor(private userService: UserService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (control.value) {    
      return this.userService
      .checkEmaiAvailable(this.id || null, control.value)
      .pipe(
        startWith(null),
        debounceTime(250),
        map(response => {
        return !response ? {"userEmailAvailable": true} : null;
      }));
    } else {
      return of(null);
    }
  }
}