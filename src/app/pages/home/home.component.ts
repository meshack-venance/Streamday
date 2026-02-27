import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // Master list used for search/genre filtering
  movies: any[] = [];
  query = '';
  selectedGenre = ''; // Dedicated lists for categorized blocks

  popularMovies: any[] = [];
  trendingMovies: any[] = [];
  upcomingMovies: any[] = [];
  topRatedMovies: any[] = [];
  nowPlayingMovies: any[] = [];

  genres: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadGenres(); // Load all category data on initialization
    this.getPopularMovies();
    this.getTrending();
    this.showUpcoming();
    this.showTopRated();
    this.showNowPlaying();
  }

  loadGenres() {
    this.movieService.getMovieGenres().subscribe((res: any) => {
      this.genres = res.genres; // dynamic
    });
  } // --- Data Loading Methods (Updated to store results in specific arrays) ---

  getPopularMovies(): void {
    this.movieService.getPopularMovies().subscribe((res: any) => {
      // Main list uses popular movies by default, but is overwritten by search/genre
      this.movies = res.results;
      this.popularMovies = res.results.slice(0, 5); // Limit to 5 for the block
    });
  }

  getTrending(): void {
    this.movieService.getTrendingMovies().subscribe((res: any) => {
      this.trendingMovies = res.results.slice(0, 5); // Limit to 5 for the block
    });
  }

  showUpcoming() {
    this.movieService.getUpcomingMovies().subscribe((res: any) => {
      this.upcomingMovies = res.results.slice(0, 5); // Limit to 5 for the block
    });
  }

  showTopRated() {
    this.movieService.getTopRatedMovies().subscribe((res: any) => {
      this.topRatedMovies = res.results.slice(0, 5); // Limit to 5 for the block
    });
  }

  showNowPlaying() {
    this.movieService.getNowPlayingMovies().subscribe((res: any) => {
      this.nowPlayingMovies = res.results.slice(0, 5); // Limit to 5 for the block
    });
  } // --- Search/Genre Filtering (Unchanged logic, uses 'movies' array) ---

  searchMovies(): void {
    if (this.query.trim()) {
      this.movieService.searchMulti(this.query).subscribe((res: any) => {
        this.movies = res.results;
      });
    } else if (this.selectedGenre) {
      this.getMoviesByGenre();
    } else {
      // If search is cleared, reset to popular movies
      this.getPopularMovies();
    }
  }

  getMoviesByGenre(): void {
    if (this.selectedGenre) {
      this.movieService
        .getMoviesByGenre(Number(this.selectedGenre))
        .subscribe((res: any) => {
          this.movies = res.results;
        });
    }
  } // --- Utility Method ---

  imageUrl(path: string): string {
    return path
      ? 'https://image.tmdb.org/t/p/w500' + path
      : 'assets/no-image.png';
  }
}
