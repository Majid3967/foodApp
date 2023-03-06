export class CartItem {
  constructor(
    public id:string,
    public title:string,
    public imageUrl:string,
    public price:number,
    public quantity:number,
    public userId:string
  ){}
}
