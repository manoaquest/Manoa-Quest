import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { QuestData } from '/imports/api/quests/questsdata';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Student_Profile.onCreated(function onCreated() {
  console.log('student profile');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);

  // Subscribe to the profile metadata
  this.subscribe(Profiles.getPublicationName());
  this.context = Profiles.getSchema().namedContext('Profile_Page');

  // Subscribe to the quest metadata
  this.subscribe(QuestData.getPublicationName());
});

Template.Student_Profile.onRendered(function () {
    // const profileData = Profiles.findDoc(FlowRouter.getParam('username'));
    // console.log("Profile Data: "+profileData.role);
  console.log('roleCheck()');
}
);

Template.Student_Profile.helpers({
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
  profile() {
    return Profiles.findDoc(FlowRouter.getParam('username'));
  },
  questList() {
    return QuestData._collection.find({ requestedExp: 0 });
  },
  completedQuestList() {
    return QuestData._collection.find({ student: FlowRouter.getParam('username'),
      earnedExp: { $gt: 0 } });
  },
});


Template.Student_Profile.events({
  'submit .profile-data-form'(event, instance) {
    event.preventDefault();
    const firstName = event.target.First.value;
    const lastName = event.target.Last.value;
    const avatarName = event.target.AvatarName.value;
    const username = FlowRouter.getParam('username'); // schema requires username.
    const picture = event.target.Picture.value;
    /*
    const gold = event.target.Gold.value;
    const experience = event.target.Experience.value;
    */

    // const updatedProfileData = { firstName, lastName, avatarName, picture, gold, experience, username };
    const updatedProfileData = { firstName, lastName, avatarName, picture, username };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    Profiles.getSchema().clean(updatedProfileData);
    // Determine validity.
    instance.context.validate(updatedProfileData);

    if (instance.context.isValid()) {
      const docID = Profiles.findDoc(FlowRouter.getParam('username'))._id;
      const id = Profiles.update(docID, { $set: updatedProfileData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

