import mongoose from "mongoose";

export const dbIdRelationshipsParamsValidation = (req, res, next) => {
    if(req.params.commentId){
        if(!mongoose.Types.ObjectId.isValid(req.params.commentId)) return res.status(401).json({
            'message': 'Invalid Id Type!',
            'errorStatus' : true
        });
    }

    if(req.params.postId){
        if(!mongoose.Types.ObjectId.isValid(req.params.postId)) return res.status(401).json({
            'message': 'Invalid Id Type!',
            'errorStatus' : true
        });
    }
    next();
};

export const dbIdPostParamsValidation = (req, res, next) => {
    if(req.params.id){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(401).json({
            'message': 'Invalid Id Type!',
            'errorStatus' : true
        });
    }
    next();
};

export const dbIdCommentsParamsValidation = (req, res, next) => {
    if(req.params.commentId){
        if(!mongoose.Types.ObjectId.isValid(req.params.commentId)) return res.status(401).json({
            'message': 'Invalid Id Type!',
            'errorStatus' : true
        });
    }

    if(req.params.postId){
        if(!mongoose.Types.ObjectId.isValid(req.params.postId)) return res.status(401).json({
            'message': 'Invalid Id Type!',
            'errorStatus' : true
        });
    }
    next();
};