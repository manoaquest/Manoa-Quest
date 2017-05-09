import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
// eslint error: _ is never used
// import { _ } from 'meteor/underscore';
// import { QuestData, QuestDataSchema } from '../../api/quests/questsdata.js';
// eslint error: QuestDataSchema isn't used
import { QuestData } from '../../api/quests/questsdata.js';
// eslint error: FlowRouter wasn't imported
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';


Template.Submit_Quest_Page.onCreated(function onCreated() {
  console.log('Submit Quest Page Created');
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);

  this.subscribe(QuestData.getPublicationName());
  this.context = QuestData.getSchema().namedContext('Submit_Quest_Page');
});

Template.Submit_Quest_Page.helpers({
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


Template.Submit_Quest_Page.events({
  'submit .submit-quest-form'(event, instance) {
    event.preventDefault();
    console.log('Create Quest Button: onClick() event');

    const questData = QuestData._collection.findOne(FlowRouter.getParam('_id'));

    // Get name (text field)
    const questname = questData.questname;
    // console.log("questname: "+questname)
    // Get exp (text area).
    const maxExp = parseInt(questData.maxExp, 10);
    // console.log("maxExp: "+maxExp)

    const requestedExp = parseInt(event.target.RequestedEXP.value, 10);
    // console.log("requestedExp: "+requestedExp)

    // Get resubmissions (text area).
    const gold = parseInt(questData.gold, 10);
    // console.log("gold: "+gold)
    // Get due (text area).
    const duedate = questData.duedate;
    // console.log("duedate: "+duedate)
    // Get message (text area).
    const description = questData.description;
    // console.log("description: "+description)

    const student = Meteor.user().profile.name;
    // console.log("Student: "+student);

    const newQuest = { questname, maxExp, requestedExp, gold, duedate, description, student };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newQuest reflects what will be inserted.
    QuestData.getSchema().clean(newQuest);
    // Determine validity.
    instance.context.validate(newQuest);
    // console.log('have we gotten this far? ----- '+instance.context.validate(newQuest));
    if (instance.context.isValid()) {
      // console.log('submitting quest...')
      const id = QuestData._collection.insert(newQuest);
      // const id = QuestData._collection.update(FlowRouter.getParam('_id'), { $set: updatedQuestData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
      instance.find('form').reset();
      instance.$('.dropdown').dropdown('restore defaults');
      const route = '/' + student + '/profile'; // eslint-disable-line prefer-template
      // FlowRouter.go('/' + student + '/profile');
      FlowRouter.go(route);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
