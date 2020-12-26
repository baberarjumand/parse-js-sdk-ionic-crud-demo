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

  ngOnInit() {
    this.gameScoreService
      .getAllGameScores()
      .then((results) => {
        this.currentResultSet = results;
        console.log(this.currentResultSet);
      })
      .catch((error) => console.error('Error on Home Page:', error))
      .finally(() => {
        this.isLoading = false;
      });
  }
}
