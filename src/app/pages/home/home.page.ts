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
    try {
      this.currentResultSet = await this.gameScoreService.getAllGameScores();
      console.log(this.currentResultSet);
    } catch (errResObj) {
      console.error('Error on Home Page:', errResObj.errorObj);
      this.currentResultSet = errResObj.resultsArr;
    } finally {
      this.isLoading = false;
    }
  }
}
