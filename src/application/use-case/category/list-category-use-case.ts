import { injectable } from "tsyringe";
import { CategoryRepository } from "../../../external/database/repository/category";
import { DefaultListUseCaseType } from "../../types/default-use-case";
import { FilterCategoryType } from "../../types/filter-category-use-case";

@injectable()
export class ListCategoryUseCase {
    constructor(private readonly categoryRepository: CategoryRepository
    ) { }

    execute({ filters, pagination, trx }: DefaultListUseCaseType<FilterCategoryType>) {
        return this.categoryRepository.list({ filters, pagination, trx })
    }
}
