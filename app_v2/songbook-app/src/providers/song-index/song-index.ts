import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SongIndexProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SongIndexProvider {

  private data: ISong[] = null;

  constructor(public http: Http) {}

  public loadIndex(): Promise<ISong[]> {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get('assets/songdata/songs/song-index.json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }

  public loadSong(id: string): Promise<ISong> {
    return new Promise(resolve => {
      this.loadIndex().then((index) => {
        // find song entry by id
        index.some((song) => {
          if (song.alternative == false && song.id == id) {
            resolve(song);
            return true;
          }
          return false;
        });
      })
    })
  }



}
