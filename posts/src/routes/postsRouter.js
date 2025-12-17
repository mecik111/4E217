const express = require('express');

const router=express.Router();
const libraryController=require('../controllers/postsController')



router.get('/', libraryController.getAll);
router.get('/add', libraryController.getAddForm);
router.post('/add', libraryController.postAdd);
router.get('/edit/:id', libraryController.getEditForm);
router.post('/edit/:id', libraryController.postEdit);
router.post('/delete/:id', libraryController.deletePost);
router.get('/view/:id', libraryController.getOne);

module.exports=router;