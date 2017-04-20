import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Landing_Page.onCreated(function onCreated() {
  console.log("This is the landing page edit...");
  $('.ui.checkbox').checkbox();
});

Template.Landing_Page.events({
  'click .sign-in-button': function(event) {
    event.preventDefault();
    FlowRouter.go('Student_Home_Page');
  },
});
