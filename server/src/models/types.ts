import type { AuthDB } from "types/auth";
import type {
  CartType,
  CategoryPostsType,
  CommentType,
  ImageProductType,
  OrderDetailType,
  OrderType,
  PostsType,
  ProductType,
  SaleDetailType,
  SaleType,
  TransportDetailType,
  TransportType,
  TypeDetail,
  TypeProduct,
  UserAddressType,
  UserType,
  WarehouseType,
} from "types/types";

export interface Database {
  ordsDetail: OrderDetailType;
  ords: OrderType;
  carts: CartType;
  comments: CommentType;
  ordf: OrderType;
  ordfDetail: OrderDetailType;
  imageProduct: ImageProductType;
  auth: AuthDB;
  posts: PostsType;
  typePost:CategoryPostsType;
  products: ProductType;
  sale: SaleType;
  saleDetail: SaleDetailType;
  ord: TransportType;
  ordDetail: TransportDetailType;
  type: TypeProduct;
  typedetail: TypeDetail;
  userAddress: UserAddressType;
  users: UserType;
  warehouse: WarehouseType;

  [anyTable: string]: any;
}

