import mongoose from "mongoose";

const {Schema,model} = mongoose;

const postSchema=new Schema({


    name:{
        type: String,
        required:[true,"el campo name es obligatorio"]
    },

    lastname:{
        type: String,
        required:[true,"el campo lastname es obligatorio"]
    },

    email:{
        type: String,
        required:[true,"el campo email es obligatorio"]
    },

    password:{
        type: String,
        required:[true,"el campo password es obligatorio"]
    },

    // nameImage: String,
    imgUrl:{
        type: String,
        default: null,
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

postSchema.methods.setImg = function setImg({secure_url,public_id}){
    this.imgUrl = secure_url;
    this.public_id = public_id;
};

export const postModel=model("post",postSchema);
