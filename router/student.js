/**
 * Get express...
 */
const express = require('express');
const { unverifyStudent, showHomePage, createStudent, showSingleStudent, editSingleStudent, studentDataStore, verifyaccount, delete_student, editStudentData,emailverifyaccount, verifyByPhone, verifydone } = require('../controllers/studentContorller');
const multer = require('multer');
const path = require('path');
/**
 * Get Router...
 */
const router = express.Router();

/**
 * Multer config...
 */
const stroage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null, path.join(__dirname,'../public/images/student/'))
    },
    filename : (req,file,cb) =>{
        cb(null, Date.now() + '_' + Math.floor(Math.random() * 100000) + '_' + file.originalname)
    }
});

const singlemulter = multer({
    storage : stroage
}).single('student-photo');

/**
 * Create routing system///
 */
router.get('/', showHomePage);
// Unverify Student...
router.get('/unverify', unverifyStudent);
// Create student...
router.get('/create', createStudent);
router.post('/create', singlemulter, studentDataStore);
router.get('/:id', showSingleStudent)
router.get('/edit/:id', editSingleStudent)
router.post('/edit/:id',singlemulter, editStudentData)
router.get('/verify/:token', emailverifyaccount)
router.get('/delete_student/:id', delete_student);
router.get('/verify-by-phone/:id', verifyByPhone)
router.post('/phone-verify-done', verifydone)
/**
 * Export Router..
 */
module.exports = router;