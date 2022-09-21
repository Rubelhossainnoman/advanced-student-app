/**
 * Get Path module...
 */
const path = require('path');
const {readFileSync,writeFileSync} = require('fs');
const sendEmail = require('../utility/sendEmail');
const sendSms = require('../utility/sendSMS');
const sendMessageUseBD = require('../utility/sendSMSBd');

/**
 * Create controllers...
 */
const showHomePage = (req,res) =>{
    const students = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    const verifyed_student = students.filter(data => data.isverify == true && data.phone_token == true);
    res.render('student/index', {
        verifyed_student
    });
}
const unverifyStudent = (req,res) =>{
    const students = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    const unverifyed_student = students.filter(data => data.isverify == false || data.phone_token == false);
    res.render('student/unverify',{
        unverifyed_student
    });
}
/**
 * Verify student by email line 29 to 38...
 */
const emailverifyaccount = (req,res) =>{
    const students = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    const for_verify = students.find(data => data.token == req.params.token);
    students[students.findIndex(data => data.token == req.params.token)] ={
        ...students[students.findIndex(data => data.token == req.params.token)],
        isverify : true
    }
    writeFileSync(path.join(__dirname,'../db/student.json'), JSON.stringify(students));
    res.redirect('/student/unverify');
}

/**
 * Phone verify method post...line 43 to 68...
 */
const verifyByPhone = async (req,res) =>{
    const students = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));

    const phone_token = Math.floor(Math.random() * 100000);
    const for_data = students.find(data=> data.id == req.params.id);

    // Using bulksmsbd...
    await sendMessageUseBD(for_data.phone, `Hey, ${for_data.name}, Contrates! Your OTP code is ${phone_token}`);

    // Using twilio...
    // await sendSms(for_data.phone, `Hi, ${for_data.name}, Congrates! Your OTP code is ${phone_token}`);

    students[students.findIndex(data => data.id == req.params.id)] = {
        ...students[students.findIndex(data => data.id == req.params.id)],
        phone_token : phone_token
    }
    writeFileSync(path.join(__dirname,'../db/student.json'), JSON.stringify(students));
    res.render('student/phone-verify');
};
const verifydone = (req,res) =>{
    const {num} = req.body;
    const students = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    students[students.findIndex(data => data.phone_token == num)] = {
        ...students[students.findIndex(data => data.phone_token == num)],
        phone_token : true
    }
    writeFileSync(path.join(__dirname,'../db/student.json'), JSON.stringify(students));
    res.redirect('/student/unverify');
}

/**
 * Create student here... line 73 to 105...
 */
const createStudent = (req,res) =>{
    res.render('student/create');
}
const studentDataStore = async (req,res) =>{
    const {name,email,phone,dep} = req.body;
    const students = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    const token = (Date.now() + '_' + Math.floor(Math.random() * 1000000));
    await sendEmail(name,email, 'Verify Your Account',token);

    // Get id...
    let get_id = 1;
    if (students.length > 0) {
        get_id = students[students.length - 1].id + 1;
    }
    
    // Data create and push...
    students.push({
        id : get_id,
        name : name,
        email : email,
        phone : phone,
        dep : dep,
        photo :req.file ? req.file.filename : "avatar.jpg",
        isverify : false,
        token : token,
        phone_token : false
    });

    // Data write..here...
    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(students));

    // redirect unverify page...
    res.redirect('/student/unverify');
}

/**
 * Show Single Student data....
 */
const showSingleStudent = (req,res) =>{
    const students = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    const single_student = students.find(data => data.id == req.params.id);
    res.render('student/show',{
        single_student
    });
}

/**
 * Edit single student line... 121 to 143....
 */
const editSingleStudent = (req,res) =>{
    const students = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    const edit_data = students.find(data => data.id == req.params.id);
    res.render('student/edit',{
        edit_data
    });
}
const editStudentData = (req,res) =>{
    const id = req.params.id;
    const {name,email,phone,dep} = req.body;
    const students = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    students[students.findIndex(data => data.id == req.params.id)] = {
        ...students[students.findIndex(data => data.id == id)],
        name : name,
        email : email,
        phone : phone,
        dep : dep,
        photo : req.file ? req.file.filename : "avatar.jpg"
    }
    writeFileSync(path.join(__dirname,'../db/student.json'), JSON.stringify(students));
    res.redirect(`/student`)
    
}

/**
 * Delete Student Data...
 */
const delete_student = (req,res) =>{
    const students = JSON.parse(readFileSync(path.join(__dirname,'../db/student.json')));
    const student = students.filter(data => data.id != req.params.id);
    writeFileSync(path.join(__dirname,'../db/student.json'), JSON.stringify(student));
    res.redirect('/student');
}

/**
 * Export controllers item...
 */
module.exports = {
    showHomePage,
    unverifyStudent,
    createStudent,
    showSingleStudent,
    editSingleStudent,
    studentDataStore,
    emailverifyaccount,
    delete_student,
    editStudentData,
    verifyByPhone,
    verifydone
}