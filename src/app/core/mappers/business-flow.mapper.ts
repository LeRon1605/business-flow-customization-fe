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
        return {
            id: node.id,
            name: node.label!,
            type: node.data.type,
            outComes: node.data.outComes
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