import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { BusinessFlowBlockDto, BusinessFlowBranchDto, BusinessFlowDto, ValidateBusinessFlowResponseDto } from "../../../core/schemas";
import { Edge, Node } from "@kr0san89/ngx-graph";
import { BusinessFlowService } from "../../../core/services/business-flow.service";
import { BusinessFlowMapper } from "../../../core/mappers/business-flow.mapper";
import { cloneDeep } from "lodash";

@Injectable()
export class BusinessFlowBuilderService {

    nodes: Node[] = [];
    links: Edge[] = [];
    
    update$: Subject<boolean> = new Subject();
    center$: Subject<boolean> = new Subject();

    selectedNode$: Subject<Node> = new Subject<Node>();
    nodes$: BehaviorSubject<Node[]> = new BehaviorSubject<Node[]>([]);
    link$: BehaviorSubject<Edge[]> = new BehaviorSubject<Edge[]>([]);

    get valid() : boolean {
        return this.nodes.every(x => x.data.errorMessages?.length == 0);
    }

    get data() : BusinessFlowDto {
        return this.businessFlowMapper.mapBusinessFlowDto(this.nodes, this.links);
    }

    constructor(
        private businessFlowService: BusinessFlowService,
        private businessFlowMapper: BusinessFlowMapper
    ) { }

    load(blocks: BusinessFlowBlockDto[], branches: BusinessFlowBranchDto[]) {
        for (const block of blocks) {
            const node: Node = {
                id: block.id.toString(),
                label: block.name,
                data: {
                  type: block.type
                }
            };

            this.nodes.push(node);
        }

        for (const branch of branches) {
            const edge: Edge = {
                source: branch.fromBlockId.toString(),
                target: branch.toBlockId.toString(),
                data: {
                    outCome: branch.outCome
                }
            }

            this.links.push(edge);
        }

        this.nodes$.next(this.nodes);
        this.link$.next(this.links);
        this.updateGraph(true);
    }

    getAvailableConnectNode(node: Node) {
        if (node.data.type == 3) {
            return [];
        }
    
        if (node.data.type == 1 && this.links.some(l => l.source == node.id)) {
            return [];
        }
    
        return this.nodes.filter(x => x.id != node.id 
            && x.data.type != 1 
            && (x.data.type != 3 || node.data.type != 1)
            && !this.links.some(l => l.target == x.id && l.source == node.id));
    }
    
    isAvailableNode(sourceNode: Node, targetNode: Node) {
        return this.getAvailableConnectNode(sourceNode).some(x => x.id == targetNode.id);
    }

    getNode(id: string) {
        return this.nodes.find(x => x.id == id);
    }

    addNode(type: number) {
        if (type == 1) {
            return;            
        }

        const name = type == 2 ? 'Không có tiêu đề' : 'Kết thúc';

        const node: Node = {
            id: crypto.randomUUID(),
            label: name,
            data: {
                type: type,
                outComes: this.getNodeOutCome(type)
            }
        };
    
        this.nodes.push(node);
        this.nodes$.next(this.nodes);

        this.updateGraph();
    }
    
    addEdge(sourceNode: Node, targetNode: Node) {
        const edge: Edge = {
            source: sourceNode.id,
            target: targetNode.id,
            data: {
                outCome: cloneDeep(this.getAndSetAvailableOutCome(sourceNode))
            }
        };

        this.links.push(edge);
        this.link$.next(this.links);

        this.updateGraph();
    }

    deleteEdge(id: string) {
        const index = this.links.findIndex(x => x.id == id);
        if (index >= 0) {
            this.links.splice(index, 1);
            this.updateGraph();
        }
    }

    updateEdge(id: string, outComeId: string) {
        const edge = this.links.find(x => x.id == id);
        if (!edge)
            return;

        const node = this.nodes.find(x => x.id == edge.source);
        if (!node)
            return;

        const outCome = node.data.outComes.find((x: any) => x.id == outComeId);
        if (!outCome) 
            return;

        // switch outcome of two branch
        const currentOutComeEdge = this.links.find(x => x.source == node.id && x.data.outCome?.id == outCome.id);
        if (currentOutComeEdge) {
            currentOutComeEdge.data.outCome = cloneDeep(edge.data.outCome);
        }

        edge.data.outCome = cloneDeep(outCome);
        this.updateGraph();
    }

    updateGraph(isCenter: boolean = false) {
        const validateData = this.businessFlowMapper.mapBusinessFlowDto(this.nodes, this.links);
        this.businessFlowService.validate(validateData)
            .subscribe(x => {
                this.mapValidationError(x);
                this.update$.next(true);

                if (isCenter)
                    this.center$.next(true);
            });
    }

    mapValidationError(validateResult: ValidateBusinessFlowResponseDto[]) {
        for (const node of this.nodes) {
            const nodeValidation = validateResult.find(x => x.id == node.id);
            if (nodeValidation) {
                node.data.errorMessages = nodeValidation.errorMessages;
            }
        }
    }

    selectNode(node: Node) {
        this.selectedNode$.next(node);
    }

    getAndSetAvailableOutCome(sourceNode: Node) {
        if (sourceNode.data.type != 2)
            return undefined;

        // Get outcome that not linked to any
        const availableOutCome = sourceNode.data.outComes.find((x: any) => this.links.every(l => l.data.outCome?.id != x.id));
        if (availableOutCome) 
            return availableOutCome;

        const outCome = {
            id: crypto.randomUUID(),
            name: 'Kết quả',
            color: '#7F879C'
        };

        sourceNode.data.outComes.push(outCome);
        return outCome;
    }

    deleteNode(id: string) {
        const node = this.nodes.find(x => x.id == id);
        // Does not allow delete start node
        if (node && node.data.type != 1) {
            this.nodes.splice(this.nodes.indexOf(node), 1);

            // Delete edge that contains node
            this.links = this.links.filter(x => x.source != id && x.target != id);
            this.updateGraph();
        }
    }

    updateNode(clonedNode: Node) {
        const node = this.nodes.find(x => x.id == clonedNode.id);
        if (node) {
            node.label = clonedNode.label;

            const currentOutComeIds = node.data.outComes.map((x: any) => x.id);
            const clonedNodeOutComeIds = clonedNode.data.outComes.map((x: any) => x.id);
            const addedOutComes = clonedNode.data.outComes.filter((x: any) => !currentOutComeIds.includes(x.id));
            const updatedOutComes = clonedNode.data.outComes.filter((x: any) => currentOutComeIds.includes(x.id));
            const deletedOutComes = node.data.outComes.filter((x: any) => !clonedNodeOutComeIds.includes(x.id));
            const deletedOutComeIds = deletedOutComes.map((x: any) => x.id);

            // Delete outcome
            for (const outCome of deletedOutComes) {
                node.data.outComes.splice(node.data.outComes.indexOf(outCome), 1)
            }

            // Delete edges that contains outcome
            const deletedEdges = this.links.filter(x => x.source == node.id && deletedOutComeIds.includes(x.data.outCome.id));
            for (const edge of deletedEdges) {
                this.links.splice(this.links.indexOf(edge), 1);
            }

            // Update current outcome
            for (const updatedOutCome of updatedOutComes) {
                const outCome = node.data.outComes.find((x: any) => x.id == updatedOutCome.id);
                if (outCome) {
                    outCome.name = updatedOutCome.name;
                    outCome.color = updatedOutCome.color;
                }

                const edge = this.links.find(x => x.data.outCome?.id == updatedOutCome.id);
                if (edge) {
                    edge.data.outCome = cloneDeep(outCome);
                }
            }

            // Add new outcome
            for (const outCome of addedOutComes) {
                node.data.outComes.push(outCome);
            }

            this.updateGraph();
        }
    }

    getNodeOutCome(type: number) {
        if (type != 2)
            return [];

        return [
            {
                id: crypto.randomUUID(),
                name: 'Đồng ý',
                color: '#00904F'
            },
            {
                id: crypto.randomUUID(),
                name: 'Từ chối',
                color: '#D8382C'
            }
        ];
    }
}