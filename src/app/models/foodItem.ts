export class FoodItem {
  constructor(
    public id:string,
    public title:string,
    public description:string,
    public imageUrl:string,
    public price:number,
    public catId:string
  ){}
}
