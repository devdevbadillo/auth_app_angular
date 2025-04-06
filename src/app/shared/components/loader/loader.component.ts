import { Component } from '@angular/core';
import {LoaderService} from "../../service/loader.service";

@Component({
  selector: 'shared-app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
