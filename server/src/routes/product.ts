import express from "express";
import Products from "controllers/product";
const router = express.Router();
const productController = new Products()
router.get('/',productController.getAll)
router.get('/search/:key',productController.search)
router.get('/type/:nameType',productController.getByType)
router.get('/detail/:type/:idProduct',productController.getDetail)
router.get('/new',productController.getNew)
router.get('/view',productController.getView)
router.get('/sale/',productController.getSaleEvent)
router.get('/sale/detail/:idSale',productController.getSaleDetail)
router.post('/',productController.insertProduct)
router.patch('/',productController.updateProduct)
router.post('/sale')
router.patch('/sale')
export default router