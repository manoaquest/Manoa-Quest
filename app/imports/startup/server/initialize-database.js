import { Meteor } from 'meteor/meteor';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { QuestData } from '/imports/api/quests/questsdata';
import { _ } from 'meteor/underscore';

/* global Assets */

/* eslint-disable no-console */

/**
 * Returns the definition array associated with collectionName in the restoreJSON structure.
 * @param restoreJSON The restore file contents.
 * @param collection The collection of interest.
 */
function getDefinitions(restoreJSON, collection) {
  return _.find(restoreJSON.collections, obj => obj.name === collection).contents;
}

/**
 * Given a collection and the restoreJSON structure, looks up the definitions and invokes define() on them.
 * @param collection The collection to be restored.
 * @param restoreJSON The structure containing all of the definitions.
 */
function restoreCollection(collection, restoreJSON) {
  // commented out because it threw eslint error
  // console.log('collection._collectionName: '+collection._collectionName);
  const definitions = getDefinitions(restoreJSON, collection._collectionName);
  console.log(`Defining ${definitions.length} ${collection._collectionName} documents.`);
  _.each(definitions, definition => collection.define(definition));
}

Meteor.startup(() => {
  /** Only initialize database if it's empty. */

      // Rebuild the Profile collection from file.
  const collectionList = [Profiles];
  const totalDocuments = _.reduce(collectionList, function reducer(memo, collection) {
    return memo + collection.count();
  }, 0);
  if (totalDocuments === 0) {
    const fileName = Meteor.settings.public.initialDatabaseFileName;
    console.log(`Restoring database from file ${fileName}.`);
    const restoreJSON = JSON.parse(Assets.getText(fileName));
    _.each(collectionList, collection => {
      restoreCollection(collection, restoreJSON);
    });
  }
      // Rebuild the Quest collection from file.
  const questsList = [QuestData];
  const totalQuests = _.reduce(questsList, function reducer(memo, collection) {
    return memo + collection.count();
  }, 0);

  if (totalQuests === 0) {
    const fileName = Meteor.settings.public.initialQuestDatabaseFileName;
    console.log(`Restoring database from file ${fileName}.`);
    const restoreQuestJSON = JSON.parse(Assets.getText(fileName));
    _.each(questsList, collection => {
      restoreCollection(collection, restoreQuestJSON);
    });
  }
});

