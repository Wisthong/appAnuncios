import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promocion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.css'],
})
export default class PromocionComponent implements OnInit {
  ngOnInit(): void {
    console.log('!hello word¡');
  }
}
