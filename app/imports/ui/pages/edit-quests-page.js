import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
// eslint error: _ is never used
// import { _ } from 'meteor/underscore';
// import { QuestData, QuestDataSchema } from '../../api/quests/questsdata.js';
// eslint error: QuestDataSchema isn't used
import { QuestData } from '../../api/quests/questsdata.js';
// eslint error: FlowRouter wasn't imported
import { FlowRouter } from 'meteor/kadira:flow-router';

/* eslint-disable no-param-reassign */

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';


Template.Edit_Quest_Page.onCreated(function onCreated() {
  console.log('Edit Quest Page Created');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);

  this.subscribe(QuestData.getPublicationName());
  this.context = QuestData.getSchema().namedContext('Create_QuestData_Page');
});

Template.Edit_Quest_Page.helpers({
  questDataField(fieldName) {
    const questData = QuestData._collection.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return questData && questData[fieldName];
  },
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
});

Template.Edit_Quest_Page.events({
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

    const updatedQuestData = { questname, maxExp, gold, duedate, description };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newQuest reflects what will be inserted.
    QuestData.getSchema().clean(updatedQuestData);
    // Determine validity.
    instance.context.validate(updatedQuestData);
    console.log('have we gotten this far?');
    if (instance.context.isValid()) {
      const id = QuestData._collection.update(FlowRouter.getParam('_id'), { $set: updatedQuestData });
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

