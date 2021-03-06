import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { $ } from 'meteor/jquery';

// Landing Route

FlowRouter.route('/', {
  name: 'Landing_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Landing_Page' });
  },
});

// Quest Routes

FlowRouter.route('/approve-quest', {
  name: 'Approve_Quest_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Approve_Quest_Page' });
  },
});

FlowRouter.route('/create-quest', {
  name: 'Create_A_Quest_Page',
  action() {
    BlazeLayout.render('Prof_Layout', { main: 'Create_A_Quest_Page' });
  },
});

FlowRouter.route('/edit-quest/:_id', {
  name: 'Edit_Quest_Page',
  action() {
    BlazeLayout.render('Prof_Layout', { main: 'Edit_Quest_Page' });
  },
});

FlowRouter.route('/leaderboard', {
  name: 'Leaderboard_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Leaderboard_Page' });
  },
});

// Profile Routes

function addUserBodyClass() {
  $('body').addClass('user-layout-body');
}

function removeUserBodyClass() {
  $('body').removeClass('user-layout-body');
}

const userRoutes = FlowRouter.group({
  prefix: '/:username',
  name: 'userRoutes',
  triggersEnter: [addUserBodyClass],
  triggersExit: [removeUserBodyClass],
});

export const profilePageRouteName = 'Profile_Page';
userRoutes.route('/profile', {
  name: profilePageRouteName,
  action() {
    BlazeLayout.render('User_Layout', { main: profilePageRouteName });
  },
});

export const submitPageRouteName = 'Submit_Quest_Page';
FlowRouter.route('/submit-quest/:_id', {
  name: submitPageRouteName,
  action() {
    BlazeLayout.render('Student_Layout', { main: submitPageRouteName });
  },
});

// Page Not Found Route

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};
