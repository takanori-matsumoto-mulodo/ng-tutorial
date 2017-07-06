import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Http, Response }          from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private router: Router,
    private http: Http,
  ) { }

  //private url = 'http://localhost:9000/app/list';
  private url = 'https://3c2lxl49ia.execute-api.us-east-1.amazonaws.com/beta/app/list';
  getHeroes(): void {
    this.http.get(this.url)
    .map((res:Response) => res.json())
    .subscribe(data => this.heroes = data);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
