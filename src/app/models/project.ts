import { User } from "./user";

export class Project {
    _id:string;
    name:string;
url:string;
type:ProjectType;
hasPresentation:string;
deliveryDate:string;
date:string;
partners:User;

}

export class ProjectType {
    _id:string;
    name:string;
}