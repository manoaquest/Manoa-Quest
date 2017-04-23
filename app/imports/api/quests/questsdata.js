import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const QuestData = new Mongo.Collection('QuestData');

/**
 * Create the schema for QuestData
 */
export const QuestDataSchema = new SimpleSchema({
  name: {
    label: 'Quest Name',
    type: String,
  },
  exp: {
    label: 'Exp',
    type: String,
  },
  resubmissions: {
    label: 'Number of Resubmissions',
    type: String,
  },
  due: {
    label: 'Due Date',
    type: String,
  },
  message: {
    label: 'Message',
    type: String,
  },
});

QuestData.attachSchema(QuestDataSchema);
