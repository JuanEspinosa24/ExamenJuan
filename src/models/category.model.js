import mongoose from "mongoose";

const {Schema,model} = mongoose;

const categorySchema=new Schema({


    name:{
        type: String,
        required:[true,"el campo name es obligatorio"]
    },

    description:{
        type: String,
        required:[true,"el campo descripcion es obligatorio"]
    },

    imgUrl:{
        type: String,
        required:[true,"el campo imgUrl es obligatorio"]
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

categorySchema.methods.setImg = function setImg({secure_url,public_id}){
    this.imgUrl = secure_url;
    this.public_id = public_id;
};

export const categoruModel=model("category",categorySchema);
