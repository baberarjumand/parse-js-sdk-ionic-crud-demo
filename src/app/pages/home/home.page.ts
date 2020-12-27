import { DbGameScoreService } from './../../services/db-game-score.service';
import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';
import { GameScore } from 'src/app/model/game-score.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentResultSet: GameScore[];

  isLoading = true;

  constructor(private gameScoreService: DbGameScoreService) {}

  async ngOnInit() {
    // fetch data using then
    // this.gameScoreService
    //   .getAllGameScores()
    //   .then((results) => {
    //     this.currentResultSet = results;
    //     console.log(this.currentResultSet);
    //   })
    //   .catch((error) => console.error('Error on Home Page:', error))
    //   .finally(() => {
    //     this.isLoading = false;
    //   });

    // fetch data using async await syntax
    // try {
    //   this.currentResultSet = await this.gameScoreService.getAllGameScores();
    //   console.log(this.currentResultSet);
    // } catch (errResObj) {
    //   console.error('Error on Home Page:', errResObj.errorObj);
    //   this.currentResultSet = errResObj.resultsArr;
    // } finally {
    //   this.isLoading = false;
    // }

    await this.updateCurrentResultSet();
  }

  async updateCurrentResultSet(): Promise<void> {
    this.isLoading = true;

    try {
      this.currentResultSet = await this.gameScoreService.getAllGameScores();
      // console.log(this.currentResultSet);
    } catch (errResObj) {
      console.error('Error on Home Page:', errResObj.errorObj);
      this.currentResultSet = errResObj.resultsArr;
    } finally {
      this.isLoading = false;
    }
  }

  async generateNewRandomScore(): Promise<void> {
    // console.log('Generate new score clicked!');
    this.isLoading = true;

    try {
      await this.gameScoreService.addNewRandomGameScore();
      await this.updateCurrentResultSet();
    } catch (error) {
      console.log('Error creating new GameScore:', error);
    }
  }

  async randomizeExistingGameScore(gameScoreId: string): Promise<void> {
    // console.log('randomize clicked with objectId:', gameScoreId);
    try {
      await this.gameScoreService.randomizeExistingGameScore(gameScoreId);
      await this.updateCurrentResultSet();
    } catch (error) {
      console.log('Error updating GameScore:', error);
    }
  }

  async deleteGameScore(gameScoreId: string): Promise<void> {
    try {
      await this.gameScoreService.deleteGameScore(gameScoreId);
      await this.updateCurrentResultSet();
    } catch (error) {
      console.log('Error deleting GameScore:', error);
    }
  }
}
