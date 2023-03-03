import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IPassword } from '../models/password.model';

@Injectable({
  providedIn: 'root',
})
export class PasswordGeneratorService {
  generatedPassword$: Subject<string> = new Subject();

  private lower_chars = 'abcdefghijklmnopqrstuvwxyz';
  private upper_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private nums_chars = '0123456789';
  private special_chars = '!@#$%^&*';

  generatePassword(requirements: IPassword) {
    let allowed = '';
    if (requirements.hasUppercase) allowed += this.upper_chars;
    if (requirements.hasLowercase) allowed += this.lower_chars;
    if (requirements.hasNumbers) allowed += this.nums_chars;
    if (requirements.hasSpecial) allowed += this.special_chars;

    let password = '';

    for (let i = 0; i < requirements.length; ++i)
      password += allowed[Math.floor(Math.random() * allowed.length)];

    this.generatedPassword$.next(password);
  }
}
