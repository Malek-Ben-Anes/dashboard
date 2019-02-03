import { Component, OnInit, Input } from '@angular/core';
import { Student } from 'app/models/Student';

@Component({
  selector: 'app-group-student-list',
  templateUrl: './group-student-list.component.html',
  styleUrls: ['./group-student-list.component.scss']
})
export class GroupStudentListComponent implements OnInit {

  @Input('students') students: Student[];

  constructor() { }

  ngOnInit() {}
  








  states = [
    {name: 'Alabama', capital: 'Montgomery'},
    {name: 'Alaska', capital: 'Juneau'},
    {name: 'Arizona', capital: 'Phoenix'},
    {name: 'Arkansas', capital: 'Little Rock'},
    {name: 'California', capital: 'Sacramento'},
    {name: 'Colorado', capital: 'Denver'},
    {name: 'Connecticut', capital: 'Hartford'},
    {name: 'Delaware', capital: 'Dover'},
    {name: 'Florida', capital: 'Tallahassee'},
    {name: 'Georgia', capital: 'Atlanta'},
    {name: 'Hawaii', capital: 'Honolulu'},
    {name: 'Idaho', capital: 'Boise'},
    {name: 'Illinois', capital: 'Springfield'},
    {name: 'Indiana', capital: 'Indianapolis'},
    {name: 'Iowa', capital: 'Des Moines'},
    {name: 'Kansas', capital: 'Topeka'},
    {name: 'Kentucky', capital: 'Frankfort'},
    {name: 'Louisiana', capital: 'Baton Rouge'},
    {name: 'Maine', capital: 'Augusta'},
    {name: 'Maryland', capital: 'Annapolis'},
    {name: 'Massachusetts', capital: 'Boston'},
    {name: 'Michigan', capital: 'Lansing'},
    {name: 'Minnesota', capital: 'St. Paul'},
    {name: 'Mississippi', capital: 'Jackson'},
    {name: 'Missouri', capital: 'Jefferson City'},
    {name: 'Montana', capital: 'Helena'},
    {name: 'Nebraska', capital: 'Lincoln'},
    {name: 'Nevada', capital: 'Carson City'},
    {name: 'New Hampshire', capital: 'Concord'},
    {name: 'New Jersey', capital: 'Trenton'},
    {name: 'New Mexico', capital: 'Santa Fe'},
    {name: 'New York', capital: 'Albany'},
    {name: 'North Carolina', capital: 'Raleigh'},
    {name: 'North Dakota', capital: 'Bismarck'},
    {name: 'Ohio', capital: 'Columbus'},
    {name: 'Oklahoma', capital: 'Oklahoma City'},
    {name: 'Oregon', capital: 'Salem'},
    {name: 'Pennsylvania', capital: 'Harrisburg'},
    {name: 'Rhode Island', capital: 'Providence'},
    {name: 'South Carolina', capital: 'Columbia'},
    {name: 'South Dakota', capital: 'Pierre'},
    {name: 'Tennessee', capital: 'Nashville'},
    {name: 'Texas', capital: 'Austin'},
    {name: 'Utah', capital: 'Salt Lake City'},
    {name: 'Vermont', capital: 'Montpelier'},
    {name: 'Virginia', capital: 'Richmond'},
    {name: 'Washington', capital: 'Olympia'},
    {name: 'West Virginia', capital: 'Charleston'},
    {name: 'Wisconsin', capital: 'Madison'},
    {name: 'Wyoming', capital: 'Cheyenne'},
  ];

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

