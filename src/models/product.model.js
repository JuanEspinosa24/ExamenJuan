import mongoose from "mongoose";

const {Schema,model} = mongoose;

const productSchema=new Schema({


    name:{
        type: String,
        required:[true,"el campo name es obligatorio"]
    },

    description:{
        type: String,
        required:[true,"el campo descripcion es obligatorio"]
    },
    
    rate:{
        type: String,
        required:[true,"el campo rate es obligatorio"]
    },

    category:{
        type: String,
        required:[true,"el campo category es obligatorio"]
    },

   imgUrl:{
        type: String,
    },

    price:{
        type: String,
        required:[true,"el campo price es obligatorio"]
    },

    stock:{
        type: String,
        required:[true,"el campo stock es obligatorio"]
    },

    // nameImage: String,
    public_id:String
},

    {
    timestamps: true,
    }
);

// postSchema.methods.setImg=function setImg(filename){
//     const url=`http://localhost:4000/public/`;
//     this.imgUrl = url + filename;
//     this.nameImage = filename;
// };

productSchema.methods.setImg = function setImg({secure_url,public_id}){
    this.imgUrl = secure_url;
    this.public_id = public_id;
};

export const productModel=model("product",productSchema);


//VOY AQUI CREANDO PRODUCT