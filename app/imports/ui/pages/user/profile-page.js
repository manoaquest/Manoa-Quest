import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
// import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Profile_Page.onCreated(function onCreated() {
  console.log('profile page');
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Profiles.getSchema().namedContext('Profile_Page');
});

Template.Profile_Page.helpers({
  roleCheck() {
    const profileData = Profiles.findDoc(FlowRouter.getParam('username'));
    // small rewrite to fix eslint errors
    // console.log('Profile Data: ' + profileData.role);
    /*
    if (profileData.role === 'student' || profileData.role === undefined) {
      return 'Student_Profile';
    }
    */
    if (profileData.role === 'prof') {
      return 'Teacher_Profile';
    }
    return 'Student_Profile';
  },
});

Template.Profile_Page.events({});

