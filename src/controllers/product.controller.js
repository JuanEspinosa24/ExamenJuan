import { eliminarImagenCloudinary, subirImageACloudinary } from "../helpers/cloudinary.actions.js";
import { response } from "../helpers/Response.js"
import { productModel } from "../models/product.model.js"
const productCtrl={}

productCtrl.listar=async(req,res)=>{
    try {
        
        const posts=await productModel.find();
        response(res,200,true,posts,"lista de posts");

    } catch (error) {

        response(res,500,false,"",error.message);

    }
};

productCtrl.listOne=async(req,res)=>{
    try {
        const {id} = req.params;
        const post=await productModel.findById(id)
        if(!post){
            return response(res,404,false,"","registro no encontrado")
        }
        response(res,200,true,post,"post encontrado")
    } catch (error) {
        response(res,500,false,"",error.message);
    }
}

productCtrl.add = async (req,res) => {
    try {
        
        const {name,description,rate,category,user,price,stock}=req.body
        const newPost= new productModel({
            name,description,rate,category,user,price,stock
        });

        // req.file && newPost.setImg(req.file.filename);

        if(req.file){
            const { secure_url, public_id } = await subirImageACloudinary(req.file);
            newPost.setImg({secure_url,public_id});
        }

        await productModel.create(newPost);

        response(res, 201, true, newPost, "post creado");
    } catch (error) {
        response(res,500,false,"",error.message);
    }
};

//Listar por id,eliminar y act post

productCtrl.delete=async(req,res)=>{
    try {
        const {id}=req.params;
        const post=await productModel.findById(id)
        if (!post) {
            return response(res,404,false,"","registro no encontrado")
        }

        // post.nameImage && deleteImg(post.nameImage);

        if (post.public_id){
            await eliminarImagenCloudinary(post.public_id);
        }

        await post.deleteOne()
        response(res,200,true,"","post eliminado");

    } catch (error) {
        response(res,500,false,"",error.message);
    }
};

//Update actualizar

productCtrl.update=async(req,res)=>{
    try {
        const {id}=req.params;
        const post=await productModel.findById(id)
        if (!post) {
            return response(res,404,false,"","registro no encontrado")
        }

        if (req.file) {
            // post.nameImage && deleteImg (post.nameImage);
            // post.setImg(req.file.filename);

            if (post.public_id){
                await eliminarImagenCloudinary(post.public_id);
            }

            const { secure_url, public_id } = await subirImageACloudinary(req.file); 
            post.setImg({ secure_url, public_id });

            await post.save()
        }

        await post.updateOne(req.body);

        response(res,200,true,"","post actualizado");

    } catch (error) {
        response(res,500,false,"",error.message);
    }
}

export default productCtrl;

//VALIDAR CON MIDDLEWARE Y EN RUTAS POST

//subir img a la nube finalizado :) finish