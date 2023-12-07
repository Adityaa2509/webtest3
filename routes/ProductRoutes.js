const express = require('express');
const router = express.Router();
const phone = require('../models/Phone');

router.get('/create',(req,resp)=>{
    return resp.render('createphone',{ title: 'HomePage'});
})

router.post('/create',async(req,resp)=>{
    try{
        //get data
        const {phonename,price,isIos} = req.body;
        //check if user already exist
        console.log(phonename);
        console.log(price);
        console.log(isIos);
        if(!phonename || !price || !isIos)
        {
            return resp.render('createphone',{title:"Create Phones"});
        }
        let ac;
        if(isIos === 'NO')ac = false;
        else ac = true;
        //create entry for Phone
        const user = await phone.create({
            phonename,price,isIos:ac
        })

        //res.render('home',{title:"HomePage"});
        resp.redirect('/home');
        
    }
    catch(error) {
        console.error(error);
        return resp.status(500).json({
            success:false,
            message:'User cannot be registered, please try again later',
        });
    }
    
})
router.get('/delete/:id', async (req, res) => {
    const phoneId = req.params.id;
  
    try {
      // Find the phone by ID and remove it
      const deletedPhone = await phone.findByIdAndDelete(phoneId);
      console.log(deletedPhone);
      if (deletedPhone) {
        return res.redirect('/home'); // No content, successful deletion
      } else {
        res.status(404).json({ error: 'Phone not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.get('/:id',async(req,resp)=>{
    async (req, res) => {
        const phoneId = req.params.id;
      
        try {
          // Find the phone by ID and return it
          const phone = await phone.findById(phoneId);
          
          if (phone) {
            return res.render('show',{title:"Show",phone:phone});
          } else {
            res.status(404).json({ error: 'Phone not found' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
        

}});
      
module.exports = router;