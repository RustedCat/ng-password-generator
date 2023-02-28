import { EventEmitter, Injectable } from '@angular/core';
import { IPassword } from '../models/password.model';

@Injectable({
  providedIn: 'root',
})
export class PasswordGeneratorService {
  generatedPassword: EventEmitter<string> = new EventEmitter();

  constructor() {}

  private range(size: number, startAt = 0) {
    return [...Array(size).keys()].map((i) => i + startAt);
  }

  generatePassword(requirements: IPassword) {
    let allowed: number[] = [];
    if (requirements.hasUppercase) {
      allowed = this.range(
        'Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1,
        'A'.charCodeAt(0)
      );
    }

    if (requirements.hasLowercase) {
      allowed = [
        ...allowed,
        ...this.range(
          'z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1,
          'a'.charCodeAt(0)
        ),
      ];
    }

    if (requirements.hasNumbers) {
      allowed = [
        ...allowed,
        ...this.range(
          '9'.charCodeAt(0) - '0'.charCodeAt(0) + 1,
          '0'.charCodeAt(0)
        ),
      ];
    }

    if (requirements.hasSpecial) {
      allowed = [...allowed, 33, 35, 36, 37, 38, 42, 64, 94];
    }

    let password = '';

    for (let i = 0; i < requirements.lenght; ++i) {
      password += String.fromCharCode(
        allowed[Math.floor(Math.random() * allowed.length)]
      );
    }
    console.log(password);
    this.generatedPassword.emit(password);
  }
}
