const registerTbl = require('../model/registermodel');
const subcategoryschema = require('../model/subcategory');
const categorySchema = require('../model/category');
const productschema=require('../model/product');

const login = (req, res) => {
    if (res.locals.users) {
        return res.redirect('/dashboard');
    }
    return res.render('login');
}


const register = (req, res) => {
    return res.render('register');
}

const dashboard = (req, res) => {
    return res.render('dashboard');
}


const registerData = async (req, res) => {
    try {
        const { name, email, password, cpassword } = req.body;
        if (password == cpassword) {
            let user = await registerTbl.create({
                name: name,
                email: email,
                password: password
            })
            if (user) {
                console.log("Record successfully insert");
                return res.redirect('back');
            } else {
                console.log("Record not successfully insert");
                return res.redirect('back');
            }
        } else {
            console.log("Confirm password and password not match");
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}


// const changepassword=(req,res)=>{
//     return res.render('changepassword');
// }


const logindata = (req, res) => {
    return res.redirect('/dashboard');
}



const logout = (req, res) => {
    req.logOut((error) => {
        console.log(error);
        return false;
    })
    return res.redirect('/');
}


//category

const addcategory = (req, res) => {
    return res.render('category/addcategory');
}


const addcategoryData = async (req, res) => {
    try {
        let category = req.body.category;
        let Record = await categorySchema.create({
            category: category
        })
        if (Record) {
            console.log("Category Added");
            return res.redirect('back');
        }
        else {
            console.log("category not Added");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

const viewcategory = async (req, res) => {
    try {
        let viewRecord = await categorySchema.find({});
        if (viewRecord) {
            return res.render('category/viewcategory', {
                viewRecord
            });
        }
        else {
            console.log("Category Not Shown");
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }

}
const deleteData = async (req, res) => {
    try {
        let id = req.query.id;
        let record = await categorySchema.findByIdAndDelete(id);
        if (record) {
            console.log("Record Deleted");
            return res.redirect('back');
        }
        else {
            console.log("Record not Delete");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

const editData = async (req, res) => {
    try {
        let id = req.query.id;
        let editCategory = await categorySchema.findById(id);
        if (editCategory) {
            return res.render('category/editCategory', {
                editCategory
            })
        }
        else {
            console.log("record not Send");
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
const updateCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const categoryUpdateId = req.body.categoryUpdateId;
        let updateCategory = await categorySchema.findByIdAndUpdate(categoryUpdateId, {
            category: category
        });
        if (updateCategory) {
            console.log("record Upadted");
            return res.redirect('/viewCategory');
        }
        else {
            console.log("record not Upadted");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}



//subcategory



const viewsubcategory = async (req, res) => {
    try {
        let data = await subcategoryschema.find({}).populate('categoryId');
        console.log(data);
        if (data) {
            return res.render('subcategory/viewsubcategory', {
                data
            });
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
const addsubcategory = async (req, res) => {
    try {
        let record = await categorySchema.find({});//categoryschema
        console.log(record);
        if (record) {
            return res.render('subcategory/addsubcategory', {
                record
            });
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
const subcategoryadd = async (req, res) => {
    try {
        let data = await subcategoryschema.create({
            categoryId: req.body.category,
            subcategory: req.body.subcategory
        });
        if (data) {
            req.flash('success', "Subcategory added")
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const Subcategorydelete = async (req,res)=>{
    try {
        let id = req.query.id;
        let record = await subcategoryschema.findByIdAndDelete(id);
        if (record) {
            console.log("Record Deleted");
            return res.redirect('back');
        }
        else {
            console.log("Record not Delete");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

const editsubcategory = async (req, res) => {
    try {
        let id = req.query.id;
        let categorey = await categorySchema.find({});
        let data = await subcategoryschema.findById(id);
        if (data, categorey) {
            return res.render('subcategory/editsubcategory', {
                data, categorey
            });
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const updatesubcategory = async (req, res) => {
    try {
        id = req.body.id;
        let updatedata = await subcategoryschema.findByIdAndUpdate(id, {
            categoryId: req.body.category,
            subcategory: req.body.subcategory
        })
        if (updatedata) {
            req.flash('update', "Record successfully Updated");
            return res.redirect('/viewsubcategory')
        }
        else {
            req.flash('error', "Record not Updated");
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}


//product


const viewproduct = async (req, res) => {
    try {
        let data = await productschema.find({}).populate('categoryId').populate('subcategoryId');
        console.log(data);
        if (data) {
            return res.render('product/viewproduct', {
                data
            });
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}



const addproduct = async (req, res) => {
    try {
        let categorydata = await categorySchema.find({});
        let subcategorydata = await subcategoryschema.find({});
        if (categorydata, subcategorydata) {
            return res.render('product/addproduct', {
                categorydata,
                subcategorydata
            });
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const ADDproduct=async (req,res)=>{
   
    try {
        let data = await productschema.create({
            categoryId: req.body.category,
            subcategoryId: req.body.subcategory,
            product: req.body.product,
            qty: req.body.qty,
            price: req.body.price,
            description: req.body.description
        });
        if (data) {
            req.flash('success', "product added")
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
const editproduct = async (req, res) => {
    try {
        let id = req.query.id;
        let category = await categorySchema.find({});
        let subcategory = await subcategoryschema.find({});
        let data = await productschema.findById(id);
        if (data, category, subcategory) {
            return res.render('product/editproduct', {
                data, category, subcategory
            });
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}


const updateproduct = async (req, res) => {
    try {
        const { id, category, subcategory, product, qty, price, description } = req.body;

        // Check if image is present in the request body
        if (req.file) {
            let updatedata = await productschema.findByIdAndUpdate(id, {
                categoryId: category,
                subcategoryId: subcategory,
                product: product,
                qty: qty,
                price: price,
                description: description
            });

            if (updatedata) {
                req.flash('update', "Record successfully Updated");
                return res.redirect('/product');
            } else {
                req.flash('error', "Record not Updated");
                return res.redirect('back');
            }
        } else {         
                let updatedata = await productschema.findByIdAndUpdate(id, {
                    categoryId: category,
                    subcategoryId: subcategory,
                    product: product, 
                    qty: qty,
                    price: price,
                    description: description
                });

                if (updatedata) {
                    req.flash('update', "Record successfully Updated");
                    return res.redirect('/viewproduct');
                } else {
                    req.flash('error', "Record not Updated");
                    return res.redirect('back');
                }
            }
        }
    catch (err) {
        console.log(err);
       return false;
    }
};



const deleteproduct = async (req, res) => {

    try {
        let id = req.query.id;
        let record = await productschema.findByIdAndDelete(id);
        if (record) {
            console.log("Record Deleted");
            return res.redirect('back');
        }
        else {
            console.log("Record not Delete");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
module.exports = {
    login,
    register,
    dashboard,
    registerData,
    logindata,
    logout,
    addcategory,
    viewcategory,
    addcategoryData,
    deleteData,
    updateCategory,
    editData,
    addsubcategory,
    viewsubcategory,
    subcategoryadd,
    editsubcategory,
    Subcategorydelete,
    updatesubcategory,
    viewproduct,
    addproduct,
    ADDproduct,
    editproduct,
    updateproduct,
    deleteproduct
}

