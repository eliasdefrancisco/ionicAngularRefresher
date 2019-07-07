import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PersonsService {
  personsChanged = new Subject<string[]>();
  persons: string[] = [];
  isFetching = false;

  constructor(private http: HttpClient) {
    this.fetchPersons();
  }

  fetchPersons() {
    this.isFetching = true;
    this.http
    .get<any>('https://swapi.co/api/people')
    .pipe(map(resData => resData.results.map(character => character.name)))
    .subscribe(transformedData => {
      this.persons = transformedData;
      this.personsChanged.next(this.persons);
      this.isFetching = false;
    });
  }

  addPerson(name: string) {
    this.persons.push(name);
    this.personsChanged.next(this.persons);
  }

  removePerson(name: string) {
    this.persons = this.persons.filter(person => person !== name);
    this.personsChanged.next(this.persons);
  }
}
