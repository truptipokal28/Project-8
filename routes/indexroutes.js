const express = require('express');
const routes = express.Router();
const controller = require('../controller/admincontroller');
const passport = require('passport');

routes.get('/', controller.login);
routes.get('/register', controller.register);
routes.post('/logindata',passport.authenticate('local', { failureRedirect: '/' }),controller.logindata);
routes.post('/registerData', controller.registerData);
routes.get('/dashboard', controller.dashboard);
routes.get('/logout', controller.logout);

//category
routes.get('/addcategory', controller.addcategory);
routes.post('/addcategoryData', controller.addcategoryData);
routes.get('/deleteData',controller.deleteData);
routes.get('/editData',controller.editData);
routes.get('/viewcategory', controller.viewcategory);
routes.post('/updateCategory',controller.updateCategory)


//subcategory
routes.get('/addsubcategory',controller.addsubcategory)
routes.get('/viewsubcategory',controller.viewsubcategory)
routes.post('/subcategoryadd',controller.subcategoryadd)
routes.get('/editsubcategory',controller.editsubcategory);
routes.get('/Subcategorydelete',controller.Subcategorydelete)
routes.post('/updatesubcategory',controller.updatesubcategory)

//product
routes.get('/viewproduct',controller.viewproduct);
routes.get('/addproduct',controller.addproduct);
routes.post('/ADDproduct',controller.ADDproduct);
routes.get('/editproduct',controller.editproduct);
routes.post('/updateproduct',controller.updateproduct);
routes.get('/deleteproduct',controller.deleteproduct);


module.exports = routes;
