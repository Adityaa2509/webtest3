const express = require('express');
const router = express.Router();
const phone = require('../models/Phone');

router.get('/create',(req,resp)=>{
    return resp.render('createphone',{ title: 'HomePage'});
})

router.post('/create',async(req,resp)=>{
    try{
        //get data
        const {phonename,price,isLatest} = req.body;
        //check if user already exist
        console.log(phonename);
        console.log(price);
        console.log(isLatest);
        if(!phonename || !price || !isLatest)
        {
            return resp.render('createphone',{title:"Create Phones"});
        }
        let ac;
        if(isLatest === 'NO'||isLatest === 'No'||isLatest === 'nO'||isLatest === 'no')ac = false;
        else ac = true;
        const user = await phone.create({
            phonename,price,isLatest:ac
        })

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

  router.get('/:id/edit', async (req, res) => {
    
    return res.render('editphone',{ title: 'Edit Phone'});
  });

  router.put('/:id/edit', async (req, res) => {
    const {phonename,price,isLatest} = req.body;
    console.log(phonename);
    console.log(price);
    console.log(isLatest);
    return res.render('home');
  });

router.get('/:id',async(req,resp)=>{
    async (req, res) => {
        const phoneId = req.params.id;
      
        try {
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