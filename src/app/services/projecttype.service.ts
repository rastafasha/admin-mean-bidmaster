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
    
    
      getProjectTypes() {
        const url = `${baseUrl}/projecttype/`;
        return this.http.get<any>(url,this.headers)
          .pipe(
            map((resp:{ok: boolean, projecttypes: ProjectType}) => resp.projecttypes)
          )
      }
    
      getProjectType(_id: string) {
        const url = `${baseUrl}/projecttype/${_id}`;
        return this.http.get<any>(url, this.headers)
          .pipe(
            map((resp:{ok: boolean, projecttype: ProjectType}) => resp.projecttype)
            );
      }
   
    
    
      createProjectType(projecttype:ProjectType) {
        const url = `${baseUrl}/projecttype/store`;
        return this.http.post(url, projecttype, this.headers);
      }
    
      updateProjectType(projecttype:ProjectType) {
        const url = `${baseUrl}/projecttype/update/${projecttype._id}`;
        return this.http.put(url, projecttype, this.headers);
      }
    
      deleteProjectType(_id: string) {
        const url = `${baseUrl}/projecttype/delete/${_id}`;
        return this.http.delete(url, this.headers);
      }
}
