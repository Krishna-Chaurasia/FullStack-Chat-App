import user from "../models/user.model.js";
import Message from "../models/message.model.js"; // import the Message model
import cloudinary from "../lib/cloudinary.js"; // import cloudinary for image upload
import { getReceiverSocketId, io } from "../lib/socket.io.js"; // import socket.io instance

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // get the logged in user id from the request
        const filteredUsers = await user.find({_id: { $ne: loggedInUserId } }).select("-password"); // find all users except the logged in user and exclude password and __v fields
        res.status(200).json(filteredUsers); // send the filtered users as response


    } catch (error) {
        console.error("Error in getUsersForSidebar:", error.message); // log the error to the console
        res.status(500).json({error: "Internal server error"}); // send a 500 response with an error message
  
    }
}

export const getMessages = async (req, res) => {
       try{ const { id:userToChatId } = req.params; // here id is same as :id in the route, and id is renamed to userToChatId 
        const myId = req.user._id; // get the logged in user id from the request
      
        const messages = await Message.find({ // find all messages where senderId is logged in user id and receiverId is userToChatId or vice versa
            $or: [
                { senderId:myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })
    res.status(200).json(messages); // send the messages as response

    } catch (error) {
        console.error("Error in getMessages controller: ", error.message); // log the error to the console
        res.status(500).json({error: "Internal server error"}); // send a 500 response with an error message    
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params; // here id is same as :id in the route, and id is renamed to receiverId 
        const senderId = req.user._id; // get the logged in user id from the request
        const { text, image } = req.body; // get the text and image from the request body

        let imageUrl;
        if(image) {
            //Upload base64 image to cloudinary and get the url}
            const uploadResponse = await cloudinary.uploader.upload(image); // upload the image to cloudinary and get the response
            imageUrl = uploadResponse.secure_url; // get the secure url from the response
    } 

        const newMessage = new Message({ // create a new message object
            senderId,
            receiverId,
            text,
            image: imageUrl // set the image url to the message object
        });

        await newMessage.save(); // save the message to the database

        //real time functionality goes here => socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

        res.status(201).json(newMessage); // send the new message as response
    
} catch (error) {
        console.error("Error in sendMessage controller: ", error.message); // log the error to the console
        res.status(500).json({error: "Internal server error"}); // send a 500 response with an error message    
    }
};