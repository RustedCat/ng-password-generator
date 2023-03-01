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
    if (element == 'u') {
      this.formData.hasLowercase = true;
    } else {
      this.formData.hasUppercase = true;
    }
  }

  updateSliderColor() {
    let color = '-error';
    if (this.formData.length < 64) color = '-warning';
    if (this.formData.length < 32) color = '-success';
    if (this.formData.length < 16) color = '-accent';
    if (this.formData.length < 8) color = '';

    this.sliderColor = `range range${color}`;
  }
}
