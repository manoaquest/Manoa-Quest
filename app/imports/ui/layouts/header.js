import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Header.helpers({
  routeUserName() {
    return FlowRouter.getParam('username');
  },
});
