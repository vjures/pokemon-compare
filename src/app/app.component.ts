import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { PokeClass, PokeInterface } from 'src/classes/poke_class';
import { InvokeFunctionExpr } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemon';
  arr!: PokeClass[];
  temp!: PokeClass[];
  pokeNames!: string[];
  pokemonImage!: string;
  inputTemp!: string;
  list!: string[];
  stat1!: PokeClass[];
  stat2!: PokeClass[];
  victor!: string;

  constructor(public apiService: ApiService) {
    this.apiService.readSql().subscribe((poke: PokeInterface[]) => {
      this.pokeNames = [];
      this.stat1 = [];
      this.stat2 = [];
      this.temp = [];
      this.inputTemp = '';
      this.victor = '';
      this.arr = poke;
      const n = this.arr.length;
      const tempString = this.arr[n - 1];
      this.arr[n - 1] = this.arr[n - 2];
      this.arr[n - 2] = tempString;
      this.arr.forEach(e => this.pokeNames.push(e.pokemon));
    });
  }

  public enter(name: string, $event: any): void {
    this.temp = this.arr.filter(e => e.pokemon.includes(name));
    // console.log(this.temp);
    this.pokemonImage = this.temp[0].gif;
    if ($event.target.id === 'input') {
      if (this.stat1.length > 0 && this.stat1[0].pokemon === name) {
        return;
      }
      for (let i = 0; i < 1; i++) {
        this.stat1[i] = this.temp[i];
      }
      (document.getElementById($event.target.id) as HTMLInputElement).value = this.stat1[0].pokemon;
      (document.getElementById('poke1') as HTMLImageElement).src = this.pokemonImage;
    }
    else {
      if (this.stat2.length > 0 && this.stat2[0].pokemon === name) {
        console.log('made it here');
        return;
      }
      for (let i = 0; i < 1; i++) {
        this.stat2[i] = this.temp[i];
      }
      (document.getElementById($event.target.id) as HTMLInputElement).value = this.stat2[0].pokemon;
      (document.getElementById('poke2') as HTMLImageElement).src = this.pokemonImage;
   }
    if ((this.stat1.length !== 0 && this.stat2.length !== 0)) {
      this.calcWinner();
    }
  }

  getInput($event: any): void {
    const input = (document.getElementById($event.target.id) as HTMLInputElement).value;
    this.list = [];
    if ($event.keyCode === 13) {
      this.inputTemp = input.charAt(0).toUpperCase();
      for (let i = 1; i < input.length; i++) {
        this.inputTemp += input.charAt(i).toLowerCase();
      }
      console.log(this.inputTemp);
      this.enter(this.inputTemp, $event);
    }

    this.list = this.searchFromArray(this.pokeNames, input);
  }

  searchFromArray(arr: string[], regex: string): string[] {
    const matches = [];
    let i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].toUpperCase().match(regex.toUpperCase())) {
        matches.push(arr[i]);
      }
    }
    return matches;
  }

  calcWinner(): void {
    if (this.stat1[0].attack > this.stat2[0].attack) {
      this.victor = this.stat1[0].pokemon;
    }
    else {
      this.victor = this.stat2[0].pokemon;
    }
    console.log('calculated winner: ' + this.victor);
    this.winner();
  }

  winner(): void {
    const winAudio = new Audio();
    winAudio.src = '../assets/pokeVictory.mov';
    winAudio.load();
    winAudio.play();
  }

}
