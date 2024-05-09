import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HeaderComponent, LoginComponent, RegisterComponent, ThemeToggleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'planance';
  public showPlaceholder = true;

  public togglePlaceholder(event: Component): void {
    if (event instanceof LoginComponent || event instanceof RegisterComponent) {
      this.showPlaceholder = false;
    } else {
      this.showPlaceholder = true;
    }
  }
}
