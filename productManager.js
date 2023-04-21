import fs from "fs";

const fs = require("fs");
if (!fs.existsSync("products.json")) {
    fs.writeFileSync("products.json", "[]");
    }
  class ProductManager {
    
    constructor(path) {
        this.products = [];
        this.path = path
        this.idAutoInc = -1
    }
    loadDB(){
        this.products = JSON.parse(fs.readFileSync(this.path))
        if(this.products.length>0){
        this.idAutoInc=this.products[this.products.length-1].id
        }
    }
    updateDB(){
        fs.writeFileSync(this.path, JSON.stringify(this.products, null , 2)) 
    }
    
    addProduct(title,description,price,thumbnail,code,stock){
        this.loadDB()
        this.idAutoInc++
        const repeatedProduct = this.products.some(item => item.code === code)
        if(repeatedProduct === false && title && description && price && thumbnail && code && stock){
            this.products.push({
                id:this.idAutoInc,
                title: title,
                description:description,
                price:price,
                thumbnail:thumbnail,
                code:code,
                stock:stock

            })
            this.updateDB()
            

        }else{
            console.log("Error, duplicated product, or invalid parameters")
        }
    }

    getProducts(){
        this.loadDB()
        if(this.products){
            return this.products
        }else{
            console.log("Product list is empty.");
        }
       
    }

    getProductById(id){
        this.loadDB()
        const productIfExists = this.products.find(product => product.id === id)
        if(productIfExists){
            return productIfExists
        }else{
            console.log(`Failed to get Product, Product ${id} was not found`)
        }
    }

    updateProduct(id,parameters){
        this.loadDB()
        
        const index = this.products.findIndex(product => product.id === id)
        if(index !== -1){
            const parameterTitle=parameters.title ?? this.products[index].title;
            const parameterDescription=parameters.description ?? this.products[index].description;
            const parameterPrice=parameters.price ?? this.products[index].price;
            const parameterThumbnail=parameters.thumbnail ?? this.products[index].thumbnail;
            const parameterCode=parameters.code ?? this.products[index].code;
            const parameterStock=parameters.stock ?? this.products[index].stock;
    
            this.products[index] = {
                id:id,
                title:parameterTitle,
                description:parameterDescription,
                price:parameterPrice,
                thumbnail:parameterThumbnail,
                code:parameterCode,
                stock:parameterStock
            }
            this.updateDB()
        }else{
            console.log(`Product ${id} was not found`) 
        }
    }

    deleteProduct(id){
        this.loadDB()
        const index = this.products.findIndex(product => product.id === id)
        if(index !== -1){
            this.products.splice(index,index+1)
            this.updateDB()
            console.log("product deleted succesfully")
          }else{
            console.log(`Failed to Delete Product, Product ${id} was not found`)
          }
        }
    }





const juansito = new ProductManager("products.json");

juansito.addProduct("empanada1","una rica empanada",330,"empanada.jpg","328a",33)
juansito.addProduct("empanada2","una rica empanada",330,"empanada.jpg","328b",33)
juansito.addProduct("empanada3","una rica empanada",330,"empanada.jpg","328c",33)
console.log(juansito.getProducts())

juansito.updateProduct(1,{price:300,stock:50})

console.log(juansito.getProducts())