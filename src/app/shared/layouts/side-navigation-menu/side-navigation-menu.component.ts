import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeIcons, TreeNode } from 'primeng/api';
import { UserStorageService } from '../../../core/services';
import { UserInfo } from '../../../core/schemas/user.schema';

@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss']
})
export class SideNavigationMenuComponent implements OnInit {
  
  user!: UserInfo;
  selectedNode!: TreeNode | null;
  items!: TreeNode[];
  navigations : { [key: string]: string; } = {
    'home': '/home',
    'tenant': '/tenant'
  };

  constructor(
    private router: Router,
    private userStorageService: UserStorageService
  ) { }

  ngOnInit(): void {
    this.items = [
      {
        key: 'home',
        label: 'Trang chủ',
        icon: PrimeIcons.HOME
      }
    ];

    this.userStorageService.currentUser.subscribe(x => {
      if (x) {
        this.user = x;
        if (this.user.permissions.includes('Permissions.Tenants.Management') && this.items.every(x => x.key != 'tenant')) {
          this.items.push({
            key: 'tenant',
            label: 'Quản lý doanh nghiệp',
            icon: PrimeIcons.USERS
          })
        }
      }
    });

    this.selectedNode = this.getSelectedValueFromRoute(this.items, this.router.url);
  }

  onSelectionChange(value: any) {
    this.selectedNode = value;
    
    if (this.selectedNode && this.selectedNode.key && this.navigations[this.selectedNode.key]) {
      this.router.navigate([this.navigations[this.selectedNode.key]]);
    }
  }

  getSelectedValueFromRoute(nodes: TreeNode[], route: string) : TreeNode | null {
    if (nodes.length == 0)
      return null;
    
    for (var node of nodes) {
      if (this.navigations[<string>node.key] === route) 
        return node;
      
      if (node.children) {
        var foundNode = this.getSelectedValueFromRoute(node.children, route);
        if (foundNode)
          return foundNode;
      }
    }

    return null;
  }
}