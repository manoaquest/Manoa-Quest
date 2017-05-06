import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { QuestData } from '/imports/api/quests/questsdata';

/* eslint-disable no-param-reassign */

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';


Template.Create_A_Quest_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);

  this.subscribe(QuestData.getPublicationName());
  this.context = QuestData.getSchema().namedContext('Create_QuestData_Page');
});

Template.Create_A_Quest_Page.helpers({
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


Template.Create_A_Quest_Page.events({
  'submit .quest-data-form'(event, instance) {
    event.preventDefault();
    console.log('Create Quest Button: onClick() event');
    // Get name (text field)
    const questname = event.target.Name.value;
    // Get exp (text area).
    const maxExp = parseInt(event.target.Exp.value, 10);
    // Get resubmissions (text area).
    const gold = parseInt(event.target.Gold.value, 10);
    // Get due (text area).
    const duedate = event.target.Due.value;
    // Get message (text area).
    const description = event.target.Description.value;

    const newQuest = { questname, maxExp, gold, duedate, description };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newQuest reflects what will be inserted.
    QuestData.getSchema().clean(newQuest);
    // Determine validity.
    instance.context.validate(newQuest);
    console.log('have we gotten this far?');
    if (instance.context.isValid()) {
      console.log('Inserting Quest');
      const id = QuestData._collection.insert(newQuest);
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
      instance.find('form').reset();
      instance.$('.dropdown').dropdown('restore defaults');
    } else {
      console.log('Input is invald');
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

