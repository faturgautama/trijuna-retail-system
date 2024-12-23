import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SetupUserGroupService } from 'src/app/@core/service/setup-data/management-user/setup-user-group.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';

@Component({
    selector: 'app-setting-menu-group-user',
    templateUrl: './setting-menu-group-user.component.html',
    styleUrls: ['./setting-menu-group-user.component.scss']
})
export class SettingMenuGroupUserComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    UserGroupDatasource: any[] = [];

    MenuDatasource: any[] = [];

    SelectedUserGroup: any = null;

    constructor(
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _setupUserGroupService: SetupUserGroupService,
    ) {
        this.DashboardProps = {
            title: 'Setting Menu User Group',
            button_navigation: [],
        };
    }

    ngOnInit(): void {
        this._setupUserGroupService
            .getAll()
            .subscribe((res: any) => {
                this.UserGroupDatasource = res.data;
            })
    }

    handleGetMenu(data: any) {
        this.SelectedUserGroup = data;

        this._setupUserGroupService
            .getMenuByUserGroup(data.id_group)
            .subscribe((res: any) => {
                this.MenuDatasource = res.data;
            })
    }

    handleChangeStatusAssign(data: any) {
        console.log(data);

        this._setupUserGroupService
            .editAssign(this.SelectedUserGroup.id_group, data.id_menu)
            .subscribe((res: any) => {
                this._messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.message,
                });

                this.handleGetMenu(this.SelectedUserGroup);
            })
    }
}
