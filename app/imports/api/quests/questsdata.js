import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const QuestData = new Mongo.Collection('QuestData');

/**
 * Create the schema for QuestData
 */
export const QuestDataSchema = new SimpleSchema({
  name: {
    label: 'Name',
    type: String,
  },
  bio: {
    label: 'Bio',
    type: String,
    optional: true,
    defaultValue: '',
  },
  hobbies: {
    label: 'Hobbies',
    type: [String],
  },
  level: {
    label: 'Level',
    type: String,
  },
  gpa: {
    label: 'GPA',
    type: String,
  },
  majors: {
    label: 'Majors',
    type: [String],
  },
});

QuestData.attachSchema(QuestDataSchema);
