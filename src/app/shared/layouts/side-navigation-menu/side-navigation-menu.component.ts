import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeIcons, TreeNode } from 'primeng/api';
import { UserStorageService } from '../../../core/services';
import { UserInfo } from '../../../core/schemas/user.schema';
import { SpaceService } from '../../../core/services/space.service';
import { TreeNodeSelectEvent } from 'primeng/tree';

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
    private userStorageService: UserStorageService,
    private spaceService: SpaceService
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
        
        if (this.user.permissions.includes('Permissions.Space.Management') && this.items.every(x => x.key != 'space')) {

          const space : TreeNode = {
            key: 'space',
            label: 'Quy trình nghiệp vụ',
            icon: PrimeIcons.SITEMAP,
            children: [],
            expanded: true
          };
          
          if (this.user.permissions.includes('Permissions.Space.Create')) {
            space.children!.push({
              key: 'space-new',
              label: 'Tạo mới',
              icon: PrimeIcons.PLUS,
              data: {
                ignoreSelect: true,
                command: () => {
                  this.spaceService.triggerCreate();
                }
              }
            })
          }

          this.spaceService.load();

          this.spaceService.spaces$
            .subscribe(x => {
              if (space.children!.length > 1) {
                space.children?.splice(1, space.children.length - 1);
              }

              for (const s of x) {
                space.children!.push({
                  label: s.name,
                  data: {
                    color: s.color,
                    command: () => {
                      this.router.navigate(['space', s.id])
                    }
                  },
                })
              };
            });

          this.items.push(space);
        }
      }
    });

    this.selectedNode = this.getSelectedValueFromRoute(this.items, this.router.url);
  }

  onSelectionChange(value: any) {
    this.selectedNode = value;

    if (this.selectedNode?.data?.command) {
      this.selectedNode.data?.command();
    }

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