
// import mongoose from "mongoose";

// export async function connect() {
//     try {
//         mongoose.connect(process.env.MONGO_URI!);
//         const connection = mongoose.connection;
        
//         connection.on('connected', () => {
//             console.log('MongoDB connected successfully')
//         })

//         connection.on('error', (err) => {
//             console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
//             process.exit();
//         })


//     } catch (error) {
//     console.log('something goes wrong');
//     console.log(error);

//     }

//     }

import mongoose from 'mongoose';

export async function connect() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI environment variable is not defined");
        }

        // No need to specify deprecated options
        await mongoose.connect(process.env.MONGO_URI);

        const connection = mongoose.connection;
        
        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.error('MongoDB connection error. Please make sure MongoDB is running: ', err);
            process.exit(1);  
        });

    } catch (error) {
        console.error('Something went wrong during MongoDB connection:', error);
        process.exit(1);  
    }
}
