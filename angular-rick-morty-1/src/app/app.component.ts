import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { EpisodeService } from './episode.service';
import { Episode } from './episode.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly episodeService = inject(EpisodeService);

  readonly page = signal(1);
  readonly search = signal('');
  readonly selectedEpisode = signal<Episode | null>(null);
  readonly lastUpdated = signal<Date | null>(null);

  readonly episodesResource = rxResource({
    params: () => ({ page: this.page() }),
    stream: ({ params }) =>
      this.episodeService.getEpisodesLive(params.page).pipe(
        tap(() => this.lastUpdated.set(new Date()))
      )
  });

  readonly filteredEpisodes = computed(() => {
    const term = this.search().trim().toLowerCase();
    const data = this.episodesResource.value();

    if (!data) return [];
    if (!term) return data.results;

    return data.results.filter((episode) =>
      episode.name.toLowerCase().includes(term) ||
      episode.episode.toLowerCase().includes(term) ||
      episode.air_date.toLowerCase().includes(term)
    );
  });

  readonly isLoading = computed(() => this.episodesResource.isLoading());
  readonly errorMessage = computed(() => {
    const error = this.episodesResource.error();
    return error ? 'No fue posible cargar los episodios desde la API.' : '';
  });

  onSearch(value: string): void {
    this.search.set(value);
  }

  nextPage(): void {
    const totalPages = this.episodesResource.value()?.info.pages ?? this.page();
    if (this.page() < totalPages) this.page.update((value) => value + 1);
  }

  previousPage(): void {
    if (this.page() > 1) this.page.update((value) => value - 1);
  }

  refresh(): void {
    this.episodesResource.reload();
  }

  retry(): void {
    this.refresh();
  }

  openEpisode(episode: Episode): void {
    this.selectedEpisode.set(episode);
  }

  closeEpisode(): void {
    this.selectedEpisode.set(null);
  }

  characterImage(episode: Episode): string {
    const characterUrl = episode.characters[0] ?? '';
    const id = characterUrl.split('/').pop();
    return id ? `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg` : '';
  }

  youtubeSearchUrl(episode: Episode): string {
    const query = encodeURIComponent(`Rick and Morty ${episode.episode} ${episode.name}`);
    return `https://www.youtube.com/results?search_query=${query}`;
  }
}
