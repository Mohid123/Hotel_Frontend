import { Component, forwardRef, Input } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements ControlValueAccessor {

  @Input() name: string;
  @Input('value') _value: any;

  get value() {
    return this._value;
  }

  set value(value) {
    if (!!value) {
      this._value = value;
      this.onChange(value);
      this.onTouched();
    }
  }

  onChange: any = (onchanges:any) => {};

  onTouched: any = () => {};

  registerOnChange(fn:any) {
    this.onChange = fn;
  }

  registerOnTouched(fn:any) {
    this.onTouched = fn;
  }

  writeValue(value:any) {
    this._value = value;
  }


}
