import { Transaction } from "objection";
import { PaginationType } from "./pagination-filters";
import { DefaultModelOmit } from "./default-model-omit";
import { UserEntity } from "../../domain/entities/user";

export type DefaultCreateUseCaseType<M> = { data: DefaultModelOmit<M>, trx?: Transaction, user?: UserEntity }

export type CreateUseCaseWithUserType<M> = { data: DefaultModelOmit<M>, trx?: Transaction, user: UserEntity }

export type DefaultFilterUseCaseType<D> = { filters?: D, trx?: Transaction, user?: UserEntity }

export type DefaultListUseCaseType<F> = DefaultFilterUseCaseType<F> & { pagination: PaginationType, user?: UserEntity }

export type GenericUseCaseType<D> = { data: D, trx?: Transaction }