const express = require('express')
const app = express()
const router = express.Router()
const nocache = require('nocache')
const adminController = require('../controllers/adminController')


router.get('/',adminController.loadadminHome)
router.get('/edituser',adminController.edituserload)
router.post('/edituser',adminController.edituser)
router.get('/deleteuser',adminController.deleteuser)
router.post('/search',adminController.searchuser)
router.get('/createuser',adminController.createuserload)
router.post('/createuser',adminController.createuser)




module.exports = router
