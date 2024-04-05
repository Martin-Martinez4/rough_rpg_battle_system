
// Maybe Scence classes to move between world view and battle
// May be good to change it to a event driven thing
// loop maintained by some global variables or something
// Could be done in a loop in Java maybe?

export class GameLoop{

    // handle battle
        // has to keep track of turn order
        // adding and subtracting turns
        // checking player hp and mp
    handleBattle(playerTeamArray, enemyTeamArray){

        // player team array should be in order 

        let battleEnded = false;
        let turns = 0;

        // while battle has not ended continue the battle
        while(!battleEnded){
            // allocate turns
            let playerTurns = playerTeamArray.length;
            let enemyTurns = enemyTeamArray.length;
            let actionsTaken = 0;
            
            // current player index starts at 0
                // increment it each time
                // the current player is given by  currentPlayer%playerTeamArray.length 

            // For now the player always acts first
            console.log("\nPlayer Turn");
            while(playerTurns > 0){
                // have to get the turn order

                // Current user chooses actions
                // Some way to get player action
                playerTeamArray[actionsTaken%playerTeamArray.length].showStats();

                // each time an action is taken decrease playerTurns
                playerTurns--;
                actionsTaken++;
            }

            actionsTaken = 0;
            // while loop enemy 
            console.log("\nEnemy Turn");
            while(enemyTurns > 0){


                // get turn order

                // Enemy chooses action
                enemyTeamArray[actionsTaken%enemyTeamArray.length].showStats();


                // each time action is taken decrease enemyTurns
                enemyTurns--;
                actionsTaken++;
            }


            if(turns == 2){
                battleEnded = true;
            }

            turns++;

        }
            //  while current team has turns left continue
            // switch teams

    }

    // handle game over

    // 

}
