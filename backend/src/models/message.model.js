import mongoose from "mongoose";

//import User from "./user.model.js"; // import the User model

const messageSchema = new mongoose.Schema(
    {
        senderId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    
            receiverId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },

            text:{
                type: String,
             
            },
            image:{
                type: String,
            },
        },
          {timestamps: true} // add timestamps to the schema
        );

    const Message = mongoose.model("Message", messageSchema); // create a model from the schema

    export default Message; // export the model for use in other files