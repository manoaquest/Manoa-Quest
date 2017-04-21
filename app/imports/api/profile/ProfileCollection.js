import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
// import { Interests } from '/imports/api/interest/InterestCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

/** @module Profile */

/**
 * Profiles provide data for a user.
 * @extends module:Base~BaseCollection
 */
class ProfileCollection extends BaseCollection {

  /**
   * Creates the Profile collection.
   */
  constructor() {
    super('Profile', new SimpleSchema({
      username: { type: String },
      // Remainder are optional
      firstName: { type: String, optional: true },
      lastName: { type: String, optional: true },
      // Added in for Manoa Quest
      avatarName: { type: String, optional: true },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
      gold: { type: Number, optional: true },
      experience: { type: Number, optional: true },
      // From Bowfolio
      /*
      bio: { type: String, optional: true },
      interests: { type: [String], optional: true },
      title: { type: String, optional: true },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
      github: { type: SimpleSchema.RegEx.Url, optional: true },
      facebook: { type: SimpleSchema.RegEx.Url, optional: true },
      instagram: { type: SimpleSchema.RegEx.Url, optional: true },
      */
    }));
  }

  /**
   * Defines a new Profile.
   * @example
   * Profiles.define({ firstName: 'Philip',
   *                   lastName: 'Johnson',
   *                   avatarName: 'johnson',
   *                   picture: 'http://philipmjohnson.org/headshot.jpg',
   *                   gold: '30',
   *                   experience: '100', });
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * Interests is an array of defined interest names.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more interests are not defined, or if github, facebook, and instagram are not URLs.
   * @returns The newly created docID.
   */
  define({ firstName = '', lastName = '', username, avatarName = '', picture = '', gold = 0, experience = 0 }) {
    // make sure required fields are OK.
    const checkPattern = { firstName: String,
      lastName: String,
      username: String,
      avatarName: String,
      picture: String,
      gold: Number,
      experience: Number };
    check({ firstName, lastName, username, avatarName, picture, gold, experience }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }
    // Code from Bowfolio
    /*
     define({ firstName = '', lastName = '', username, bio = '', interests, picture = '', title = '', github = '',
     facebook = '', instagram = '' }) {
     // make sure required fields are OK.
     const checkPattern = { firstName: String, lastName: String, username: String, bio: String, picture: String,
     title: String };
     check({ firstName, lastName, username, bio, picture, title }, checkPattern);

     if (this.find({ username }).count() > 0) {
     throw new Meteor.Error(`${username} is previously defined in another Profile`);
     }

    // Throw an error if any of the passed Interest names are not defined.
    Interests.assertNames(interests);
    return this._collection.insert({ firstName, lastName, username, bio, interests, picture, title, github,
      facebook, instagram });
    */
    return this._collection.insert({ firstName, lastName, username, avatarName, picture, gold, experience });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const username = doc.username;
    const avatarName = doc.avatarName;
    const picture = doc.picture;
    const gold = doc.gold;
    const experience = doc.experience;
    return { firstName, lastName, username, avatarName, picture, gold, experience };
  }
}
  // Code from Bowfoilo
  /*
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const username = doc.username;
    const bio = doc.bio;
    const interests = doc.interests;
    const picture = doc.picture;
    const title = doc.title;
    const github = doc.github;
    const facebook = doc.facebook;
    const instagram = doc.instagram;
    return { firstName, lastName, username, bio, interests, picture, title, github, facebook, instagram };
  }
  */

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Profiles = new ProfileCollection();
