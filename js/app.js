'use strict';

//variables
const cart = document.getElementById('carrito');
const courses = document.getElementById('lista-cursos');
const coursesCartList = document.querySelector('#lista-carrito tbody');

//Add course to cart
function buyCourse(e) {
  e.preventDefault();
  //use delegation to add to cart
  if (e.target.classList.contains('agregar-carrito')) {
    const course = e.target.parentElement.parentElement;
    //send the selected course to take his info
    readCourseInfo(course);
  }
}

//creates and object with the info of the course
function readCourseInfo(course) {
  const courseInfo = {
    imagen: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.precio span').textContent,
    id: course.querySelector('a').getAttribute('data-id'),
  };

  addToCart(courseInfo);
}

//show the selected course in the cart. We insert the html
function addToCart(course) {
  const row = document.createElement('tr'); //table row
  row.innerHTML = `
        <td>
            <img src="${course.imagen}">
        </td>
        <td>${course.title}</td>
        <td>${course.price}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${course.id}">X</a>
        </td>
    `;
  coursesCartList.appendChild(row);
}

//delete course from cart in the DOM
function deleteCourse(e) {
  e.preventDefault();

  let course;
  if (e.target.classList.contains('borrar-curso')) {
    e.target.parentElement.parentElement.remove();
  }
}

//listeners
courses.addEventListener('click', buyCourse);
cart.addEventListener('click', deleteCourse);
