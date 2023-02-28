import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PasswordFormComponent } from './password-form/password-form.component';
import { PasswordGeneratorService } from './services/password-generator.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, PasswordFormComponent],
})
export class AppComponent {
  title = 'Password Generator';
  password = '';

  constructor(private passwordService: PasswordGeneratorService) {
    passwordService.generatedPassword.subscribe((password) => {
      this.password = password;
    });
  }

  async copyToClipboard(clipboardLink: HTMLElement) {
    await navigator.clipboard.writeText(this.password);

    clipboardLink.classList.add('text-green-400');
    clipboardLink.innerText = 'Password copied to the clipboard';

    setTimeout(() => {
      clipboardLink.classList.remove('text-green-400');
      clipboardLink.innerText = 'Copy to clipboard';
    }, 3000);
  }
}
