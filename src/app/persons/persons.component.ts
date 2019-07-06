import { Component, OnInit } from '@angular/core';
import { PersonsService } from './persons.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html'
})
export class PersonsComponent implements OnInit {
  personList: string[];

  constructor(private prsService: PersonsService) {}

  ngOnInit() {
    this.personList = this.prsService.persons;
  }

  onRemovePerson(name: string) {
    this.prsService.removePerson(name);
  }
}
