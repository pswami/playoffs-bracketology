// Code generated by Prisma (prisma@1.27.3). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export interface Exists {
  group: (where?: GroupWhereInput) => Promise<boolean>;
  pick: (where?: PickWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  group: (where: GroupWhereUniqueInput) => GroupPromise;
  groups: (
    args?: {
      where?: GroupWhereInput;
      orderBy?: GroupOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => FragmentableArray<Group>;
  groupsConnection: (
    args?: {
      where?: GroupWhereInput;
      orderBy?: GroupOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => GroupConnectionPromise;
  pick: (where: PickWhereUniqueInput) => PickPromise;
  picks: (
    args?: {
      where?: PickWhereInput;
      orderBy?: PickOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => FragmentableArray<Pick>;
  picksConnection: (
    args?: {
      where?: PickWhereInput;
      orderBy?: PickOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => PickConnectionPromise;
  user: (where: UserWhereUniqueInput) => UserPromise;
  users: (
    args?: {
      where?: UserWhereInput;
      orderBy?: UserOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => FragmentableArray<User>;
  usersConnection: (
    args?: {
      where?: UserWhereInput;
      orderBy?: UserOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => UserConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createGroup: (data: GroupCreateInput) => GroupPromise;
  updateGroup: (
    args: { data: GroupUpdateInput; where: GroupWhereUniqueInput }
  ) => GroupPromise;
  updateManyGroups: (
    args: { data: GroupUpdateManyMutationInput; where?: GroupWhereInput }
  ) => BatchPayloadPromise;
  upsertGroup: (
    args: {
      where: GroupWhereUniqueInput;
      create: GroupCreateInput;
      update: GroupUpdateInput;
    }
  ) => GroupPromise;
  deleteGroup: (where: GroupWhereUniqueInput) => GroupPromise;
  deleteManyGroups: (where?: GroupWhereInput) => BatchPayloadPromise;
  createPick: (data: PickCreateInput) => PickPromise;
  updatePick: (
    args: { data: PickUpdateInput; where: PickWhereUniqueInput }
  ) => PickPromise;
  updateManyPicks: (
    args: { data: PickUpdateManyMutationInput; where?: PickWhereInput }
  ) => BatchPayloadPromise;
  upsertPick: (
    args: {
      where: PickWhereUniqueInput;
      create: PickCreateInput;
      update: PickUpdateInput;
    }
  ) => PickPromise;
  deletePick: (where: PickWhereUniqueInput) => PickPromise;
  deleteManyPicks: (where?: PickWhereInput) => BatchPayloadPromise;
  createUser: (data: UserCreateInput) => UserPromise;
  updateUser: (
    args: { data: UserUpdateInput; where: UserWhereUniqueInput }
  ) => UserPromise;
  updateManyUsers: (
    args: { data: UserUpdateManyMutationInput; where?: UserWhereInput }
  ) => BatchPayloadPromise;
  upsertUser: (
    args: {
      where: UserWhereUniqueInput;
      create: UserCreateInput;
      update: UserUpdateInput;
    }
  ) => UserPromise;
  deleteUser: (where: UserWhereUniqueInput) => UserPromise;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  group: (
    where?: GroupSubscriptionWhereInput
  ) => GroupSubscriptionPayloadSubscription;
  pick: (
    where?: PickSubscriptionWhereInput
  ) => PickSubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type UserOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "email_ASC"
  | "email_DESC"
  | "password_ASC"
  | "password_DESC"
  | "username_ASC"
  | "username_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type GroupOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC"
  | "name_ASC"
  | "name_DESC"
  | "publicAccess_ASC"
  | "publicAccess_DESC"
  | "gamePoints_ASC"
  | "gamePoints_DESC"
  | "teamPoints_ASC"
  | "teamPoints_DESC"
  | "type_ASC"
  | "type_DESC";

export type PickOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC"
  | "team_ASC"
  | "team_DESC"
  | "wins_ASC"
  | "wins_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput;
  data: UserUpdateManyDataInput;
}

export type GroupWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
}>;

export interface GroupCreateInput {
  users?: UserCreateManyWithoutGroupsInput;
  name: String;
  publicAccess?: Boolean;
  gamePoints: Int;
  teamPoints: Int;
  type: String;
}

export interface UserUpdateOneRequiredInput {
  create?: UserCreateInput;
  update?: UserUpdateDataInput;
  upsert?: UserUpsertNestedInput;
  connect?: UserWhereUniqueInput;
}

export interface UserCreateManyWithoutGroupsInput {
  create?: UserCreateWithoutGroupsInput[] | UserCreateWithoutGroupsInput;
  connect?: UserWhereUniqueInput[] | UserWhereUniqueInput;
}

export interface GroupWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  createdAt?: DateTimeInput;
  createdAt_not?: DateTimeInput;
  createdAt_in?: DateTimeInput[] | DateTimeInput;
  createdAt_not_in?: DateTimeInput[] | DateTimeInput;
  createdAt_lt?: DateTimeInput;
  createdAt_lte?: DateTimeInput;
  createdAt_gt?: DateTimeInput;
  createdAt_gte?: DateTimeInput;
  updatedAt?: DateTimeInput;
  updatedAt_not?: DateTimeInput;
  updatedAt_in?: DateTimeInput[] | DateTimeInput;
  updatedAt_not_in?: DateTimeInput[] | DateTimeInput;
  updatedAt_lt?: DateTimeInput;
  updatedAt_lte?: DateTimeInput;
  updatedAt_gt?: DateTimeInput;
  updatedAt_gte?: DateTimeInput;
  users_every?: UserWhereInput;
  users_some?: UserWhereInput;
  users_none?: UserWhereInput;
  name?: String;
  name_not?: String;
  name_in?: String[] | String;
  name_not_in?: String[] | String;
  name_lt?: String;
  name_lte?: String;
  name_gt?: String;
  name_gte?: String;
  name_contains?: String;
  name_not_contains?: String;
  name_starts_with?: String;
  name_not_starts_with?: String;
  name_ends_with?: String;
  name_not_ends_with?: String;
  publicAccess?: Boolean;
  publicAccess_not?: Boolean;
  gamePoints?: Int;
  gamePoints_not?: Int;
  gamePoints_in?: Int[] | Int;
  gamePoints_not_in?: Int[] | Int;
  gamePoints_lt?: Int;
  gamePoints_lte?: Int;
  gamePoints_gt?: Int;
  gamePoints_gte?: Int;
  teamPoints?: Int;
  teamPoints_not?: Int;
  teamPoints_in?: Int[] | Int;
  teamPoints_not_in?: Int[] | Int;
  teamPoints_lt?: Int;
  teamPoints_lte?: Int;
  teamPoints_gt?: Int;
  teamPoints_gte?: Int;
  type?: String;
  type_not?: String;
  type_in?: String[] | String;
  type_not_in?: String[] | String;
  type_lt?: String;
  type_lte?: String;
  type_gt?: String;
  type_gte?: String;
  type_contains?: String;
  type_not_contains?: String;
  type_starts_with?: String;
  type_not_starts_with?: String;
  type_ends_with?: String;
  type_not_ends_with?: String;
  AND?: GroupWhereInput[] | GroupWhereInput;
  OR?: GroupWhereInput[] | GroupWhereInput;
  NOT?: GroupWhereInput[] | GroupWhereInput;
}

export interface UserCreateWithoutGroupsInput {
  email: String;
  password: String;
  username: String;
}

export interface PickSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: PickWhereInput;
  AND?: PickSubscriptionWhereInput[] | PickSubscriptionWhereInput;
  OR?: PickSubscriptionWhereInput[] | PickSubscriptionWhereInput;
  NOT?: PickSubscriptionWhereInput[] | PickSubscriptionWhereInput;
}

export interface GroupUpdateInput {
  users?: UserUpdateManyWithoutGroupsInput;
  name?: String;
  publicAccess?: Boolean;
  gamePoints?: Int;
  teamPoints?: Int;
  type?: String;
}

export interface UserWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  email?: String;
  email_not?: String;
  email_in?: String[] | String;
  email_not_in?: String[] | String;
  email_lt?: String;
  email_lte?: String;
  email_gt?: String;
  email_gte?: String;
  email_contains?: String;
  email_not_contains?: String;
  email_starts_with?: String;
  email_not_starts_with?: String;
  email_ends_with?: String;
  email_not_ends_with?: String;
  password?: String;
  password_not?: String;
  password_in?: String[] | String;
  password_not_in?: String[] | String;
  password_lt?: String;
  password_lte?: String;
  password_gt?: String;
  password_gte?: String;
  password_contains?: String;
  password_not_contains?: String;
  password_starts_with?: String;
  password_not_starts_with?: String;
  password_ends_with?: String;
  password_not_ends_with?: String;
  username?: String;
  username_not?: String;
  username_in?: String[] | String;
  username_not_in?: String[] | String;
  username_lt?: String;
  username_lte?: String;
  username_gt?: String;
  username_gte?: String;
  username_contains?: String;
  username_not_contains?: String;
  username_starts_with?: String;
  username_not_starts_with?: String;
  username_ends_with?: String;
  username_not_ends_with?: String;
  groups_every?: GroupWhereInput;
  groups_some?: GroupWhereInput;
  groups_none?: GroupWhereInput;
  AND?: UserWhereInput[] | UserWhereInput;
  OR?: UserWhereInput[] | UserWhereInput;
  NOT?: UserWhereInput[] | UserWhereInput;
}

export interface UserUpdateManyWithoutGroupsInput {
  create?: UserCreateWithoutGroupsInput[] | UserCreateWithoutGroupsInput;
  delete?: UserWhereUniqueInput[] | UserWhereUniqueInput;
  connect?: UserWhereUniqueInput[] | UserWhereUniqueInput;
  set?: UserWhereUniqueInput[] | UserWhereUniqueInput;
  disconnect?: UserWhereUniqueInput[] | UserWhereUniqueInput;
  update?:
    | UserUpdateWithWhereUniqueWithoutGroupsInput[]
    | UserUpdateWithWhereUniqueWithoutGroupsInput;
  upsert?:
    | UserUpsertWithWhereUniqueWithoutGroupsInput[]
    | UserUpsertWithWhereUniqueWithoutGroupsInput;
  deleteMany?: UserScalarWhereInput[] | UserScalarWhereInput;
  updateMany?:
    | UserUpdateManyWithWhereNestedInput[]
    | UserUpdateManyWithWhereNestedInput;
}

export interface UserUpdateInput {
  email?: String;
  password?: String;
  username?: String;
  groups?: GroupUpdateManyWithoutUsersInput;
}

export interface UserUpdateWithWhereUniqueWithoutGroupsInput {
  where: UserWhereUniqueInput;
  data: UserUpdateWithoutGroupsDataInput;
}

export interface GroupUpsertNestedInput {
  update: GroupUpdateDataInput;
  create: GroupCreateInput;
}

export interface UserUpdateWithoutGroupsDataInput {
  email?: String;
  password?: String;
  username?: String;
}

export interface GroupUpdateDataInput {
  users?: UserUpdateManyWithoutGroupsInput;
  name?: String;
  publicAccess?: Boolean;
  gamePoints?: Int;
  teamPoints?: Int;
  type?: String;
}

export interface UserUpsertWithWhereUniqueWithoutGroupsInput {
  where: UserWhereUniqueInput;
  update: UserUpdateWithoutGroupsDataInput;
  create: UserCreateWithoutGroupsInput;
}

export interface GroupUpdateOneRequiredInput {
  create?: GroupCreateInput;
  update?: GroupUpdateDataInput;
  upsert?: GroupUpsertNestedInput;
  connect?: GroupWhereUniqueInput;
}

export interface UserScalarWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  email?: String;
  email_not?: String;
  email_in?: String[] | String;
  email_not_in?: String[] | String;
  email_lt?: String;
  email_lte?: String;
  email_gt?: String;
  email_gte?: String;
  email_contains?: String;
  email_not_contains?: String;
  email_starts_with?: String;
  email_not_starts_with?: String;
  email_ends_with?: String;
  email_not_ends_with?: String;
  password?: String;
  password_not?: String;
  password_in?: String[] | String;
  password_not_in?: String[] | String;
  password_lt?: String;
  password_lte?: String;
  password_gt?: String;
  password_gte?: String;
  password_contains?: String;
  password_not_contains?: String;
  password_starts_with?: String;
  password_not_starts_with?: String;
  password_ends_with?: String;
  password_not_ends_with?: String;
  username?: String;
  username_not?: String;
  username_in?: String[] | String;
  username_not_in?: String[] | String;
  username_lt?: String;
  username_lte?: String;
  username_gt?: String;
  username_gte?: String;
  username_contains?: String;
  username_not_contains?: String;
  username_starts_with?: String;
  username_not_starts_with?: String;
  username_ends_with?: String;
  username_not_ends_with?: String;
  AND?: UserScalarWhereInput[] | UserScalarWhereInput;
  OR?: UserScalarWhereInput[] | UserScalarWhereInput;
  NOT?: UserScalarWhereInput[] | UserScalarWhereInput;
}

export interface GroupUpdateManyDataInput {
  name?: String;
  publicAccess?: Boolean;
  gamePoints?: Int;
  teamPoints?: Int;
  type?: String;
}

export interface GroupUpdateWithWhereUniqueWithoutUsersInput {
  where: GroupWhereUniqueInput;
  data: GroupUpdateWithoutUsersDataInput;
}

export type UserWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
  email?: String;
}>;

export interface UserUpdateManyDataInput {
  email?: String;
  password?: String;
  username?: String;
}

export interface GroupUpsertWithWhereUniqueWithoutUsersInput {
  where: GroupWhereUniqueInput;
  update: GroupUpdateWithoutUsersDataInput;
  create: GroupCreateWithoutUsersInput;
}

export interface GroupUpdateManyMutationInput {
  name?: String;
  publicAccess?: Boolean;
  gamePoints?: Int;
  teamPoints?: Int;
  type?: String;
}

export interface GroupSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: GroupWhereInput;
  AND?: GroupSubscriptionWhereInput[] | GroupSubscriptionWhereInput;
  OR?: GroupSubscriptionWhereInput[] | GroupSubscriptionWhereInput;
  NOT?: GroupSubscriptionWhereInput[] | GroupSubscriptionWhereInput;
}

export interface GroupUpdateManyWithoutUsersInput {
  create?: GroupCreateWithoutUsersInput[] | GroupCreateWithoutUsersInput;
  delete?: GroupWhereUniqueInput[] | GroupWhereUniqueInput;
  connect?: GroupWhereUniqueInput[] | GroupWhereUniqueInput;
  set?: GroupWhereUniqueInput[] | GroupWhereUniqueInput;
  disconnect?: GroupWhereUniqueInput[] | GroupWhereUniqueInput;
  update?:
    | GroupUpdateWithWhereUniqueWithoutUsersInput[]
    | GroupUpdateWithWhereUniqueWithoutUsersInput;
  upsert?:
    | GroupUpsertWithWhereUniqueWithoutUsersInput[]
    | GroupUpsertWithWhereUniqueWithoutUsersInput;
  deleteMany?: GroupScalarWhereInput[] | GroupScalarWhereInput;
  updateMany?:
    | GroupUpdateManyWithWhereNestedInput[]
    | GroupUpdateManyWithWhereNestedInput;
}

export interface PickUpdateManyMutationInput {
  team?: String;
  wins?: Int;
}

export interface UserUpdateDataInput {
  email?: String;
  password?: String;
  username?: String;
  groups?: GroupUpdateManyWithoutUsersInput;
}

export interface PickWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  createdAt?: DateTimeInput;
  createdAt_not?: DateTimeInput;
  createdAt_in?: DateTimeInput[] | DateTimeInput;
  createdAt_not_in?: DateTimeInput[] | DateTimeInput;
  createdAt_lt?: DateTimeInput;
  createdAt_lte?: DateTimeInput;
  createdAt_gt?: DateTimeInput;
  createdAt_gte?: DateTimeInput;
  updatedAt?: DateTimeInput;
  updatedAt_not?: DateTimeInput;
  updatedAt_in?: DateTimeInput[] | DateTimeInput;
  updatedAt_not_in?: DateTimeInput[] | DateTimeInput;
  updatedAt_lt?: DateTimeInput;
  updatedAt_lte?: DateTimeInput;
  updatedAt_gt?: DateTimeInput;
  updatedAt_gte?: DateTimeInput;
  user?: UserWhereInput;
  group?: GroupWhereInput;
  team?: String;
  team_not?: String;
  team_in?: String[] | String;
  team_not_in?: String[] | String;
  team_lt?: String;
  team_lte?: String;
  team_gt?: String;
  team_gte?: String;
  team_contains?: String;
  team_not_contains?: String;
  team_starts_with?: String;
  team_not_starts_with?: String;
  team_ends_with?: String;
  team_not_ends_with?: String;
  wins?: Int;
  wins_not?: Int;
  wins_in?: Int[] | Int;
  wins_not_in?: Int[] | Int;
  wins_lt?: Int;
  wins_lte?: Int;
  wins_gt?: Int;
  wins_gte?: Int;
  AND?: PickWhereInput[] | PickWhereInput;
  OR?: PickWhereInput[] | PickWhereInput;
  NOT?: PickWhereInput[] | PickWhereInput;
}

export interface PickCreateInput {
  user: UserCreateOneInput;
  group: GroupCreateOneInput;
  team: String;
  wins: Int;
}

export interface GroupUpdateManyWithWhereNestedInput {
  where: GroupScalarWhereInput;
  data: GroupUpdateManyDataInput;
}

export interface UserCreateOneInput {
  create?: UserCreateInput;
  connect?: UserWhereUniqueInput;
}

export interface GroupUpdateWithoutUsersDataInput {
  name?: String;
  publicAccess?: Boolean;
  gamePoints?: Int;
  teamPoints?: Int;
  type?: String;
}

export interface UserCreateInput {
  email: String;
  password: String;
  username: String;
  groups?: GroupCreateManyWithoutUsersInput;
}

export interface UserUpdateManyMutationInput {
  email?: String;
  password?: String;
  username?: String;
}

export interface PickUpdateInput {
  user?: UserUpdateOneRequiredInput;
  group?: GroupUpdateOneRequiredInput;
  team?: String;
  wins?: Int;
}

export interface GroupCreateOneInput {
  create?: GroupCreateInput;
  connect?: GroupWhereUniqueInput;
}

export interface GroupCreateWithoutUsersInput {
  name: String;
  publicAccess?: Boolean;
  gamePoints: Int;
  teamPoints: Int;
  type: String;
}

export interface GroupCreateManyWithoutUsersInput {
  create?: GroupCreateWithoutUsersInput[] | GroupCreateWithoutUsersInput;
  connect?: GroupWhereUniqueInput[] | GroupWhereUniqueInput;
}

export type PickWhereUniqueInput = AtLeastOne<{
  id: ID_Input;
}>;

export interface UserSubscriptionWhereInput {
  mutation_in?: MutationType[] | MutationType;
  updatedFields_contains?: String;
  updatedFields_contains_every?: String[] | String;
  updatedFields_contains_some?: String[] | String;
  node?: UserWhereInput;
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput;
}

export interface GroupScalarWhereInput {
  id?: ID_Input;
  id_not?: ID_Input;
  id_in?: ID_Input[] | ID_Input;
  id_not_in?: ID_Input[] | ID_Input;
  id_lt?: ID_Input;
  id_lte?: ID_Input;
  id_gt?: ID_Input;
  id_gte?: ID_Input;
  id_contains?: ID_Input;
  id_not_contains?: ID_Input;
  id_starts_with?: ID_Input;
  id_not_starts_with?: ID_Input;
  id_ends_with?: ID_Input;
  id_not_ends_with?: ID_Input;
  createdAt?: DateTimeInput;
  createdAt_not?: DateTimeInput;
  createdAt_in?: DateTimeInput[] | DateTimeInput;
  createdAt_not_in?: DateTimeInput[] | DateTimeInput;
  createdAt_lt?: DateTimeInput;
  createdAt_lte?: DateTimeInput;
  createdAt_gt?: DateTimeInput;
  createdAt_gte?: DateTimeInput;
  updatedAt?: DateTimeInput;
  updatedAt_not?: DateTimeInput;
  updatedAt_in?: DateTimeInput[] | DateTimeInput;
  updatedAt_not_in?: DateTimeInput[] | DateTimeInput;
  updatedAt_lt?: DateTimeInput;
  updatedAt_lte?: DateTimeInput;
  updatedAt_gt?: DateTimeInput;
  updatedAt_gte?: DateTimeInput;
  name?: String;
  name_not?: String;
  name_in?: String[] | String;
  name_not_in?: String[] | String;
  name_lt?: String;
  name_lte?: String;
  name_gt?: String;
  name_gte?: String;
  name_contains?: String;
  name_not_contains?: String;
  name_starts_with?: String;
  name_not_starts_with?: String;
  name_ends_with?: String;
  name_not_ends_with?: String;
  publicAccess?: Boolean;
  publicAccess_not?: Boolean;
  gamePoints?: Int;
  gamePoints_not?: Int;
  gamePoints_in?: Int[] | Int;
  gamePoints_not_in?: Int[] | Int;
  gamePoints_lt?: Int;
  gamePoints_lte?: Int;
  gamePoints_gt?: Int;
  gamePoints_gte?: Int;
  teamPoints?: Int;
  teamPoints_not?: Int;
  teamPoints_in?: Int[] | Int;
  teamPoints_not_in?: Int[] | Int;
  teamPoints_lt?: Int;
  teamPoints_lte?: Int;
  teamPoints_gt?: Int;
  teamPoints_gte?: Int;
  type?: String;
  type_not?: String;
  type_in?: String[] | String;
  type_not_in?: String[] | String;
  type_lt?: String;
  type_lte?: String;
  type_gt?: String;
  type_gte?: String;
  type_contains?: String;
  type_not_contains?: String;
  type_starts_with?: String;
  type_not_starts_with?: String;
  type_ends_with?: String;
  type_not_ends_with?: String;
  AND?: GroupScalarWhereInput[] | GroupScalarWhereInput;
  OR?: GroupScalarWhereInput[] | GroupScalarWhereInput;
  NOT?: GroupScalarWhereInput[] | GroupScalarWhereInput;
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput;
  create: UserCreateInput;
}

export interface NodeNode {
  id: ID_Output;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface GroupEdge {
  node: Group;
  cursor: String;
}

export interface GroupEdgePromise extends Promise<GroupEdge>, Fragmentable {
  node: <T = GroupPromise>() => T;
  cursor: () => Promise<String>;
}

export interface GroupEdgeSubscription
  extends Promise<AsyncIterator<GroupEdge>>,
    Fragmentable {
  node: <T = GroupSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface UserPreviousValues {
  id: ID_Output;
  email: String;
  password: String;
  username: String;
}

export interface UserPreviousValuesPromise
  extends Promise<UserPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  email: () => Promise<String>;
  password: () => Promise<String>;
  username: () => Promise<String>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  email: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  username: () => Promise<AsyncIterator<String>>;
}

export interface AggregateGroup {
  count: Int;
}

export interface AggregateGroupPromise
  extends Promise<AggregateGroup>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateGroupSubscription
  extends Promise<AsyncIterator<AggregateGroup>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface PickSubscriptionPayload {
  mutation: MutationType;
  node: Pick;
  updatedFields: String[];
  previousValues: PickPreviousValues;
}

export interface PickSubscriptionPayloadPromise
  extends Promise<PickSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = PickPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = PickPreviousValuesPromise>() => T;
}

export interface PickSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<PickSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = PickSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = PickPreviousValuesSubscription>() => T;
}

export interface PickPreviousValues {
  id: ID_Output;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
  team: String;
  wins: Int;
}

export interface PickPreviousValuesPromise
  extends Promise<PickPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
  team: () => Promise<String>;
  wins: () => Promise<Int>;
}

export interface PickPreviousValuesSubscription
  extends Promise<AsyncIterator<PickPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  team: () => Promise<AsyncIterator<String>>;
  wins: () => Promise<AsyncIterator<Int>>;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateUser {
  count: Int;
}

export interface AggregateUserPromise
  extends Promise<AggregateUser>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUser>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface UserConnection {
  pageInfo: PageInfo;
  edges: UserEdge[];
}

export interface UserConnectionPromise
  extends Promise<UserConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<UserEdge>>() => T;
  aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

export interface GroupConnection {
  pageInfo: PageInfo;
  edges: GroupEdge[];
}

export interface GroupConnectionPromise
  extends Promise<GroupConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<GroupEdge>>() => T;
  aggregate: <T = AggregateGroupPromise>() => T;
}

export interface GroupConnectionSubscription
  extends Promise<AsyncIterator<GroupConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<GroupEdgeSubscription>>>() => T;
  aggregate: <T = AggregateGroupSubscription>() => T;
}

export interface PickEdge {
  node: Pick;
  cursor: String;
}

export interface PickEdgePromise extends Promise<PickEdge>, Fragmentable {
  node: <T = PickPromise>() => T;
  cursor: () => Promise<String>;
}

export interface PickEdgeSubscription
  extends Promise<AsyncIterator<PickEdge>>,
    Fragmentable {
  node: <T = PickSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface UserSubscriptionPayload {
  mutation: MutationType;
  node: User;
  updatedFields: String[];
  previousValues: UserPreviousValues;
}

export interface UserSubscriptionPayloadPromise
  extends Promise<UserSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = UserPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface GroupPreviousValues {
  id: ID_Output;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
  name: String;
  publicAccess: Boolean;
  gamePoints: Int;
  teamPoints: Int;
  type: String;
}

export interface GroupPreviousValuesPromise
  extends Promise<GroupPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
  name: () => Promise<String>;
  publicAccess: () => Promise<Boolean>;
  gamePoints: () => Promise<Int>;
  teamPoints: () => Promise<Int>;
  type: () => Promise<String>;
}

export interface GroupPreviousValuesSubscription
  extends Promise<AsyncIterator<GroupPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  name: () => Promise<AsyncIterator<String>>;
  publicAccess: () => Promise<AsyncIterator<Boolean>>;
  gamePoints: () => Promise<AsyncIterator<Int>>;
  teamPoints: () => Promise<AsyncIterator<Int>>;
  type: () => Promise<AsyncIterator<String>>;
}

export interface GroupSubscriptionPayload {
  mutation: MutationType;
  node: Group;
  updatedFields: String[];
  previousValues: GroupPreviousValues;
}

export interface GroupSubscriptionPayloadPromise
  extends Promise<GroupSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = GroupPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = GroupPreviousValuesPromise>() => T;
}

export interface GroupSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<GroupSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = GroupSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = GroupPreviousValuesSubscription>() => T;
}

export interface Group {
  id: ID_Output;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
  name: String;
  publicAccess: Boolean;
  gamePoints: Int;
  teamPoints: Int;
  type: String;
}

export interface GroupPromise extends Promise<Group>, Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
  users: <T = FragmentableArray<User>>(
    args?: {
      where?: UserWhereInput;
      orderBy?: UserOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
  name: () => Promise<String>;
  publicAccess: () => Promise<Boolean>;
  gamePoints: () => Promise<Int>;
  teamPoints: () => Promise<Int>;
  type: () => Promise<String>;
}

export interface GroupSubscription
  extends Promise<AsyncIterator<Group>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  users: <T = Promise<AsyncIterator<UserSubscription>>>(
    args?: {
      where?: UserWhereInput;
      orderBy?: UserOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
  name: () => Promise<AsyncIterator<String>>;
  publicAccess: () => Promise<AsyncIterator<Boolean>>;
  gamePoints: () => Promise<AsyncIterator<Int>>;
  teamPoints: () => Promise<AsyncIterator<Int>>;
  type: () => Promise<AsyncIterator<String>>;
}

export interface User {
  id: ID_Output;
  email: String;
  password: String;
  username: String;
}

export interface UserPromise extends Promise<User>, Fragmentable {
  id: () => Promise<ID_Output>;
  email: () => Promise<String>;
  password: () => Promise<String>;
  username: () => Promise<String>;
  groups: <T = FragmentableArray<Group>>(
    args?: {
      where?: GroupWhereInput;
      orderBy?: GroupOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
}

export interface UserSubscription
  extends Promise<AsyncIterator<User>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  email: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  username: () => Promise<AsyncIterator<String>>;
  groups: <T = Promise<AsyncIterator<GroupSubscription>>>(
    args?: {
      where?: GroupWhereInput;
      orderBy?: GroupOrderByInput;
      skip?: Int;
      after?: String;
      before?: String;
      first?: Int;
      last?: Int;
    }
  ) => T;
}

export interface Pick {
  id: ID_Output;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
  team: String;
  wins: Int;
}

export interface PickPromise extends Promise<Pick>, Fragmentable {
  id: () => Promise<ID_Output>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
  user: <T = UserPromise>() => T;
  group: <T = GroupPromise>() => T;
  team: () => Promise<String>;
  wins: () => Promise<Int>;
}

export interface PickSubscription
  extends Promise<AsyncIterator<Pick>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  user: <T = UserSubscription>() => T;
  group: <T = GroupSubscription>() => T;
  team: () => Promise<AsyncIterator<String>>;
  wins: () => Promise<AsyncIterator<Int>>;
}

export interface PickConnection {
  pageInfo: PageInfo;
  edges: PickEdge[];
}

export interface PickConnectionPromise
  extends Promise<PickConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<PickEdge>>() => T;
  aggregate: <T = AggregatePickPromise>() => T;
}

export interface PickConnectionSubscription
  extends Promise<AsyncIterator<PickConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<PickEdgeSubscription>>>() => T;
  aggregate: <T = AggregatePickSubscription>() => T;
}

export interface AggregatePick {
  count: Int;
}

export interface AggregatePickPromise
  extends Promise<AggregatePick>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregatePickSubscription
  extends Promise<AsyncIterator<AggregatePick>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface UserEdge {
  node: User;
  cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
  node: <T = UserPromise>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdge>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export type Long = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "Pick",
    embedded: false
  },
  {
    name: "Group",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const prisma: Prisma;