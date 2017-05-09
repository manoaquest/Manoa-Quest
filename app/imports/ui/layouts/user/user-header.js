import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict';




Template.User_Header.helpers({
  routeUserName() {
    console.log('user-header_login on click');
    return FlowRouter.getParam('username');
  },
});

Template.User_Header.events({
  'click .home-page': function appproveQuest(event) {
    console.log("Click Event");
    const route = '/' + Meteor.user().profile.name + '/profile'; // eslint-disable-line prefer-template
    // FlowRouter.go('/' + student + '/profile');
    FlowRouter.go(route);
  },
});