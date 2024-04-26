import type { Insertable, Selectable, Updateable } from "kysely";
import type { Auth } from "types/auth";
import type {
  CartType,
  OrderDetailType,
  OrderType,
  ProductType,
  SaleDetailType,
  SaleType,
  TransportDetailType,
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
  login: Auth;
  posts: "";
  products: ProductType;
  sale: SaleType;
  saleDetail: SaleDetailType;
  transports: TransportDetailType;
  transDetail: TransportDetailType;
  type: TypeProduct;
  typedetail: TypeDetail;
  userAddress: UserAddressType;
  user: UserType;
  warehouse: WarehouseType;

  [anyTable: string]: any;
}

