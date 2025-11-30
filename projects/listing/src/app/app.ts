import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, of, switchMap, tap } from 'rxjs';
import { IndexedDBService } from 'shared-lib';
import { SharedApiService } from 'shared-lib';
import { LoaderService, PulseLoaderComponent, ErrorToastComponent } from 'shared-lib';

@Component({
  selector: 'listing-app-root',
  imports: [RouterOutlet, PulseLoaderComponent, ErrorToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class ListingApp {
  private idbsvc = inject(IndexedDBService);
  private apiService = inject(SharedApiService);
  private loaderService = inject(LoaderService);
  protected readonly title = signal('listing');
  protected loaderIsLoading = this.loaderService.isLoading;
  protected loaderError = this.loaderService.errorMessage;

  // Called when Day Greetings card is clicked
  async onDayGreetings(): Promise<void> {
    const apiPoint = 'greetingData';
    try {
       this.idbsvc
      .getData('HomePageData', apiPoint)
      .pipe(
        switchMap((cachedData) =>
          cachedData
            ? of(cachedData)
            : this.apiService.getCategoryData(apiPoint).pipe(
                map((res : any) => res.data),
                tap((data) => {
                  this.idbsvc
                    .setNewCollectionData(
                      'HomePageData',
                      apiPoint,
                      data,
                      'MM:15'
                    )
                    .subscribe();
                })
              )
        ),
      )
      .subscribe((res: any) => {
        let data = res?.data?.data || res?.data || res;

        // Drill down subcategories for each "name_X" present
       

      });
    } catch (err) {
      console.error('[ListingApp] error calling greeting API', err);
    }
  }
}
