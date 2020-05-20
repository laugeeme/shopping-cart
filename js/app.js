'use strict';

//variables
const cart = document.getElementById('carrito');
const courses = document.getElementById('lista-cursos');

//function to add course to cart
function buyCourse(e) {
  e.preventDefault();
  //use delegation to add to cart
  if (e.target.classList.contains('agregar-carrito')) {
    const course = e.target.parentElement.parentElement;
    //send the selected course to take his info
    readCourseInfo(course);
  }
}

//function creates and object with the info of the course
function readCourseInfo(course) {
  const courseInfo = {
    imagen: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.precio span').textContent,
    id: course.querySelector('a').getAttribute('data-id'),
  };
  console.log(courseInfo);
}

//listeners
courses.addEventListener('click', buyCourse);
