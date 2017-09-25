import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heros',
  templateUrl: './hero.component.html',
  styleUrls: [ './hero.component.css' ]
})
export class HeroComponent implements OnInit {
  heros: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getHeros();
  }

  async getHeros() : Promise<void> {
    this.heros = await this.heroService.getHeros();
  }

  onSelect(hero: Hero) : void {
    this.selectedHero = hero;
  }

  addClass(hero: Hero) : {selected: boolean} {
    return {
      selected: hero === this.selectedHero
    };
  }

  goToDetail() : void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string) : void {
    name = name.trim();

    if (name) {
      this.heroService.create(name)
        .then(hero => {
          this.heros.push(hero);
          this.selectedHero = null;
        });
    }
  }

  delete(hero: Hero) : void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heros = this.heros.filter(h => h !== hero);

        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
  }
}
