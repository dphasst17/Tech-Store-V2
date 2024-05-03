import PostsDetail from "../pages/post/detail";
import Home from "../pages/home/index";
import DetailProduct from "../pages/product/detail/detail";
const publicRoutes = [
    { path: "/", component: Home },
    { path: "/post/detail/:idPost/:name", component: PostsDetail },
    { path: "/product/detail/:nameType/:idProduct",component:DetailProduct}
];
const privateRoutes:any =[]
export { publicRoutes,privateRoutes };