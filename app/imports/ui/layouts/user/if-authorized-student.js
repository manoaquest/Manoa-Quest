import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Profiles } from '/imports/api/profile/ProfileCollection';

Template.If_Authorized_Student.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
});

Template.If_Authorized_Student.helpers({
  /**
   * @returns {*} True if Meteor is in the process of logging in.
   */
  authInProcessStudent: function authInProcessStudent() {
    return Meteor.loggingIn();
  },

  /**
   * Determine if the user is authorized to view the current page.
   * If current role matches the page's role, they are authorized.
   * Otherwise, they are not authorized.
   * @returns {boolean} True if there is a logged in user and they are authorized to visit the page.
   */
  isAuthorizedStudent: function isAuthorizedStudent() {
    // Only logged in users can see a page protected by this template.
    if (!Meteor.user()) {
      return false;
    }
    const profileData = Profiles.findDoc(Meteor.user().profile.name);
    // Check that the current user is accessing a page with their role
    return (profileData.role === 'student');
  },
});
