import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

@Component({
  selector: 'hero-search',
  providers: [HeroSearchService],
  template: `
  <div id="search-component">
    <h4>Hero Search</h4>
    <input #searchBox id="search-box" (keyup)="search(searchBox.value)" />
    <div
      *ngFor="let hero of heroes | async"
      (click)="goToDetail(hero)"
      class="search-result"
    >
      {{hero.name}}
    </div>
  </div>

  `,
  styles: [`
    .search-result{
      border-bottom: 1px solid gray;
      border-left: 1px solid gray;
      border-right: 1px solid gray;
      width:195px;
      height: 16px;
      padding: 5px;
      background-color: white;
      cursor: pointer;
    }

    .search-result:hover {
      color: #eee;
      background-color: #607D8B;
    }

    #search-box{
      width: 200px;
      height: 20px;
    }
  `]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router
  ) {}

  search(value: string) : void {
    this.searchTerms.next(value);
  }

  ngOnInit() : void {
    this.heroes = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => {
        return term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([]);
      })
      .catch(error => {
        console.log(error);

        return Observable.of<Hero[]>([]);
      });
  }

  goToDetail(hero: Hero) : void {
    const link = ['/detail', hero.id];

    this.router.navigate(link);
  }
}
