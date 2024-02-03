const User = require("../models/userModel");

const loadregister = function (req, res) {
  if (req.session.user) {
    res.redirect("/userhome");
  } else if (req.session.admin) {
    res.redirect("/adminhome");
  } else {
    res.render("register");
  }
};

const loginload = function (req, res) {
  if (req.session.user) {
    res.redirect("/userhome");
  } else if (req.session.admin) {
    res.redirect("/adminhome");
  } else {
    res.render("login");
  }
};

const loguser = async (req, res) => {
  const logemail = req.body.email;
  const logpassword = req.body.password;

  try {
    const loggeduser = await User.findOne({
      email: logemail,
      password: logpassword
    });

    if (loggeduser) {
      if (loggeduser.isAdmin === 1) {
        req.session.admin = loggeduser._id;

        res.redirect("/adminhome");
      } else {
        req.session.user = loggeduser._id;

        res.redirect("/userhome");
      }
    } else {
      res.render("login", { errmessage: "Login Failed!!" });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const insertUser = async (req, res) => {
  try {
    const userIn = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mob,
      password: req.body.password,
      isAdmin: 0,
    };

    const result = await User.create(userIn);

    if (result) {
      res.render("login", { message: " Registered Succesfully !!" });
    }
  } catch (error) {
    if (error) {
      res.render("register", { message: " Registration Failed !!" });
    }
  }
};

const loaduserHome = async function (req, res) {
  try {
    if (req.session.user) {
      const userdata = await User.findOne({ _id: req.session.user });
      res.render("userhome", { name: userdata.name });
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const logoutuser = (req, res) => {
  if(req.session.user || req.session.admin)
  {
  req.session.destroy((err) => {
    if (err) {
      console.log("error in logging out");
    } else {
      res.redirect("/");
    }
  });}
  else{
    res.redirect("/")
  }
};

const viewprofile = async function (req, res) {
  try {
    if (req.session.user) {
      const userdata = await User.findOne({ _id: req.session.user });
      res.render("userprofile", { name: userdata.name , user:userdata });
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const editprofileload = async function (req, res) {
  try {
    if (req.session.user) {

      const userdata = await User.findOne({ _id: req.session.user });
      res.render("userprofileedit", { name: userdata.name , user:userdata });
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const editprofile = async (req,res)=>{
  try {
     const uname = req.body.name
      const uemail = req.body.email
      const umobile = req.body.mob
     const  currpass = req.body.pass1
     const  newpass = req.body.pass2
     if(req.session.user)
     {  
      
        const udata = await User.findById({_id:req.session.user})
      
        if(currpass === udata.password)
        {   
            const data = {name:uname , email:uemail , mobile:umobile , password:newpass}
             
            const result = async (req,res) =>{

              try {
                return await User.findByIdAndUpdate({_id:req.session.user},{$set:data})
              } catch (error) {
                console.log(error.message)
              }
            }
            const resdata = result(req,res)
           if(resdata)
           {
            res.redirect("/userhome/viewprofile")
           }
           else
           {
          res.redirect("/userhome/editprofile")

           }
        }
        else{
          res.redirect("/userhome/editprofile")
        }
     }
     else{
      res.redirect("/");

     }
    
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  loadregister,
  insertUser,
  loginload,
  loguser,
  loaduserHome,
  logoutuser,
  viewprofile,
  editprofileload,
  editprofile
};
