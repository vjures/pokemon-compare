import { PokeInterface } from '../classes/poke_class';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  PHP_API_SERVER = 'http://localhost:8000/';

  readSql(): Observable<PokeInterface[]>{
    return this.httpClient.get<PokeInterface[]>(`${this.PHP_API_SERVER}read.php`);
  }
}
