import { Transaction } from "objection";
import { PaginationType } from "./pagination-filters";
import { DefaultModelOmit } from "./default-model-omit";

export type DefaultCreateUseCaseType<M> = { data: DefaultModelOmit<M>, trx?: Transaction }

export type DefaultFilterUseCaseType<D> = { filters?: D, trx?: Transaction }

export type DefaultListUseCaseType<F> = DefaultFilterUseCaseType<F> & { pagination: PaginationType }

export type GenericUseCaseType<D> = { data: D, trx?: Transaction }