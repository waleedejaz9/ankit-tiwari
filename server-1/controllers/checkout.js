const stripe = require("stripe")(process.env.STRIPE_PUBLIC_KEY);
const mongoose = require("mongoose");
const { Membership, BuyMembership } = require("../models/index/index");
const createPaymentIntent=async (payment_id, total, customer_id)=>{
  let paymentIntent;
  try{
    paymentIntent=await stripe.paymentIntents.create({
      payment_method:payment_id,
      amount: total,
      currency: 'USD',
      payment_method_types: ['card'],
      confirm:true,
      customer:customer_id,
    });
  }
  catch(e){

  }
  return paymentIntent;
}

exports.checkoutMembership = async (req, res) => {
    let {_id}=req.user;
    const {type, holderName, cardNumber,expiryDate,cvv, contact, membership, total, email, name}=req.body;
    const splitted_date=expiryDate.split('/');
    expire_year=splitted_date[0];
    expire_month=splitted_date[1];
    let paymentMethod;
    try{
        let due_status;
        if(membership.payment_type==='PIF'){
          due_status='paid';
        }
        else{
          due_status='due';
        }
        const payload={
          ...membership,
          userId: mongoose.Types.ObjectId(_id),
          createdBy:contact,
          due_status:due_status
        };
        if(type==='card'){
          paymentMethod= await stripe.paymentMethods.create({
            type:'card',
            card:{
              number:cardNumber,
              exp_month:expire_month,
              exp_year:expire_year,
              cvc:cvv
            }
          });
          let customer = await stripe.customers.create({
            email: email,
            name:name,
          });
          createPaymentIntent(paymentMethod.id, total, customer.id).then(async (result, err)=>{
            if(err){
              res.send({msg:`${err.message}`, status:'failed'})
            }
            else{
              await BuyMembership.create(payload).then(async (data, err)=>{
                if(data){
                  res.send({msg:'payment successfully done.', status:'success'}) 
                }
                else{
                  res.send({msg:`${err.message}`, status:'failed'})
                }
              }) 
            }
          })
        }
        else{
          await BuyMembership.create(payload).then(async (data, err)=>{
            if(data){
              res.send({msg:'payment successfully done.', status:'success'}) 
            }
            else{
              res.send({msg:`${err.message}`, status:'failed'})
            }
          }) 
        }
    }
    catch(e){
      switch(e.type){
        case 'StripeCardError':
          console.log(`A payment error occurred: ${e.message}`);
          res.send({msg:`${e.message}`, status:'failed'})
          break;
        case 'StripeInvalidRequestError':
          console.log('An invalid request occurred.');
          res.send({msg:`${e.message}`, status:'failed'})
          break;
        default:
          res.send({msg:`Server has an issue. Try again.`, status:'failed'})
          break;
      }
    } 
};



