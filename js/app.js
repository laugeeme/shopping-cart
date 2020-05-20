'use strict';

//variables
const cart = document.getElementById('carrito');
const courses = document.getElementById('lista-cursos');


//function to add course to cart
function buyCourse(e) {
  e.preventDefault();
  //delegation to add to cart
  if (e.target.classList.contains('agregar-carrito')) {
    const course = e.target.parentElement.parentElement;
    //send the selected course to take his info
    readCourseInfo(course);
  }
}

function readCourseInfo(course) {
  console.log(course);
}

//listeners
courses.addEventListener('click', buyCourse);
