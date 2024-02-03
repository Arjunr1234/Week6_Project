const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')



router.get('/',userController.loginload)
router.post('/',userController.loguser)


router.get('/register',userController.loadregister)


router.post('/register',userController.insertUser)

router.get('/logout',userController.logoutuser)




module.exports = router