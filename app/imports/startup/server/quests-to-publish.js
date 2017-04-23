import { StudentData } from '../../api/quests/questsdata.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('QuestData', function publishQuestData() {
  return QuestData.find();
});
