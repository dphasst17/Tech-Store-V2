import PostsDetail from "../pages/post/detail";
import Home from "../pages/home/index";
import DetailProduct from "../pages/product/detail/detail";
import Post from "../pages/post";
import Product from "../pages/product";
import SearchProduct from "../pages/product/search";
const publicRoutes = [
    { path: "/", component: Home },
    { path: "/product",component:Product},
    { path: "/search/:key",component:SearchProduct},
    { path: "/post/detail/:idPost/:name", component: PostsDetail },
    { path: "/product/detail/:nameType/:idProduct",component:DetailProduct},
    { path: "/post",component:Post}
];
const privateRoutes:any =[]
export { publicRoutes,privateRoutes };