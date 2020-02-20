const express = require('express')
const {MongoClient, ObjectID} =require ('mongodb')
const bodyParser= require('body-parser')
const assert=require('assert')

const app= express()
app.use(bodyParser.json()) 


const mongo_url = 'mongodb://localhost:27017'
const dataBase='first-api'
MongoClient.connect(mongo_url, (err,client)=>{
    assert.equal(err, null , 'data base connection failed')
    const db =client.db(dataBase)

    // app.put('/modify_product/:id',(req,res)=>{
    //     let id = ObjectID(req.params.id)
    //     let modifiedProduct=req.body
    //     db.collection('products').findOneAndUpdate({_id : id},{$set:{...modifiedProduct}},(err,data)=>{
    //         if (err) res.send('ERROR')
    //         else res.send(data)
    //     })
    // })
    app.delete('/delete_product/:id',(req,res)=>{
        let ProductToRemoveId=ObjectID(req.params.id)
        db.collection('products').findOneAndDelete({_id :ProductToRemoveId },(err,data)=>{
            if (err) res.send('cant delete the product')
            else res.send('product deleted')
        })
    })


    // app.post('/new_product', (req,res)=>{
    //     let newProduct = req.body
    //     db.collection('products').insertOne(newProduct,(err,data)=>{
    //         if (err) res.send('cant add product')
    //         else res.send('product added')
    //     })
    // })
    app.get('/products',(req,res)=>{
        db.collection('products').find().toArray((err,data)=>{
            if (err) res.send('cant fetch products')
            else res.send(data)
        })
    })
    // app.get('/product/:id',(req,res)=>{
    //     let searchedProductId=ObjectID(req.params.id)
    //     db.collection('products').findOne({_id : searchedProductId}, (err, data)=>{
    //         if (err) res.send('cant fetch product')
    //         else res.send(data)
    //     })
    // })
})










app.listen(3000,(err)=>{
    if (err) console.log('server err')
    else console.log('server is running on port 3000')
})