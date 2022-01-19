import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NodebootOauth2StarterService {
  configuration: {
    api: string;
  };
  authUserApi: string;
  authRoleApi: string;
  authPartApi: string;
  authClientApi: string;
  authApplicationApi: string;

  constructor(
    private http: HttpClient,
    @Inject('configuration')
    configuration: {
      api: string;
    }
  ) {
    this.configuration = configuration;
    this.authUserApi = configuration.api + '/auth/user';
    this.authRoleApi = configuration.api + '/auth/role';
    this.authPartApi = configuration.api + '/auth/part';
    this.authClientApi = configuration.api + '/auth/client';
    this.authApplicationApi = configuration.api + '/auth/application ';
  }

  getUsers(pageIndex: number, order: string): Observable<UserPaginationResult> {
    return this.http
      .get<UserPaginationResult>(
        this.authUserApi +
          `?pageIndex=${pageIndex}&&itemsPerPage=20&&order=${order}`
      )
      .pipe(first());
  }

  createUser(createUserData: {
    name: string;
    username: string;
    password: string;
    roles: BasicRole[];
  }) {
    return this.http.post(this.authUserApi, createUserData).pipe(first());
  }

  updatePassword(userId: number, newPassword: string, oldPassword: string) {
    return this.http
      .put(`${this.authUserApi}/${userId}/password`, {
        newPassword,
        oldPassword,
      })
      .pipe(first());
  }

  updateUserRoles(userId: number, roles: BasicRole[]) {
    return this.http
      .put(`${this.authUserApi}/${userId}/role`, { roles })
      .pipe(first());
  }

  deleteUser(subjectId: number) {
    return this.http.delete(`${this.authUserApi}/${subjectId}`).pipe(first());
  }

  updateUser(subjectId: number, updateBody: UserUpdateBody) {
    return this.http
      .put(`${this.authUserApi}/${subjectId}`, updateBody)
      .pipe(first());
  }

  getUserProfile(): Observable<UserProfileResult> {
    return this.http
      .get<UserProfileResult>(`${this.authUserApi}/profile/me`)
      .pipe(first());
  }

  getRolesBasic(): Observable<RoleResult> {
    return this.http
      .get<RoleResult>(this.authRoleApi + '?basic=true')
      .pipe(first());
  }

  createRole(identifier: string, allowedObject: Record<string, Option[]>) {
    return this.http
      .post(this.authRoleApi, { identifier, allowedObject })
      .pipe(first());
  }

  updateRoleOptions(
    roleId: number,
    newAllowedObject: Record<string, Option[]>,
    originalAllowedObject: Record<string, Option[]>
  ) {
    return this.http
      .put(this.authRoleApi + `/${roleId}/option`, {
        newAllowedObject,
        originalAllowedObject,
      })
      .pipe(first());
  }

  deleteRole(roleId: number) {
    return this.http.delete(this.authRoleApi + `/${roleId}`).pipe(first());
  }

  getRoles(pageIndex: number, order: string): Observable<RolePaginationResult> {
    return this.http
      .get<RolePaginationResult>(
        this.authRoleApi +
          `?pageIndex=${pageIndex}&&itemsPerPage=20&&order=${order}`
      )
      .pipe(first());
  }

  getPartsBasic(): Observable<OptionResult> {
    return this.http
      .get<OptionResult>(this.authPartApi + `?basic=true`)
      .pipe(first());
  }

  getParts(pageIndex: number, order: string): Observable<PartPaginationResult> {
    return this.http
      .get<PartPaginationResult>(
        this.authPartApi +
          `?pageIndex=${pageIndex}&&itemsPerPage=20&&order=${order}`
      )
      .pipe(first());
  }

  updatePartOptions(
    partId: number,
    newPartOptions: Option[],
    originalPartOptions: Option[]
  ) {
    return this.http
      .put(this.authPartApi + `/${partId}/option`, {
        newPartOptions,
        originalPartOptions,
      })
      .pipe(first());
  }

  deletePart(partId: number) {
    return this.http.delete(this.authPartApi + `/${partId}`);
  }

  createPart(partIdentifier: string, applications_id: number) {
    return this.http.post(this.authPartApi, {
      partIdentifier,
      applications_id,
    });
  }

  getClients(
    pageIndex: number,
    order: string
  ): Observable<ClientPaginationResult> {
    return this.http
      .get<ClientPaginationResult>(
        this.authClientApi +
          `?pageIndex=${pageIndex}&&itemsPerPage=20&&order=${order}`
      )
      .pipe(first());
  }

  createClient(createClientData: {
    name: string;
    identifier: string;
    roles: BasicRole[];
  }): Observable<ClientCreateResult> {
    return this.http
      .post<ClientCreateResult>(this.authClientApi, createClientData)
      .pipe(first());
  }

  deleteClient(subjectId: number) {
    return this.http.delete(`${this.authClientApi}/${subjectId}`).pipe(first());
  }

  updateClientRoles(clientId: number, roles: BasicRole[]) {
    return this.http
      .put(`${this.authClientApi}/${clientId}/role`, { roles })
      .pipe(first());
  }

  updateClient(subjectId: number, updateBody: ClientUpdateBody) {
    return this.http
      .put(`${this.authClientApi}/${subjectId}`, updateBody)
      .pipe(first());
  }

  getApplications(): Observable<ApplicationResult> {
    return this.http.get<ApplicationResult>(this.authApplicationApi);
  }

  get apiUrl() {
    return this.configuration.api;
  }
}

interface ApplicationResult {
  message: string;
  code: number;
  content?: Application[];
}

export interface Application {
  id: number;
  identifier: string;
}

export interface ClientUpdateBody {
  name: string;
}

export interface Client {
  id: number;
  subjectId: number;
  name: string;
  identifier: string;
  roles: Role[];
}

interface ClientCreateResult {
  message: string;
  code: number;
  content?: ClientCreateContent;
}

export interface ClientCreateContent {
  access_token: string;
}

interface ClientPaginationResult {
  message: string;
  code: number;
  content?: ClientPaginationContent;
}

interface ClientPaginationContent {
  items: Client[];
  pageIndex: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

interface OptionResult {
  message: string;
  code: number;
  content?: Part[];
}

interface PartPaginationResult {
  message: string;
  code: number;
  content?: PartPaginationContent;
}

interface PartPaginationContent {
  items: Part[];
  pageIndex: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface UserUpdateBody {
  name: string;
}

interface UserPaginationResult {
  message: string;
  code: number;
  content?: PaginationUserContent;
}

interface UserProfileResult {
  message: string;
  code: number;
  content?: User;
}

interface PaginationUserContent {
  items: User[];
  pageIndex: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface User {
  id: number;
  subjectId: number;
  name: string;
  username: string;
  roles: RoleUser[];
}

export interface RoleUser {
  id: number;
  identifier: string;
  parts: BasicPart[];
}

export interface BasicPart {
  id: number;
  applicationPartName: string;
  allowed: string[];
}

export interface BasicRole {
  id: number;
  identifier: string;
}

interface RolePaginationResult {
  message: string;
  code: number;
  content?: RolePaginationContent;
}

interface RolePaginationContent {
  items: Role[];
  pageIndex: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface Role {
  id: number;
  identifier: string;
  parts: Part[];
}

export interface Part {
  id: number;
  applicationPartName: string;
  allowed: Option[];
}

interface RoleResult {
  message: string;
  code: number;
  content?: BasicRole[];
}

export interface BasicRole {
  id: number;
  identifier: string;
}

export interface Option {
  allowed: string;
  id: number;
}
