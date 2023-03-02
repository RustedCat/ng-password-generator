import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IPassword } from '../models/password.model';
import { PasswordGeneratorService } from '../services/password-generator.service';

@Component({
  standalone: true,
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class PasswordFormComponent {
  formData: IPassword = {
    hasUppercase: true,
    hasLowercase: true,
    hasNumbers: true,
    hasSpecial: true,
    length: 16,
  };

  sliderColor = 'range';

  constructor(private passwordService: PasswordGeneratorService) {
    this.updateSliderColor();
  }

  submit() {
    this.passwordService.generatePassword(this.formData);
  }

  noUnselected(element: string, selected: boolean) {
    if (selected) return;

    const atLeastOneSelected =
      this.formData.hasLowercase ||
      this.formData.hasUppercase ||
      this.formData.hasSpecial ||
      this.formData.hasNumbers;

    if (atLeastOneSelected) return;

    if (element == 'u') {
      this.formData.hasLowercase = true;
    } else {
      this.formData.hasUppercase = true;
    }
  }

  updateSliderColor() {
    let color;
    if (this.formData.length < 16) color = '';
    else if (this.formData.length < 33) color = '-accent';
    else if (this.formData.length < 65) color = '-success';
    else if (this.formData.length < 97) color = '-warning';
    else color = '-error';

    this.sliderColor = `range range${color}`;
  }
}
