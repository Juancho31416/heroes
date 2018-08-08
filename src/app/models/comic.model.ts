export class comic {
    public id: number;
    public title: string;
    public description: string;
    public thumbnail: Thumbnail;
    public code : number;
    public prices : price[];

}
export class Thumbnail {
    public path: string;
    public extension: string;
}

export class price {
    public type : string;
    public price : number;
}