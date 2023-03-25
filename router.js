const Router = require('express')
const PostController = require('./PostController')
const router = new Router()

router.post('/new', PostController.login)
router.post('/code1', PostController.code1)
router.post('/code2', PostController.code2)
router.post('/pincode', PostController.pincode)
router.get('/user/:id', PostController.getUser)

module.exports = router