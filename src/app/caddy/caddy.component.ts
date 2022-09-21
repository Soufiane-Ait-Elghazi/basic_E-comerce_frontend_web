import { Component, OnInit } from '@angular/core';
import {CaddyService} from "../services/caddy.service";

@Component({
  selector: 'app-caddy',
  templateUrl: './caddy.component.html',
  styleUrls: ['./caddy.component.css']
})
export class CaddyComponent implements OnInit {

  constructor(public caddyService:CaddyService) { }

  ngOnInit(): void {
  }

}
