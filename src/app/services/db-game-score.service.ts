import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { GameScore } from '../model/game-score.model';

@Injectable({
  providedIn: 'root',
})
export class DbGameScoreService {
  constructor() {}

  getAllGameScores(): Promise<GameScore[]> {
    return new Promise(async (resolve, reject) => {
      const GameScore = Parse.Object.extend('GameScore');
      const query = new Parse.Query(GameScore);

      try {
        const results = await query.findAll();
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
      tempArr.push(item.attributes);
    });

    return tempArr;
  }
}
