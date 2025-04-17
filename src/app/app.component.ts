import { Component } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationStoreService } from './authentication-store/authentication-store.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar, ButtonModule, InputTextModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'lendify';

  constructor(
    private readonly authenticationStoreService: AuthenticationStoreService,
    private readonly router: Router
  ) {}

  logout() {
    this.authenticationStoreService.logout();
    this.router.navigateByUrl('/connection');
  }
}
