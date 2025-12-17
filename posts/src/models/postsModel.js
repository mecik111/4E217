const { ObjectId } = require('mongodb');
const { getDB } = require('../data/connection');


async function getAllPosts() {
    const db = getDB();
    return await db.collection('posts').find().sort({ createdAt: -1 }).toArray();
}

async function getPostsByType(postType) {
    const db = getDB();
    return await db.collection('posts').find({ postType }).sort({ createdAt: -1 }).toArray();
}

async function getPostById(id) {
    const db = getDB();
    return await db.collection('posts').findOne({ _id: new ObjectId(id) });
}

async function addPost({ title, description, postType, passwordHash }) {
    const db = getDB();
    await db.collection('posts').insertOne({
        title,
        description,
        postType,
        passwordHash,
        createdAt: new Date()
    });
}

async function updatePost(id, { title, description, postType, passwordHash }) {
    const db = getDB();
    await db.collection('posts').updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                title,
                description,
                postType,
                passwordHash
            }
        }
    );
}

async function deletePost(id) {
    const db = getDB();
    await db.collection('posts').deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
    getAllPosts,
    getPostsByType,
    getPostById,
    addPost,
    updatePost,
    deletePost
};