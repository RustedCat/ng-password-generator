import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IPassword } from '../models/password.model';
import { PasswordGeneratorService } from '../services/password-generator.service';

@Component({
  standalone: true,
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
  imports: [FormsModule],
})
export class PasswordFormComponent {
  formData: IPassword = {
    hasUppercase: true,
    hasLowercase: true,
    hasNumbers: true,
    hasSpecial: true,
    lenght: 16,
  };

  constructor(private passwordService: PasswordGeneratorService) {}

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
}
