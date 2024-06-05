import type { AuthDB } from "types/auth";
import type {
  CartType,
  CategoryPostsType,
  CommentPostType,
  CommentType,
  ImageProductType,
  OrderDetailType,
  OrderType,
  PaymentType,
  PositionType,
  PostsType,
  ProductType,
  SaleDetailType,
  SaleType,
  StaffType,
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
  commentPost:CommentPostType,
  ordf: OrderType;
  ordfDetail: OrderDetailType;
  imageProduct: ImageProductType;
  auth: AuthDB;
  posts: PostsType;
  typePost:CategoryPostsType;
  payment:PaymentType;
  products: ProductType;
  sale: SaleType;
  saleDetail: SaleDetailType;
  ord: TransportType;
  ordDetail: TransportDetailType;
  type: TypeProduct;
  typedetail: TypeDetail;
  userAddress: UserAddressType;
  users: UserType;
  staff:StaffType;
  position:PositionType;
  warehouse: WarehouseType;

  [anyTable: string]: any;
}

