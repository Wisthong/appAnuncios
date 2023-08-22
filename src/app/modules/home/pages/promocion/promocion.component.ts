import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-promocion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.css'],
})
export default class PromocionComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  pathRoute?: string | undefined;

  ngOnInit(): void {
    console.log('123');

    // this.pathRoute = this.route.snapshot.routeConfig?.path;
    // console.log(this.pathRoute);
  }
}
