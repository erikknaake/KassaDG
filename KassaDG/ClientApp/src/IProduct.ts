export interface ICategory {
  categoryName: string;
  categoryId: number;
  childrenCategories: ICategory[];
  parentCategoryId?: number;
  parentCategory?: ICategory;
  products: IProduct[];
}

export interface IProduct {
  productName: string;
  productId: number;
  category: ICategory;
  pricePerPieceCents: number
}
