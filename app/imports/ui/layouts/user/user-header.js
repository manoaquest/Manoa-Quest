import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.User_Header.helpers({
  routeUserName() {
    console.log('user-header_login on click');
    return FlowRouter.getParam('username');
  },
});
