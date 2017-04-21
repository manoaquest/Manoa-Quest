// import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '/imports/api/profile/ProfileCollection';

/* eslint-disable no-console */

// Old code
/* When running app for first time, pass a settings file to set up a default user account. */
/*
if (Meteor.users.find().count() === 0) {
  if (!!Meteor.settings.defaultAccount) {
    Accounts.createUser({
      username: Meteor.settings.defaultAccount.username,
      password: Meteor.settings.defaultAccount.password,
    });
  } else {
    console.log('No default user!  Please invoke meteor with a settings file.');
  }
}
*/

/* Create a profile document for this user if none exists already. */
Accounts.validateNewUser(function validate(user) {
  if (user) {
    const username = user.services.cas.id;
    if (!Profiles.isDefined(username)) {
      Profiles.define({ username });
    }
  }
  // All UH users are valid for Manoa Quest.
  return true;
});
