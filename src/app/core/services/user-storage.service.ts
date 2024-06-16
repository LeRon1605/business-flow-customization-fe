import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { Tenant, UserInfo } from "../schemas/user.schema";

@Injectable({ providedIn: 'root' })
export class UserStorageService {
    public currentUser: BehaviorSubject<UserInfo | null> = new BehaviorSubject<UserInfo | null>(null);

    setCurrentUser(user: UserInfo | null) {
        this.currentUser.next(user);
        
        if (user != null) {
            console.log(user);
            user.tenantUsers = [...user.tenantUsers, {
                id: '00000000-0000-0000-0000-000000000000',
                fullName: this.getCurrentTenant()!.name!,
                email: '',
                avatarUrl: 'https://static.vecteezy.com/system/resources/previews/020/911/747/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png'
            }]
        }
    }

    getCurrentUser() : UserInfo | null {
        return this.currentUser.value;
    }

    getCurrentTenant() : Tenant | null | undefined {
        const user = this.currentUser.value;
        if (user == null)
            return null;
        
        return user.tenants.find(x => x.id == user.tenantId);
    }
}