import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, switchMap, timer } from 'rxjs';
import { EpisodeResponse } from './episode.model';

@Injectable({ providedIn: 'root' })
export class EpisodeService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://rickandmortyapi.com/api/episode';

  getEpisodes(page: number): Observable<EpisodeResponse> {
    const params = new HttpParams().set('page', page);
    return this.http.get<EpisodeResponse>(this.baseUrl, { params });
  }

  getEpisodesLive(page: number): Observable<EpisodeResponse> {
    const params = new HttpParams().set('page', page);

    // Primera carga inmediata + actualización automática cada 60 segundos.
    return timer(0, 60_000).pipe(
      switchMap(() => this.http.get<EpisodeResponse>(this.baseUrl, { params }))
    );
  }
}
