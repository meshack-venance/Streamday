import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = environment.tmdbApiKey;
  private baseUrl = environment.tmdbBaseUrl;

  constructor(private http: HttpClient) {}

  // -----------------------------------------
  // BASIC MOVIE ENDPOINTS
  // -----------------------------------------

  getPopularMovies() {
    return this.http.get(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}`,
    );
  }

  searchMovies(query: string) {
    return this.http.get(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}`,
    );
  }

  getMovieDetail(id: number) {
    return this.http.get(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&append_to_response=external_ids`,
    );
  }

  getTvDetail(id: number) {
    return this.http.get(
      `${this.baseUrl}/tv/${id}?api_key=${this.apiKey}&append_to_response=external_ids`,
    );
  }

  getMoviesByGenre(genreId: number) {
    return this.http.get(
      `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreId}`,
    );
  }

  searchMulti(query: string) {
    return this.http.get(
      `${this.baseUrl}/search/multi?api_key=${this.apiKey}&query=${encodeURIComponent(query)}`,
    );
  }

  // -----------------------------------------
  // ADDITIONAL TMDB MOVIE FEATURES
  // -----------------------------------------

  getTrendingMovies() {
    return this.http.get(
      `${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}`,
    );
  }

  getTrendingTvShows() {
    return this.http.get(
      `${this.baseUrl}/trending/tv/day?api_key=${this.apiKey}`,
    );
  }
  getMovieGenres() {
    return this.http.get(
      `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`,
    );
  }

  // Trending movies (day or week)
  getTrending(
    type: 'movie' | 'tv' | 'person' = 'movie',
    period: 'day' | 'week' = 'day',
  ) {
    return this.http.get(
      `${this.baseUrl}/trending/${type}/${period}?api_key=${this.apiKey}`,
    );
  }

  // Upcoming movies
  getUpcomingMovies() {
    return this.http.get(
      `${this.baseUrl}/movie/upcoming?api_key=${this.apiKey}`,
    );
  }

  // Top rated movies
  getTopRatedMovies() {
    return this.http.get(
      `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}`,
    );
  }

  // Now playing movies
  getNowPlayingMovies() {
    return this.http.get(
      `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}`,
    );
  }

  // Movie credits (cast + crew)
  getMovieCredits(id: number) {
    return this.http.get(
      `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`,
    );
  }

  // Similar movies
  getSimilarMovies(id: number) {
    return this.http.get(
      `${this.baseUrl}/movie/${id}/similar?api_key=${this.apiKey}`,
    );
  }

  // Recommended movies
  getMovieRecommendations(id: number) {
    return this.http.get(
      `${this.baseUrl}/movie/${id}/recommendations?api_key=${this.apiKey}`,
    );
  }

  // Trailers (YouTube videos)
  getMovieVideos(id: number) {
    return this.http.get(
      `${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`,
    );
  }

  // Reviews
  getMovieReviews(id: number) {
    return this.http.get(
      `${this.baseUrl}/movie/${id}/reviews?api_key=${this.apiKey}`,
    );
  }

  // Movie images (posters, backdrops, logos)
  getMovieImages(id: number) {
    return this.http.get(
      `${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`,
    );
  }

  // -----------------------------------------
  //  PERSON / ACTOR FEATURES
  // -----------------------------------------

  // Get actor/person details
  getPersonDetail(id: number) {
    return this.http.get(
      `${this.baseUrl}/person/${id}?api_key=${this.apiKey}&append_to_response=external_ids`,
    );
  }

  // Get movies actor acted in
  getPersonMovieCredits(id: number) {
    return this.http.get(
      `${this.baseUrl}/person/${id}/movie_credits?api_key=${this.apiKey}`,
    );
  }

  // Get TV shows actor acted in
  getPersonTVCredits(id: number) {
    return this.http.get(
      `${this.baseUrl}/person/${id}/tv_credits?api_key=${this.apiKey}`,
    );
  }

  // -----------------------------------------
  // TV FEATURES
  // -----------------------------------------

  getPopularTvShows() {
    return this.http.get(`${this.baseUrl}/tv/popular?api_key=${this.apiKey}`);
  }

  getTopRatedTvShows() {
    return this.http.get(`${this.baseUrl}/tv/top_rated?api_key=${this.apiKey}`);
  }

  getAiringTodayTvShows() {
    return this.http.get(
      `${this.baseUrl}/tv/airing_today?api_key=${this.apiKey}`,
    );
  }

  getOnTheAirTvShows() {
    return this.http.get(
      `${this.baseUrl}/tv/on_the_air?api_key=${this.apiKey}`,
    );
  }

  getSimilarTvShows(id: number) {
    return this.http.get(
      `${this.baseUrl}/tv/${id}/similar?api_key=${this.apiKey}`,
    );
  }

  getTvRecommendations(id: number) {
    return this.http.get(
      `${this.baseUrl}/tv/${id}/recommendations?api_key=${this.apiKey}`,
    );
  }

  getTvImages(id: number) {
    return this.http.get(
      `${this.baseUrl}/tv/${id}/images?api_key=${this.apiKey}`,
    );
  }

  getTvVideos(id: number) {
    return this.http.get(
      `${this.baseUrl}/tv/${id}/videos?api_key=${this.apiKey}`,
    );
  }
}
