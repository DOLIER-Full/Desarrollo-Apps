import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { EpisodeService } from './episode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly episodeService = inject(EpisodeService);

  readonly page = signal(1);
  readonly search = signal('');

  readonly episodesResource = rxResource({
    params: () => ({ page: this.page() }),
    stream: ({ params }) => this.episodeService.getEpisodes(params.page)
  });

  readonly filteredEpisodes = computed(() => {
    const term = this.search().trim().toLowerCase();
    const data = this.episodesResource.value();

    if (!data) return [];
    if (!term) return data.results;

    return data.results.filter((episode) =>
      episode.name.toLowerCase().includes(term) ||
      episode.episode.toLowerCase().includes(term)
    );
  });

  readonly isLoading = computed(() => this.episodesResource.isLoading());
  readonly errorMessage = computed(() => {
    const error = this.episodesResource.error();
    return error ? 'No fue posible cargar los episodios.' : '';
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

  retry(): void {
    this.episodesResource.reload();
  }
}
