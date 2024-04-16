export class GetStudentById {
    static readonly type = '[Student] GetById';
    constructor(public id: string) {} 
}