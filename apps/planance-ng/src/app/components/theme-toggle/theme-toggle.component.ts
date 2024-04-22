import { Component, Inject } from '@angular/core';
import { ThemeToggleService } from './theme-toggle.service';
import { ThemeStorageService, THEME_STORAGE_SERVICE } from './theme-storage.service';
import { Theme } from './theme-toggle.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  standalone: true,
  imports: [MatSlideToggleModule]
})

export class ThemeToggleComponent {

  public currentTheme: Theme = this.themeStorageService.getCurrentTheme();

  constructor(
    private themeToggleService: ThemeToggleService,
    @Inject(THEME_STORAGE_SERVICE) private themeStorageService: ThemeStorageService
    ) { }

  toggleTheme() {
    this.themeToggleService.toggleTheme();
    this.currentTheme = this.themeStorageService.getCurrentTheme();
  }

}
