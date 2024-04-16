import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-side-bar-layout',
  templateUrl: './side-bar-layout.component.html',
  styleUrls: ['./side-bar-layout.component.scss']
})
export class SideBarLayout implements OnInit {
  ngOnInit(): void {
  }
  // @ViewChild(DxScrollViewComponent, { static: true }) scrollView!: DxScrollViewComponent;
  // selectedRoute = '';

  // menuOpened!: boolean;
  // temporaryMenuOpened = false;

  // @Input()
  // title!: string;

  // menuMode: DxDrawerTypes.OpenedStateMode = 'shrink';
  // menuRevealMode: DxDrawerTypes.RevealMode = 'expand';
  // minMenuSize = 0;
  // shaderEnabled = false;

  // constructor(private screen: ScreenService, private router: Router) { }

  // ngOnInit() {
  //   this.menuOpened = this.screen.sizes['screen-large'];

  //   this.router.events.subscribe(val => {
  //     if (val instanceof NavigationEnd) {
  //       this.selectedRoute = val.urlAfterRedirects.split('?')[0];
  //     }
  //   });

  //   this.screen.changed.subscribe(() => this.updateDrawer());

  //   this.updateDrawer();
  // }

  // updateDrawer() {
  //   const isXSmall = this.screen.sizes['screen-x-small'];
  //   const isLarge = this.screen.sizes['screen-large'];

  //   this.menuMode = isLarge ? 'shrink' : 'overlap';
  //   this.menuRevealMode = isXSmall ? 'slide' : 'expand';
  //   this.minMenuSize = isXSmall ? 0 : 60;
  //   this.shaderEnabled = !isLarge;
  // }

  // get hideMenuAfterNavigation() {
  //   return this.menuMode === 'overlap' || this.temporaryMenuOpened;
  // }

  // get showMenuAfterClick() {
  //   return !this.menuOpened;
  // }

  // navigationChanged(event: DxTreeViewTypes.ItemClickEvent) {
  //   const path = (event.itemData as any).path;
  //   const pointerEvent = event.event;

  //   if (path && this.menuOpened) {
  //     if (event.node?.selected) {
  //       pointerEvent?.preventDefault();
  //     } else {
  //       this.router.navigate([path]);
  //       this.scrollView.instance.scrollTo(0);
  //     }

  //     if (this.hideMenuAfterNavigation) {
  //       this.temporaryMenuOpened = false;
  //       this.menuOpened = false;
  //       pointerEvent?.stopPropagation();
  //     }
  //   } else {
  //     pointerEvent?.preventDefault();
  //   }
  // }

  // navigationClick() {
  //   if (this.showMenuAfterClick) {
  //     this.temporaryMenuOpened = true;
  //     this.menuOpened = true;
  //   }
  // }
}