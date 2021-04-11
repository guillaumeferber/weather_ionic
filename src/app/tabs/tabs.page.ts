import { Component } from '@angular/core';
import { NAVIGATION } from '../core/constants/navigation.constants';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
public readonly tabs = NAVIGATION.TABS;
  constructor() {}

}
