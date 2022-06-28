import { Injectable, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FF } from '../models/ff.model';

// Feature Flags
import { initialize, Event, Result } from '@harnessio/ff-javascript-client-sdk'

@Injectable({
  providedIn: 'root'
})
export class FFService {

  flags: Array<FF> = [];
  ffSdk = 'eecd5290-1ef4-4184-9068-e592eabacefb';
  cfClient = {} as Result;
  loggedIn = false;

  constructor(private http: HttpClient) {
    this.initializeSDK()
  }

  initializeSDK() {
    this.cfClient.off;
    this.cfClient.close;

    // Initialize Client
    this.cfClient = initialize(this.ffSdk, {
      identifier: "guest",      // Target identifier
      name: "guest",                  // Optional target name
      attributes: {                            // Optional target attributes
        email: "guest@guest.com",
        userType: "Guest",
        country: "Brazil",
        region: "Sao Paulo",
        city: "Santos",
      }
    });

    this.cfClient.on(Event.READY, flags => {
      console.log(JSON.stringify(flags))
      for (const [key, value] of Object.entries(flags)) {

        this.SetFlags(key,value);
      }

      this.SetFlags("Repositories",Boolean(flags["Repositories"]));

    })

    this.cfClient.on(Event.CHANGED, flagInfo => {
      if (flagInfo.flag === "Repositories") {
        this.SetFlags("repositoryEnabled",Boolean(flagInfo.value));
        this.SetFlags(flagInfo.flag,Boolean(flagInfo.value));
      }
      else if (flagInfo.flag === "Repository_Filter") {
        this.SetFlags("Repository_Filter",Boolean(flagInfo.value));
        this.SetFlags(flagInfo.flag,Boolean(flagInfo.value));
      }
      else{
        if (typeof flagInfo.value === "boolean") {
          this.SetFlags(flagInfo.flag,Boolean(flagInfo.value));
        }
        else{
          this.SetFlags(flagInfo.flag,String(flagInfo.value));
        }
      }
    })
  }

  flagExists(flag:string):boolean {
    this.flags.filter(flagObj => flagObj.flag == flag)
    let ffToUpdate = new FF(flag,"false");
    let updateItem = this.flags.find(this.findIndexToUpdate, ffToUpdate.flag);
    let index = this.flags.indexOf(updateItem!);

    if (this.flags[index] !== undefined) {
      return true ;
    }
    else {
      return false
    }
  }

  SetFlags(flag: string, value: any ): void {
    
    this.flags.filter(flagObj => flagObj.flag == flag)
    let ffToUpdate = new FF(flag,value);
    let updateItem = this.flags.find(this.findIndexToUpdate, ffToUpdate.flag);
    let index = this.flags.indexOf(updateItem!);

    if (this.flags[index] !== undefined) {
      this.flags[index].value = value ;
    }else{
      this.flags.push(new FF(flag,value));
    }
  }

  findIndexToUpdate(flagObj: any) { 
        return flagObj.flag === this;
  }

  GetFlags(flag: string ): any {
    this.flags.filter(flagObj => flagObj.flag == flag)
    let ffToUpdate = new FF(flag,false);
    let updateItem = this.flags.find(this.findIndexToUpdate, ffToUpdate.flag);
    let index = this.flags.indexOf(updateItem!);
    
    return this.flags[index].value
  }
  
  async ngOnInit(): Promise<void> {
    console.log("FF Starting");
    this.initializeSDK()
  }
  
}
