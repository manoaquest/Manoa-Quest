import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

class QuestCollection extends BaseCollection {

  constructor() {
    super('QuestData', new SimpleSchema({
      questname: { type: String },
      maxExp: { type: Number },
      requestedExp: { type: Number, optional: true },
      earnedExp: { type: Number, optional: true },
      gold: { type: Number },
      duedate: { type: String },
      description: { type: String },
      student: {type: String, optional: true },
    }));
  }

  define({ questname = '', maxExp = 0, requestedExp = 0, earnedExp = 0, gold = 0, duedate = '', description = '', student = ''}) {
    // make sure required fields are OK.
    const checkPattern = {
      questname: String,
      maxExp: Number,
      requestedExp: Number,
      earnedExp: Number,
      gold: Number,
      duedate: String,
      description: String,
      student: String};
    check({ questname, maxExp, requestedExp, earnedExp, gold, duedate, description, student}, checkPattern);

    return this._collection.insert({ questname, maxExp, requestedExp, earnedExp, gold, duedate, description, student });
  }

  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const questname = doc.questname;
    const maxExp = doc.maxExp;
    const requestedExp = doc.requestedExp;
    const earnedExp = doc.earnedExp;
    const gold = doc.gold;
    const duedate = doc.duedate;
    const description = doc.description;
    const student = doc.student;
    return { questname, maxExp, requestedExp, earnedExp, gold, duedate, description, student};
  }
}

export const QuestData = new QuestCollection();