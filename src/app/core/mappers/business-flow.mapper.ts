import { Injectable } from "@angular/core";
import { Edge, Node } from "@kr0san89/ngx-graph";
import { BusinessFlowBlockDto, BusinessFlowBranchDto, BusinessFlowDto } from "../schemas";

@Injectable({ providedIn: 'root' })
export class BusinessFlowMapper {

    mapBusinessFlowDto(nodes: Node[], edges: Edge[]) : BusinessFlowDto {
        return {
            blocks: nodes.map(x => this.mapBusinessFlowBlockDto(x)),
            branches: edges.map(x => this.mapBusinessFlowBranchDto(x))
        }
    }

    mapBusinessFlowBlockDto(node: Node) : BusinessFlowBlockDto {
        if (node.data.elements) {
            node.data.elements.forEach((item: any, index: number) => item.index = index);
        }

        if (node.data.works) {
            node.data.works.forEach((item: any, index: number) => item.index = index);
        }

        return {
            id: node.id,
            name: node.label!,
            type: node.data.type,
            outComes: node.data.outComes,
            elements: node.data.elements,
            personInChargeIds: node.data.personInChargeIds,
            tasks: node.data.works
        }
    }

    mapBusinessFlowBranchDto(edge: Edge) : BusinessFlowBranchDto {
        return {
            fromBlockId: edge.source,
            toBlockId: edge.target,
            outComeId: edge.data.outCome?.id
        }
    }
}