import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'Landing_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Landing_Page' });
  },
});

FlowRouter.route('/approve-quest', {
  name: 'Approve_Quest_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Approve_Quest_Page' });
  },
});

FlowRouter.route('/create-quest', {
  name: 'Create_A_Quest_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Create_A_Quest_Page' });
  },
});

FlowRouter.route('/student-home-page', {
  name: 'Student_Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Student_Home_Page' });
  },
});

FlowRouter.route('/teacher-page', {
  name: 'Teacher_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Teacher_Page' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};