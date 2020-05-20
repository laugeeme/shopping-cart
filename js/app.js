'use strict';

//variables
const cart = document.getElementById('carrito');
const courses = document.getElementById('lista-cursos');
const coursesCartList = document.querySelector('#lista-carrito tbody');
const deleteCartBtn = document.getElementById('vaciar-carrito');

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
  setCourseLocalStorage(course);
}

//delete course from cart in the DOM
function deleteCourse(e) {
  e.preventDefault();

  let course;
  let courseId;
  if (e.target.classList.contains('borrar-curso')) {
    e.target.parentElement.parentElement.remove();
    course = e.target.parentElement.parentElement;
    courseId = course.querySelector('a').getAttribute('data-id');
  }

  deleteCourseLocalStorage(courseId);
}

//empty the cart at once in the DOM
function deleteCart() {
  /* coursesCartList.innerHTML = ''; //less desirable way */

  while (coursesCartList.firstChild) {
    coursesCartList.removeChild(coursesCartList.firstChild);
  }
}

//add course to LS
function setCourseLocalStorage(course) {
  let courses;
  //check the result of LS, the result is the list of courses or an empty array.
  courses = getCourseLocalStorage();
  //selected course is added to array
  courses.push(course);
  localStorage.setItem('courses', JSON.stringify(courses));
}

//check for courses at localstorage
function getCourseLocalStorage() {
  let coursesLS;

  if (localStorage.getItem('courses') === null) {
    coursesLS = [];
  } else {
    coursesLS = JSON.parse(localStorage.getItem('courses'));
  }
  return coursesLS;
}

//print courses from LS in the cart
function readLocalStorage() {
  let coursesLS;

  coursesLS = getCourseLocalStorage();

  coursesLS.forEach(function (course) {
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
  });
}

//delete course with the id from LS
function deleteCourseLocalStorage(course, index) {
  let coursesLS;
  coursesLS = getCourseLocalStorage();

  coursesLS.forEach(function (courseLS) {
    if (courseLS.id === course) {
      coursesLS.splice(index, 1);
    }
  });
  localStorage.setItem('courses', JSON.stringify(coursesLS));
}

//listeners
courses.addEventListener('click', buyCourse);
cart.addEventListener('click', deleteCourse);
deleteCartBtn.addEventListener('click', deleteCart);
document.addEventListener('DOMContentLoaded', readLocalStorage);
