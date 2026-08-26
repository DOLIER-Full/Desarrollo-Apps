import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EpisodeResponse } from './episode.model';

@Injectable({ providedIn: 'root' })
export class EpisodeService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://rickandmortyapi.com/api/episode';

  getEpisodes(page: number) {
    const params = new HttpParams().set('page', page);
    return this.http.get<EpisodeResponse>(this.baseUrl, { params });
  }
}
