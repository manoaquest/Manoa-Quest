import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { QuestData, QuestDataSchema } from '../../api/quests/questsdata.js';

/* eslint-disable no-param-reassign */

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';


Template.Create_Quest_Data_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = QuestDataSchema.namedContext('Create_QuestData_Page');
});

Template.Create_Quest_Data_Page.helpers({
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
});


Template.Create_Quest_Data_Page.events({
  'submit .quest-data-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    const name = event.target.Name.value;
    // Get exp (text area).
    const exp = event.target.Exp.value;
    // Get resubmissions (text area).
    const resubmissions = event.target.Resubmissions.value;
    // Get due (text area).
    const due = event.target.Due.value;
    // Get message (text area).
    const message = event.target.Message.value;

    const newQuest = { name, exp, resubmissions, due, message};
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newQuest reflects what will be inserted.
    QuestDataSchema.clean(newQuest);
    // Determine validity.
    instance.context.validate(newQuest);
    if (instance.context.isValid()) {
      const id = QuestData.insert(newQuest);
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
      instance.find('form').reset();
      instance.$('.dropdown').dropdown('restore defaults');
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

