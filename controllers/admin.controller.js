const adminModel=require('../models/admin.model')
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
class AdminController {
  constructor() {}



 /**
   * @Method userAuth
   * @Description To check authentic user
   */
  async userAuth(req,res,next){
    try {
      if(req.user){
        next()
      }else{
        res.redirect('/')

      }
    } catch (err) {
      throw err
    }
  }


  /**
   * @Method showIndex
   * @Description To Show The Index Page / Login Page
   */
  async showIndex(req, res) {
    try {
      res.render("admin/index", {
        title: "Admin || Login",
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @Method dashboard
   * @Description To Show The Dashboard
   */
  async dashboard(req, res) {
    try {
      res.render("admin/dashboard", {
        title: "Admin || Dashboard",
        user:req.user
      })
    } catch (err) {
      throw err;
    }
  }

  /**
   * @Method template
   * @Description Basic Template
   */
   async template(req, res) {
    try {
      res.render("admin/template", {
        title: "Admin || Template",
        user:req.user
      })
    } catch (err) {
      throw err;
    }
  }

  /** 
  *@method:get register
  *@description:To show register page
  */
 async getRegister(req,res){
  try{
    res.render("admin/register", {
      title: "Admin || Register",
    });
  }catch(err){
    throw err
  }
 }

 /** 
  *@method: register
  *@description:To  register 
  */
 async register(req,res){
  try{
    console.log(req.body);
    console.log(req.file);
    req.body.image=req.file.filename
    if(req.body.password===req.body.repeatPassword){
      req.body.password=bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10)
      )
      // console.log(req.body);
      let saveData=await adminModel.create(req.body)
      if(saveData && saveData._id){
        console.log("Register successfuly done");
        res.redirect('/')
      }else{
        console.log("Register unsuccesfull");
        res.redirect('/getRegister')
      }

    }else{
      console.log("password and repeatPassword should be match");
      res.redirect('/getRegister')
    }
   
  }catch(err){
    throw err
  }
 }

/** 
  *@method: login
  *@description:To  Login 
  */
 async login(req,res){
  try {
    let isUserExists=await adminModel.findOne({
      email:req.body.email,
    })
    console.log(isUserExists);
    if(isUserExists){
      const hashPassword=isUserExists.password
      if(bcrypt.compareSync(req.body.password,hashPassword)){
        // token creation
        const token=jwt.sign({
          id:isUserExists._id,
          email:isUserExists.email,
          name:isUserExists.firstName,
          image:isUserExists.image
        },
        'g5b8m4s4d9',
        {expiresIn:'5m'}
        )
        console.log("Login successfull");
        res.cookie('adminToken',token)
      res.redirect('/dashboard')
    }else{
      console.log("Wrong Password");
      res.redirect('/')
    }
  }else{
      console.log("Login unsuccessfull");
      res.redirect('/')
    }
    
  } catch (err) {
    throw err
  }
 }

 /**
   * @Method logOut
   * @Description To Logout
   */

 async logout(req,res){
  try {
    // console.log("hello")
      res.clearCookie('adminToken')
      console.log('Cookie Cleared!')
      res.redirect('/')
    
  } catch (err) {
    throw err
  }
 }
}

module.exports = new AdminController();
