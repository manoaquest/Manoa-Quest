import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { QuestData } from '/imports/api/quests/questsdata';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Teacher_Profile.onCreated(function onCreated() {
  console.log('student profile');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);

  // Subscribe to the profile metadata
  this.subscribe(Profiles.getPublicationName());
  this.context = QuestData.getSchema().namedContext('Teacher_page');

  // Subscribe to the quest metadata
  this.subscribe(QuestData.getPublicationName());
});

Template.Teacher_Profile.onRendered(function () {
    // const profileData = Profiles.findDoc(FlowRouter.getParam('username'));
    // console.log("Profile Data: "+profileData.role);
  console.log('roleCheck()');
}
);

Template.Teacher_Profile.helpers({
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
    return QuestData._collection.find( {'requestedExp': { $gt: 0} ,  'earnedExp': 0 });
  },
});


Template.Teacher_Profile.events({
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

  'click .create-quest': function casLogin(event) {
    event.preventDefault();
    FlowRouter.go('Create_A_Quest_Page');
    return false;
  },

  'click .approve-quest': function appproveQuest(event, instance) {
    event.preventDefault();

    console.log('Approving Quest');

    console.log('ID of the clicked element: '+this.questname);

    const questData = QuestData._collection.findOne(FlowRouter.getParam('_id'));

    // Get name (text field)
    const questname = this.questname;
    console.log("questname: "+questname)
    // Get exp (text area).
    const maxExp = parseInt(this.maxExp, 10);
    console.log("maxExp: "+maxExp)

    const requestedExp = parseInt(this.requestedExp, 10);
    console.log("requestedExp: "+requestedExp)

    const earnedExp = parseInt(this.requestedExp, 10);

    // Get resubmissions (text area).
    const gold = parseInt(this.gold, 10);
    console.log("gold: "+gold)
    // Get due (text area).
    const duedate = this.duedate;
    console.log("duedate: "+duedate)
    // Get message (text area).
    const description = this.description;
    console.log("description: "+description)

    const student = this.name;
    console.log("Student: "+student);

    const updatedQuestData = { questname, maxExp, requestedExp, earnedExp, gold, duedate, description, student };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newQuest reflects what will be inserted.
    QuestData.getSchema().clean(updatedQuestData);
    // Determine validity.
    instance.context.validate(updatedQuestData);
    console.log('have we gotten this far? ----- '+instance.context.validate(updatedQuestData));
    if (instance.context.isValid()) {
      console.log('submitting quest...')
      const id = QuestData._collection.update(this._id, { $set: updatedQuestData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
      instance.$('.dropdown').dropdown('restore defaults');
      FlowRouter.reload()
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }

    return false;
  },
});

