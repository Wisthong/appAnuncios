import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export default class InicioComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  pathRoute?: string | undefined;

  ngOnInit(): void {
    this.pathRoute = this.route.snapshot.routeConfig?.path;
    console.log(this.pathRoute);

    // throw new Error('Method not implemented.');
  }
}
