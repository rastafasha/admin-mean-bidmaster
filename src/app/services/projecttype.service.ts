import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectType } from '../models/project';
import { User } from '../models/user';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProjecttypeService {

  public projecttype: ProjectType;
      public user: User;
    
    
      constructor(private http: HttpClient) { }
    
      get token():string{
        return localStorage.getItem('token') || '';
      }
    
    
      get headers(){
        return{
          headers: {
            'x-token': this.token
          }
        }
      }
    
    
      getProjects() {
        const url = `${baseUrl}/typeprojects/`;
        return this.http.get<any>(url,this.headers)
          .pipe(
            map((resp:{ok: boolean, projecttypes: ProjectType}) => resp.projecttypes)
          )
      }
    
      getProject(_id: ProjectType) {
        const url = `${baseUrl}/typeprojects/${_id}`;
        return this.http.get<any>(url, this.headers)
          .pipe(
            map((resp:{ok: boolean, projecttype: ProjectType}) => resp.projecttype)
            );
      }
   
    
    
      createProject(projecttype:ProjectType) {
        const url = `${baseUrl}/typeprojects/store`;
        return this.http.post(url, projecttype, this.headers);
      }
    
      updateProject(projecttype:ProjectType) {
        const url = `${baseUrl}/typeprojects/update/${projecttype._id}`;
        return this.http.put(url, projecttype, this.headers);
      }
    
      deleteProject(_id: string) {
        const url = `${baseUrl}/typeprojects/delete/${_id}`;
        return this.http.delete(url, this.headers);
      }
}
