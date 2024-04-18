import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeIcons, TreeNode } from 'primeng/api';

@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss']
})
export class SideNavigationMenuComponent implements OnInit {
  
  selectedNode!: TreeNode | null;
  items!: TreeNode[];
  navigations : { [key: string]: string; } = {
    'home': '/home',
    'students': '/students/list-students',
    'list-student': '/students/list-students'
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {
        key: 'home',
        label: 'Trang chủ',
        icon: PrimeIcons.HOME
      }
    ];

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