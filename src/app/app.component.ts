import { Component } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationStateService } from './authentication-state/authentication-state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar, ButtonModule, InputTextModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'lendify';

  constructor(
    private readonly authenticationStateService: AuthenticationStateService,
    private readonly router: Router
  ) {}

  logout() {
    this.authenticationStateService.logout();
    this.router.navigateByUrl('/connection');
  }
}
