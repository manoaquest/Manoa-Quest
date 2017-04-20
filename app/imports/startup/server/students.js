import { Students } from '../../api/students/students.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Students to pre-fill the Collection.
 * @type {*[]}
 */
const studentsSeeds = [
  { 
  	questName: 'E42: Digits Part 1', 
  	exp: 10,
  	dueDate:'March 8, 2017',
  	description: 'For this experience, you will start designing a simple Meteor application called Digits. This part will have you create a mockup of the home page.'
  },
  { 
  	questName: 'E42: Digits Part 2', 
  	exp: 10,
  	dueDate:'March 8, 2017',
  	description: 'For this experience, you will start designing a simple Meteor application called Digits. This part will have you create a mockup of the add contacts and edit contacts page.'
  }
];

/**
 * Initialize the Students collection if empty with seed data.
 */
if (Students.find().count() === 0) {
  _.each(studentsSeeds, function seedStudents(students) {
    Students.insert(students);
  });
}
