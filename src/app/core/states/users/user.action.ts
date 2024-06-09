export class GetUserById {
    static readonly type = '[User] GetById';
    constructor(public id: string) {} 
}