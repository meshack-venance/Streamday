import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CommonModule, NgIf } from '@angular/common';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, NgIf, SafeUrlPipe, RouterModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movie: any = null;
  streamUrl: string | null = null;
  type: string | null = null;
  loading = true;
  streamingAvailable = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
  ) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type') || 'movie';
    const id = this.route.snapshot.paramMap.get('id')!;

    switch (this.type) {
      case 'movie':
        this.loadMovie(+id);
        break;

      case 'tv':
        this.loadTvShow(+id);
        break; // Anime & Manga are handled from a custom source, not TMDb

      case 'anime':
        this.buildAnimeStreamUrl(id);
        this.loading = false;
        break;

      case 'manga':
        this.buildMangaStreamUrl(id);
        this.loading = false;
        break;

      default: // If unknown type, try movie first
        this.loadMovie(+id);
        break;
    }
  }

  loadMovie(id: number): void {
    if (!this.type) return;

    this.movieService.getMovieDetail(id).subscribe({
      next: (movie: any) => {
        this.movie = movie;
        const imdbId = movie.external_ids?.imdb_id;

        if (imdbId) {
          // Prefer IMDb ID for better match
          this.streamUrl = `https://vidsrc.icu/embed/${this.type}/${imdbId}`;
        } else {
          // Fallback to TMDb ID if IMDb ID is not available
          this.streamUrl = `https://vidsrc.icu/embed/${this.type}/${id}`;
        }

        this.streamingAvailable = true;
      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
        this.streamingAvailable = false;
        this.streamUrl = null;
      },
      complete: () => {
        this.loading = false;
        if (!this.streamUrl) {
          this.streamingAvailable = false;
        }
      },
    });
  }

  loadTvShow(id: number): void {
    const season = this.route.snapshot.paramMap.get('season') || '1';
    const episode = this.route.snapshot.paramMap.get('episode') || '1';

    this.movieService.getTvDetail(id).subscribe({
      next: (tv: any) => {
        this.movie = tv;
        const imdbId = tv.external_ids?.imdb_id;
        const tvdbId = tv.external_ids?.tvdb_id;

        let streamId = imdbId || tvdbId || id;

        const url = `https://vidsrc.icu/embed/tv/${streamId}/${season}/${episode}`;
        this.streamUrl = url; // raw URL string
        this.streamingAvailable = true;
      },
      error: () => {
        this.streamingAvailable = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  buildAnimeStreamUrl(id: string): void {
    const episode = this.route.snapshot.paramMap.get('episode') || '1';
    const dub = this.route.snapshot.paramMap.get('dub') || 'sub';
    const skip = this.route.snapshot.paramMap.get('skip') || '0';
    const url = `https://vidsrc.icu/embed/anime/${id}/${episode}/${dub}/${skip}`;
    this.streamUrl = url; // raw URL string
    this.streamingAvailable = true;
  }

  buildMangaStreamUrl(id: string): void {
    const chapter = this.route.snapshot.paramMap.get('chapter') || '1';
    const url = `https://vidsrc.icu/embed/manga/${id}/${chapter}`;
    this.streamUrl = url; // raw URL string
    this.streamingAvailable = true;
  }

  similarMovies: any[] = [];

  loadSimilar(id: number): void {
    this.movieService.getSimilarMovies(id).subscribe((res: any) => {
      this.similarMovies = res.results.slice(0, 10); // limit
    });
  }

  cast: any[] = [];

  loadCredits(id: number): void {
    this.movieService.getMovieCredits(id).subscribe((res: any) => {
      this.cast = res.cast.slice(0, 12); // limit to 12 actors
    });
  }

  trailerUrl: string | null = null;

  loadTrailer(id: number): void {
    this.movieService.getMovieVideos(id).subscribe((res: any) => {
      const yt = res.results.find(
        (v: any) => v.site === 'YouTube' && v.type === 'Trailer',
      );
      if (yt) {
        this.trailerUrl = `https://www.youtube.com/embed/${yt.key}`;
      }
    });
  }

  reviews: any[] = [];

  loadReviews(id: number): void {
    this.movieService.getMovieReviews(id).subscribe((res: any) => {
      this.reviews = res.results.slice(0, 5);
    });
  }
}
