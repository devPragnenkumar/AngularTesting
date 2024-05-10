import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-AppDups',
  templateUrl: './AppDups.component.html',
  styleUrls: ['./AppDups.component.scss'],
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
})
export class AppDupComponent {
  title = 'AngularTesting';
  formGroup = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    gender: new FormControl('', [Validators.required]),
  });

  onSubmit = () => {
    console.log(this.formGroup.value);
  };

  getFormGroup = () => {
    return this.formGroup.controls;
  };
}
