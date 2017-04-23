import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { QuestData, QuestDataSchema } from '../../api/quests/questsdata.js';

/* eslint-disable no-param-reassign */

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';


Template.Edit_Quest_Page.onCreated(function onCreated() {
  this.subscribe('QuestData');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = QuestDataSchema.namedContext('Edit_QuestData_Page');
});

Template.Edit_Quest_Page.helpers({
  questDataField(fieldName) {
    const questData = QuestData.findOne(FlowRouter.getParam('_id'));
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

    const updatedQuestData = { name, exp, resubmissions, due, message};
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newQuest reflects what will be inserted.
    QuestDataSchema.clean(updatedQuestData);
    // Determine validity.
    instance.context.validate(updatedQuestData);
    if (instance.context.isValid()) {
      const id = QuestData.update(FlowRouter.getParam('_id'), { $set: updatedQuestData });
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

