import PostsDetail from "../pages/post/detail";
import Home from "../pages/home/index";
import DetailProduct from "../pages/product/detail/detail";
import Post from "../pages/post";
import Product from "../pages/product";
import SearchProduct from "../pages/product/search";
import Auth from "../pages/auth/auth";
import Cart from "../pages/cart";
const publicRoutes = [
    { path: "/", component: Home },
    { path: "/auth",component:Auth},
    { path: "/product",component:Product},
    { path: "/search/:key",component:SearchProduct},
    { path: "/post/detail/:idPost/:name", component: PostsDetail },
    { path: "/product/detail/:nameType/:idProduct",component:DetailProduct},
    { path: "/post",component:Post},
    { path: "/cart",component:Cart},
];
const privateRoutes:any =[]
export { publicRoutes,privateRoutes };