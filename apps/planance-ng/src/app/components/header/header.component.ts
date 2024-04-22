import { Component, OnInit } from '@angular/core';
import { ThemeToggleService } from '../theme-toggle/theme-toggle.service';
import { Theme } from '../theme-toggle/theme-toggle.model';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [ThemeToggleComponent]
})
export class HeaderComponent implements OnInit {

  logoSrc = '';

  constructor(
    private themeToggleService: ThemeToggleService
  ) { }

  public async ngOnInit() {
    await this.themeToggleService.themeChanged1$.subscribe(() => {
      if (this.themeToggleService.getCurrentTheme() === Theme.DARK) {
        this.logoSrc = "../../assets/thatsanorder-white.png";
      }
      else {
        this.logoSrc = "../../assets/thatsanorder-black.png";
      }
    })
  }
  
}
