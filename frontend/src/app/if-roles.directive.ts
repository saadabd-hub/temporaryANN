import { Input, OnInit, Directive, ViewContainerRef, TemplateRef, OnDestroy } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { UserRoleService } from './services/user-role.service';



@Directive({
  selector: '[appIfRoles]'
})
export class IfRolesDirective implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];
 @Input() public ifRoles: Array<string>;

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>,private rolesService: UserRoleService)
    {}

  public ngOnInit() {
   this.subscription.push(
     this.rolesService.roles().subscribe(res => {
       if (!res.roles) {
         this.viewContainerRef.clear();
       }
       const idx = res.roles.findIndex((element) => this.ifRoles.indexOf(element) !== -1);
       if (idx < 0) {
         this.viewContainerRef.clear();
       } else {
         this.viewContainerRef.createEmbeddedView(this.templateRef);
       }
     })
   );
 }

 public ngOnDestroy(): void {
   this.subscription.forEach((subscription: Subscription) => subscription.unsubscribe());
 }
}
