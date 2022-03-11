import { Component, forwardRef, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Order } from './../../models/order.model';

@Component({
  selector: 'app-menu-pick',
  templateUrl: './menu-pick.component.html',
  styleUrls: ['./menu-pick.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MenuPickComponent),
      multi: true
    }
  ]
})
export class MenuPickComponent implements ControlValueAccessor {

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
