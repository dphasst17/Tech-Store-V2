import type { AuthDB } from "types/auth";
import type {
  CartType,
  OrderDetailType,
  OrderType,
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
  billDetail: OrderDetailType;
  bills: OrderType;
  carts: CartType;
  comments: "";
  failorder: OrderType;
  failOrderDetail: OrderDetailType;
  imageProduct: "";
  auth: AuthDB;
  posts: "";
  products: ProductType;
  sale: SaleType;
  saleDetail: SaleDetailType;
  transports: TransportType;
  transDetail: TransportDetailType;
  type: TypeProduct;
  typedetail: TypeDetail;
  userAddress: UserAddressType;
  users: UserType;
  warehouse: WarehouseType;

  [anyTable: string]: any;
}

