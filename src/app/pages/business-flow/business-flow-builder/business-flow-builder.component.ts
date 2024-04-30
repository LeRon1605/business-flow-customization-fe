import { Component, HostListener } from "@angular/core";
import { DagreNodesOnlyLayout, Edge, Layout, Node } from "@kr0san89/ngx-graph";
import * as shape from 'd3-shape';
import { ToastService } from "../../../core/services";
import { BusinessFlowBuilderService } from "./business-flow-builder.service";
import { BusinessFlowBlockDto, BusinessFlowBranchDto } from "../../../core/schemas";

@Component({
    selector: 'app-business-flow-builder',
    styleUrl: 'business-flow-builder.component.scss',
    templateUrl: 'business-flow-builder.component.html'
})
export class BusinessFlowBuilderComponent {

  branchDialogVisible: boolean = false;

  blocks: BusinessFlowBlockDto[] = [];
  branches: BusinessFlowBranchDto[] = [];

  layoutSettings = {
    orientation: 'TB'
  };

  curve: any = shape.curveLinear;
  layout: Layout = new DagreNodesOnlyLayout();

  currentFromBlockNode?: Node;
  selectedBranch?: Edge;

  constructor(
    private toastService: ToastService,
    public businessFlowBuilderService: BusinessFlowBuilderService
  ) { }

  public ngOnInit(): void {
    this.blocks = [
        {
          id: 1,
          name: 'Bắt đầu',
          type: 1
        }
    ];

    this.branches = [];

    this.businessFlowBuilderService.load(this.blocks, this.branches);

    this.businessFlowBuilderService.onBlockAdded.subscribe(type => {
        this.businessFlowBuilderService.addNode(type);
    });
  }

  onMouseOver(e: Event, node: Node) {
    e.stopPropagation();

    if (this.currentFromBlockNode || node.data.type == 3)
        return;

    node.data.topActive = true;
    node.data.bottomActive = true;
  }

  onMouseOut(e: Event, node: Node) {
    e.stopPropagation();
    
    if (this.currentFromBlockNode)
        return;

    node.data.topActive = false;
    node.data.bottomActive = false;
  }

  onMouseDown(e: MouseEvent, node: Node) {
    e.stopPropagation();

    const element = e.target as HTMLElement;
    const isTop = element.dataset['top'] === 'true';
    const isBottom = element.dataset['bottom'] === 'true';

    node.data.topActive = isTop;
    node.data.bottomActive = isBottom;

    const availableNodes = this.businessFlowBuilderService.getAvailableConnectNode(node);
    for (const availableNode of availableNodes) {
        availableNode.data.topActive = true;
        availableNode.data.bottomActive = true;
    }
    
    this.currentFromBlockNode = node;
  }

  onMouseUp(e: any, node: Node) {
    e.stopPropagation();

    if (this.currentFromBlockNode) {
      this.setAvailableActiveMode(this.currentFromBlockNode, false);

      if (!this.businessFlowBuilderService.isAvailableNode(this.currentFromBlockNode, node)) {
        this.toastService.error('Kết nối không hợp lệ');
        return;
      }

      this.businessFlowBuilderService.addEdge(this.currentFromBlockNode, node);
      this.currentFromBlockNode = undefined;
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onWindowMouseUp(event: MouseEvent) {
    if (!(event.target instanceof HTMLElement) || !event.target.closest('circle')) {
      if (this.currentFromBlockNode) {
        this.setAvailableActiveMode(this.currentFromBlockNode, false);
        this.currentFromBlockNode = undefined;
      }
    }
  }

  setAvailableActiveMode(node: Node, mode: boolean) {
    node.data.topActive = mode;
    node.data.bottomActive = mode;
    
    const availableNodes = this.businessFlowBuilderService.getAvailableConnectNode(node);
    for (const availableNode of availableNodes) {
        availableNode.data.topActive = mode;
        availableNode.data.bottomActive = mode;
    }
  }

  onNodeSelected(node: Node) {
    this.businessFlowBuilderService.selectNode(node);
  }

  onBranchClick(link: Edge) {
    this.selectedBranch = link;
    this.branchDialogVisible = true;
  }

  onDeleteBranch(id: string) {
    this.businessFlowBuilderService.deleteEdge(id);
    this.branchDialogVisible = false;
  }

  onSaveBranch(outComeId: string) {
    if (this.selectedBranch) {
      this.businessFlowBuilderService.updateEdge(this.selectedBranch.id!, outComeId);
    }
    this.branchDialogVisible = false;
  }
}