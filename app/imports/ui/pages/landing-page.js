import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

Template.Landing_Page.onCreated(function onCreated() {
  console.log('This is the landing page edit...');
  // $('.ui.checkbox').checkbox();
});

Template.Landing_Page.events({
  /**
   * Handle the click on the logout link.
   * @param event The click event.
   * @returns {boolean} False.
   */
  // pretty sure this will never happen
  // since while logged in it auto routes to profile
  'click .sign-out-button': function casLogout(event) {
    event.preventDefault();
    Meteor.logout();
    return false;
  },

  /**
   * Handle the click on the login link.
   * @param event The click event.
   * @returns {boolean} False.
   */
  'click .sign-in-button': function casLogin(event) {
    event.preventDefault();
    const callback = function loginCallback(error) {
      if (error) {
        console.log(error);
      } else { FlowRouter.go('Student_Home_Page');}
    };
    Meteor.loginWithCas(callback);
    return false;
  },
});
