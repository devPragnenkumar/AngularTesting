import { Component } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValueServiceService } from './services/value-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'AngularTesting';
  formGroup = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    gender: new FormControl('', [Validators.required]),
  });

  constructor(private getValueService: ValueServiceService) {}

  onSubmit = () => {
    console.log(this.formGroup.value);
  };

  getFormGroup = () => {
    const temp = this.getValueService.getValue();
    return this.formGroup.controls;
  };
}
