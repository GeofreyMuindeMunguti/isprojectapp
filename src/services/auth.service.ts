
import {api} from '../config/dev';
import {HttpClient} from '@angular/common/http';


 

export class AuthService {
    
  constructor(private client: HttpClient) {}
  
   authenticate(data){
    let url = `${api}/user/login`;
    return this.client.post(url,data);
   }
   register(data){
     let url = `${api}/user/verify`;
     console.log(data);
     return this.client.post(url,data);
   }
   confirm(user, code){
     const payload ={
       email: user.email,
       code: code,
        
     }
     let url = `${api}/user`;
     return this.client.post(url, payload);
   }
   remove(userid){
     let url = `${api}/user/`+userid;
     return this.client.delete(url);
   }

   createprofile(data, userid){
     const payload = {
        
       weight: data.weight,
       height: data.height,
       age: data.age,
       activity: data.activity,
       gender: data.gender
     }
    console.log(payload)
    let url = `${api}/user/`+userid;
    return this.client.post(url,payload);
   
  }
  getMeals(email){
    console.log(email)
    return this.client.get(`${api}/user/request/`+email);
  }
  editprofile(user, id){
    console.log(id)
    return this.client.post(`${api}/user/`+id, user);
  }
  likemeal(id, payload){
    return this.client.patch(`${api}/meals/`+id, payload);
  }
   
}