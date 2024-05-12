import PostsDetail from "../pages/post/detail";
import Home from "../pages/home/index";
import DetailProduct from "../pages/product/detail/detail";
import Post from "../pages/post";
import Product from "../pages/product";
import SearchProduct from "../pages/product/search";
import Auth from "../pages/auth/auth";
import Cart from "../pages/cart";
import User from "../pages/user";
import Checkout from "../pages/checkout";
const publicRoutes = [
    { path: "/", component: Home },
    { path: "/auth", component: Auth },
    { path: "/product", component: Product },
    { path: "/search/:key", component: SearchProduct },
    { path: "/post/detail/:idPost/:name", component: PostsDetail },
    { path: "/product/detail/:nameType/:idProduct/:nameProduct", component: DetailProduct },
    { path: "/post", component: Post },
];
const privateRoutes: any = [
    { path: "/cart", component: Cart },
    { path: "/user", component: User },
    { path: "/checkout", component: Checkout },
]
export { publicRoutes, privateRoutes };