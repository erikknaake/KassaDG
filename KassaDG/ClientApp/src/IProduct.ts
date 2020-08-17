export interface ICategory {
  categoryName: string;
  id: number;
  childrenCategories: ICategory[];
  parentCategoryId?: number;
  parentCategory?: ICategory;
  products: IProduct[];
}

export interface IProduct {
  productName: string;
  id: number;
  productCategory?: ICategory;
  productCategoryId: number;
  pricePerPieceCents: number;
}
