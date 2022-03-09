import { DeleteUserComponent } from './oauth-starter-users/delete-user/delete-user.component';
import { UpdateUserComponent } from './oauth-starter-users/update-user/update-user.component';
import { NgModule } from '@angular/core';
import { NodebootOauth2StarterComponent } from './nodeboot-oauth2-starter.component';
import { LibraryMaterials } from './material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OauthStarterUsersComponent } from './oauth-starter-users/oauth-starter-users.component';
import { ViewUserRolesComponent } from './oauth-starter-users/view-user-roles/view-user-roles.component';
import { CreateUserComponent } from './oauth-starter-users/create-user/create-user.component';
import { AddUserRolesComponent } from './oauth-starter-users/add-user-roles/add-user-roles.component';
import { OauthStarterUserProfileComponent } from './oauth-starter-user-profile/oauth-starter-user-profile.component';
import { ClipboardModule } from 'ngx-clipboard';
import { OauthStarterRolesComponent } from './oauth-starter-roles/oauth-starter-roles.component';
import { DeleteRoleComponent } from './oauth-starter-roles/delete-role/delete-role.component';
import { OptionsComponent } from './oauth-starter-roles/options/options.component';
import { CreateRoleComponent } from './oauth-starter-roles/create-role/create-role.component';
import { OauthStarterClientComponent } from './oauth-starter-client/oauth-starter-client.component';
import { DeleteClientComponent } from './oauth-starter-client/delete-client/delete-client.component';
import { UpdateClientComponent } from './oauth-starter-client/update-client/update-client.component';
import { AddClientRolesComponent } from './oauth-starter-client/add-client-roles/add-client-roles.component';
import { ViewClientRolesComponent } from './oauth-starter-client/view-client-roles/view-client-roles.component';
import { ShowTokenComponent } from './oauth-starter-client/show-token/show-token.component';
import { CreateClientComponent } from './oauth-starter-client/create-client/create-client.component';
import { OauthStarterApplicationResourceComponent } from './oauth-starter-application-resource/oauth-starter-application-resource.component';
import { DeleteApplicationResourceComponent } from './oauth-starter-application-resource/delete-application-resource/delete-application-resource.component';
import { ApplicationOptionsComponent } from './oauth-starter-application-resource/application-options/application-options.component';
import { CreateApplicationResourceComponent } from './oauth-starter-application-resource/create-application-resource/create-application-resource.component';
import { ChangePasswordComponent } from './oauth-starter-user-profile/change-password/change-password.component';
import { ShowNewTokenComponent } from './oauth-starter-client/show-new-token/show-new-token.component';
import { ShowSecretComponent } from './oauth-starter-client/show-secret/show-secret.component';
import { RevokeTokenComponent } from './oauth-starter-client/revoke-token/revoke-token.component';

@NgModule({
  declarations: [
    NodebootOauth2StarterComponent,
    OauthStarterUsersComponent,
    OauthStarterUserProfileComponent,
    ViewUserRolesComponent,
    CreateUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    AddUserRolesComponent,
    OauthStarterRolesComponent,
    DeleteRoleComponent,
    OptionsComponent,
    CreateRoleComponent,
    OauthStarterClientComponent,
    DeleteClientComponent,
    UpdateClientComponent,
    AddClientRolesComponent,
    ViewClientRolesComponent,
    ShowTokenComponent,
    CreateClientComponent,
    ChangePasswordComponent,
    OauthStarterApplicationResourceComponent,
    DeleteApplicationResourceComponent,
    ApplicationOptionsComponent,
    CreateApplicationResourceComponent,
    ShowNewTokenComponent,
    ShowSecretComponent,
    RevokeTokenComponent,
  ],
  imports: [
    LibraryMaterials,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ClipboardModule,
  ],
  exports: [
    NodebootOauth2StarterComponent,
    OauthStarterUsersComponent,
    OauthStarterUserProfileComponent,
    OauthStarterRolesComponent,
    OauthStarterClientComponent,
    OauthStarterApplicationResourceComponent,
  ],
})
export class NodebootOauth2StarterModule {}
