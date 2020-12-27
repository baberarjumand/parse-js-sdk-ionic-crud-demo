import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { GameScore } from '../model/game-score.model';

@Injectable({
  providedIn: 'root',
})
export class DbGameScoreService {
  private randomNamesArr = [
    'Future',
    'The Weeknd',
    'Big Sean',
    'J Cole',
    'A$AP Rocky',
    'Kendrick Lamar',
    'Nas',
    'NAV',
    'Freddie Gibbs',
    '21 Savage',
  ];

  constructor() {}

  getAllGameScores(): Promise<GameScore[]> {
    return new Promise(async (resolve, reject) => {
      const GameScore = Parse.Object.extend('GameScore');
      const query = new Parse.Query(GameScore);

      try {
        const results = await query.findAll();
        // console.log('Fetched Result Set:', results);
        resolve(this.mapQueryResultsToLocalResultSet(results));
      } catch (error) {
        // console.error('Error in getAllGameScores():', error);
        reject({
          errorObj: error,
          resultsArr: [],
        });
      }
    });
  }

  mapQueryResultsToLocalResultSet(resultsArr: Parse.Object[]): GameScore[] {
    const tempArr = [];

    resultsArr.forEach((item) => {
      const tempGameScoreObj: GameScore = {
        id: item.id,
        cheatMode: item.attributes.cheatMode,
        playerName: item.attributes.playerName,
        score: item.attributes.score,
      };

      // tempArr.push(item.attributes);
      tempArr.push(tempGameScoreObj);
    });

    return tempArr;
  }

  addNewRandomGameScore(): Promise<void> {
    const newRandomName = this.randomNamesArr[
      Math.floor(Math.random() * this.randomNamesArr.length)
    ];
    const newRandomScore = Math.floor(Math.random() * 9999) + 1;

    return new Promise(async (resolve, reject) => {
      const GameScore = Parse.Object.extend('GameScore');
      const gameScore = new GameScore();

      gameScore.set('score', newRandomScore);
      gameScore.set('playerName', newRandomName);
      gameScore.set('cheatMode', false);

      try {
        const savedObj = await gameScore.save();
        console.log('New GameScore added successfully:', savedObj);
        resolve();
      } catch (error) {
        console.log('Error creating new GameScore:', error);
        reject();
      }
    });
  }

  randomizeExistingGameScore(objectIdToUpdate: string): Promise<void> {
    const newRandomScore = Math.floor(Math.random() * 9999) + 1;

    return new Promise(async (resolve, reject) => {
      const GameScore = Parse.Object.extend('GameScore');
      const query = new Parse.Query(GameScore);

      try {
        const gameScoreObjToUpdate = await query.get(objectIdToUpdate);
        gameScoreObjToUpdate.set('score', newRandomScore);
        await gameScoreObjToUpdate.save();
        resolve();
      } catch (error) {
        console.error('Error updating a game score:', error);
        reject();
      }
    });
  }

  deleteGameScore(objectId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const GameScore = Parse.Object.extend('GameScore');
      const query = new Parse.Query(GameScore);

      try {
        const gameScoreToDelete = await query.get(objectId);
        await gameScoreToDelete.destroy();
        resolve();
      } catch (error) {
        console.error(
          'Error deleting game score with id' + objectId + ':',
          error
        );
        reject();
      }
    });
  }
}
