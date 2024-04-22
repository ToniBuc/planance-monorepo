import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ThemeStorageService, THEME_STORAGE_SERVICE } from "./theme-storage.service";
import { Theme } from "./theme-toggle.model";

@Injectable({
  providedIn: 'root'
})
export class ThemeToggleService {
  private currentTheme: Theme = Theme.LIGHT;
  // private _themeChanged$ = new BehaviorSubject(this.currentTheme);
  // public themeChanged$: Observable<Theme>;
  public themeChanged1$ = new BehaviorSubject<Theme>(this.currentTheme);

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    @Inject(THEME_STORAGE_SERVICE) private themeStorage: ThemeStorageService
    ) {
    // this.themeChanged$ = this._themeChanged$.asObservable();
    this.initTheme();
  }
  
  /**
   * Function for initializing the theme.
   */
  private initTheme() {
    const windowTheme = window.matchMedia("(prefers-color-scheme: light)");
    let initTheme = this.themeStorage.getCurrentTheme();
    if (!initTheme) {
        windowTheme.matches ? (initTheme = Theme.DARK) : (initTheme = Theme.LIGHT);
    }
    this.updateCurrentTheme(initTheme);
    this.document.body.classList.add(this.currentTheme);
  }

  /**
   * Function for updating the theme.
   * @param theme 
   */
  private updateCurrentTheme(theme: Theme) {
    this.currentTheme = theme;
    this.themeChanged1$.next(this.currentTheme);
    this.themeStorage.setNewTheme(this.currentTheme);
  }

  /**
   * Function for toggling the theme to the one currently not active.
   */
  public toggleTheme() {
    this.document.body.classList.toggle(Theme.LIGHT);
    this.document.body.classList.toggle(Theme.DARK);
    if (this.currentTheme === Theme.LIGHT) {
      this.updateCurrentTheme(Theme.DARK);
    } 
    else {
      this.updateCurrentTheme(Theme.LIGHT);
    }
  }

  /**
   * Function for retrieving the current theme directly from the service.
   * @returns 
   */
  public getCurrentTheme(): Theme {
    return this.currentTheme;
  }
}