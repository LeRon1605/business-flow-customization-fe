import { Injectable } from "@angular/core";
import { Edge, Node } from "@kr0san89/ngx-graph";
import { ValidateBusinessFlowBlockDto, ValidateBusinessFlowBranchDto, ValidateBusinessFlowDto } from "../schemas";

@Injectable({ providedIn: 'root' })
export class BusinessFlowMapper {

    mapValidateBusinessFlowDto(nodes: Node[], edges: Edge[]) : ValidateBusinessFlowDto {
        return {
            blocks: nodes.map(x => this.mapValidateBusinessFlowBlockDto(x)),
            branches: edges.map(x => this.mapValidateBusinessFlowBranchDto(x))
        }
    }

    mapValidateBusinessFlowBlockDto(node: Node) : ValidateBusinessFlowBlockDto {
        return {
            id: node.id,
            name: node.label!,
            type: node.data.type,
            outComes: node.data.outComes
        }
    }

    mapValidateBusinessFlowBranchDto(edge: Edge) : ValidateBusinessFlowBranchDto {
        return {
            fromBlockId: edge.source,
            toBlockId: edge.target,
            outComeId: edge.data.outCome?.id
        }
    }
}