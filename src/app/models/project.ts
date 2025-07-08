import { User } from "./user";

export class Project {
    _id:string;
    name:string;
url:string;
type:ProjectType;
category:string;
hasPresentation:string;
deliveryDate:string;
date:string;
partners:User;
img:string;

}

export class ProjectType {
    _id:string;
    name:string;
}