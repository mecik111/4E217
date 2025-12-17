const libraryModel = require('../models/postsModel');
const crypto = require('crypto');


function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}


async function getAll(req, res) {
    let posts;
    if (req.query.type) {
        posts = await libraryModel.getPostsByType(req.query.type);
    } else {
        posts = await libraryModel.getAllPosts();
    }
    res.render('pages/index', { posts, selectedType: req.query.type || '' });
}


function getAddForm(req, res) {
    res.render('pages/add');
}



async function postAdd(req, res) {
    try {
        const { title, description, postType, password } = req.body;
        if (!title || !description || !postType || !password) {
            return res.render('pages/add', { error: 'Wszystkie pola są wymagane!' });
        }
        if (password.length < 4) {
            return res.render('pages/add', { error: 'Hasło musi mieć min. 4 znaki!' });
        }
        const passwordHash = hashPassword(password);
        await libraryModel.addPost({
            title,
            description,
            postType,
            passwordHash
        });
        res.redirect('/');
    } catch (err) {
        res.render('pages/add', { error: 'Błąd dodawania posta!' });
    }
}

async function getEditForm(req, res) {
    const post = await libraryModel.getPostById(req.params.id);
    if (!post) {
        return res.redirect('/');
    }
    res.render('pages/edit', { post});
}


async function postEdit(req, res) {
    const id = req.params.id;
    const { title, description, postType, password } = req.body;
    const post = await libraryModel.getPostById(id);
    if (!post) {
        return res.render('pages/edit', { post, error: 'Post nie istnieje!' });
    }
    const passwordMatch = hashPassword(password) === post.passwordHash;
    if (!passwordMatch) {
        return res.render('pages/edit', { post, error: 'Nieprawidłowe hasło!' });
    }
    await libraryModel.updatePost(id, {
        title,
        description,
        postType,
        passwordHash: post.passwordHash
    });
    res.redirect('/');
}


async function deletePost(req, res) {
    const id = req.params.id;
    const { password } = req.body;
    const post = await libraryModel.getPostById(id);
    if (!post) {
        return res.redirect('/');
    }
    const passwordMatch = hashPassword(password) === post.passwordHash;
    if (!passwordMatch) {
        // Pobieranie znowu wszystkich postow zeby mozna bylo wyswietlic blad normalnie
        let posts;
        if (req.query.type) {
            posts = await libraryModel.getPostsByType(req.query.type);
        } else {
            posts = await libraryModel.getAllPosts();
        }
        return res.render('pages/index', { posts, selectedType: req.query.type || '', error: 'Nieprawidłowe hasło!' });
    }
    await libraryModel.deletePost(id);
    res.redirect('/');
}

async function getOne(req, res) {
    const post = await libraryModel.getPostById(req.params.id);
    if (!post) {
        return res.redirect('/');
    }
    res.render('pages/view', { post });
}


module.exports = {
    getAll,
    getAddForm,
    postAdd,
    getEditForm,
    postEdit,
    deletePost,
    getOne
};