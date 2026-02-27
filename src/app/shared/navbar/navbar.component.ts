import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface Genre {
  id: number;
  name: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isMenuOpen = false;
  isUserMenuOpen = false;

  // Add the genres array (sample data)
  genres: Genre[] = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Drama' },
    { id: 4, name: 'Horror' },
    { id: 5, name: 'Romance' },
  ];

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen && this.isUserMenuOpen) {
      this.isUserMenuOpen = false;
    }
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;

    if (this.isUserMenuOpen && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  openSearch(): void {
    this.router.navigate(['/search']);
  }

  logout(): void {
    // Add logout logic here (clear tokens etc)
    this.router.navigate(['/login']);
  }

  // Add this method to handle clicking a genre
  goToGenre(genreId: number): void {
    // Example: navigate to genre page by id
    this.router.navigate(['/genres', genreId]);
    // Also close menus if needed
    this.isMenuOpen = false;
    this.isUserMenuOpen = false;
  }
}
