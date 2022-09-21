$(document).ready( function () {
    $('#unverifyTable').DataTable();
} );
/**
 * Custome Js Code form here...
 */
const get_image = document.getElementById('get_image');
const get_img = document.querySelector('.get_image');
const remove_image = document.querySelector('.remove_image');
const preview_image = document.querySelector('.preview_image');

if (get_image) {
    get_image.onchange = (e) =>{
        const image_link = URL.createObjectURL(e.target.files[0]);
        preview_image.style.display = "block";
        preview_image.setAttribute('src', image_link);
        get_img.style.display = "none";
        remove_image.style.display = "block";
    }
}
if (remove_image) {
    remove_image.onclick = (e) =>{
        e.preventDefault();
        preview_image.style.display = "none";
        get_img.style.display = "block";
        remove_image.style.display = "none";
    };
}
const delete_student = document.querySelectorAll('.delete_student');
if (delete_student) {
    delete_student.forEach(item => {
        item.onclick = () =>{
            const confi = confirm(`Hey, Are you sure to delete this data`);
            if (confi) {
                return true;
            } else {
                return false;
            }
        }
    });
}
