
import {Storage} from '@ionic/storage';
import { ToastController } from '@ionic/angular';

export class StorageService {
    
  constructor(private storage: Storage, 
              private toast: ToastController,) {}
  
    store(key, value){
        this.storage.set(key, value);
        return true;
    }
    retrieve(key){
        this.storage.get(key).then(value =>{
          console.log(value);
            return value;
        })
    }
     
    async presentToast(message) {
        const toast = await this.toast.create({
          message: message,
          duration: 2000
        });
        toast.present();
      }
}