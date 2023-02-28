import { EventEmitter, Injectable } from '@angular/core';
import { IPassword } from '../models/password.model';

@Injectable({
  providedIn: 'root',
})
export class PasswordGeneratorService {
  generatedPassword: EventEmitter<string> = new EventEmitter();

  private ranges = {
    lower_start: 'a'.charCodeAt(0),
    lower_range: 'z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1,
    upper_start: 'A'.charCodeAt(0),
    upper_range: 'Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1,
    nums_start: '0'.charCodeAt(0),
    nums_range: '9'.charCodeAt(0) - '0'.charCodeAt(0) + 1,
  };

  private lower_chars = this.range(
    this.ranges.lower_range,
    this.ranges.lower_start
  );

  private upper_chars = this.range(
    this.ranges.lower_range,
    this.ranges.lower_start
  );

  private nums_chars = this.range(
    this.ranges.nums_range,
    this.ranges.nums_start
  );

  private special_chars = [33, 35, 36, 37, 38, 42, 64, 94];

  constructor() {}

  private range(size: number, startAt = 0) {
    return [...Array(size).keys()].map((i) => i + startAt);
  }

  generatePassword(requirements: IPassword) {
    let allowed: number[] = [];
    if (requirements.hasUppercase) {
      allowed = [...this.upper_chars];
    }

    if (requirements.hasLowercase) {
      allowed = [...allowed, ...this.lower_chars];
    }

    if (requirements.hasNumbers) {
      allowed = [...allowed, ...this.nums_chars];
    }

    if (requirements.hasSpecial) {
      allowed = [...allowed, ...this.special_chars];
    }

    let password = '';

    for (let i = 0; i < requirements.length; ++i) {
      password += String.fromCharCode(
        allowed[Math.floor(Math.random() * allowed.length)]
      );
    }

    this.generatedPassword.emit(password);
  }
}
