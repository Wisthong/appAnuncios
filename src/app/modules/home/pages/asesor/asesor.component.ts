import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import CardComponent from '../../components/card/card.component';

@Component({
  selector: 'app-asesor',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './asesor.component.html',
  styleUrls: ['./asesor.component.css'],
})
export default class AsesorComponent {}
