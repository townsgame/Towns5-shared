
module T.World {


    World.game.installActionClass(
        {
            distance: 0,
            strength: 0,
            rounds: 1,
            cooldown: 1
        },
        class extends T.Game.Action {


            getType() {
                return ('attack');
            }


            countPriceBase() {
                return ((Math.pow(this.params.distance, 2) * this.params.strength * this.params.rounds * (1 / this.params.cooldown)) * 100 * 0.05);
            }


            getPriceResources() {

                return ([
                    new T.Resources({'wood': 2}),
                    //new T.Resources({'clay':   0}),
                    new T.Resources({'stone': 3}),
                    new T.Resources({'iron': 2})
                ]);
            }


            static execute(game, attacker, attacked, resources_attacker) {

                var attacker_attack = attacker.getAction('attack');
                var attacker_defence = attacker.getAction('defence');
                var attacked_attack = attacked.getAction('attack');
                var attacked_defence = attacked.getAction('defence');

                var attacker_life = attacker.getAction('life').params;
                var attacked_life = attacked.getAction('life').params;


                //---------------------Missing action


                if (attacker_attack instanceof T.Game.Action) {
                    attacker_attack = attacker_attack.clone().params;
                } else {
                    throw new Error('Attacker has not ability to attack');
                }


                if (attacker_defence instanceof T.Game.Action) {
                    attacker_defence = attacker_defence.clone().params;
                } else {
                    attacker_defence = game.getActionEmptyInstance('defence').params;
                }


                if (attacked_attack instanceof T.Game.Action) {
                    attacked_attack = attacked_attack.clone().params;
                } else {
                    attacked_attack = game.getActionEmptyInstance('attack').params;

                }


                if (attacked_defence instanceof T.Game.Action) {
                    attacked_defence = attacked_defence.clone().params;
                } else {
                    attacked_defence = game.getActionEmptyInstance('defence').params;
                }


                //---------------------Distance
                var distance = attacker.getPosition().getDistance(attacked.getPosition());
                if (distance > attacker_attack.distance) {

                    throw new Error('Objects are too far - ' + distance + ' fields. Attack distance is only ' + attacker_attack.distance + ' fields.');

                }


                //---------------------Cooldown
                if (!attacker.getAction('attack').canBeExecutedNow()) {

                    throw new Error('This action can be executed in ' + attacker.getAction('attack').canBeExecutedIn() + ' seconds.');

                }


                //---------------------Set usage
                attacker.getAction('attack').nowExecuted();


                //---------------------Defence

                //r('attack',attacker_attack.strength,attacked_attack.strength);
                //r('defence',attacker_defence.defence,attacked_defence.defence);

                attacker_attack.strength -=
                    attacked_defence.defence;
                if (attacker_attack.strength < 0)attacker_attack.strength = 0;


                attacked_attack.strength -=
                    attacker_defence.defence;
                if (attacked_attack.strength < 0)attacked_attack.strength = 0;


                //---------------------

                //attacker_life.life=1000;
                //attacked_life.life=1000;


                while (
                (attacker_attack.rounds || attacked_attack.rounds) &&
                (attacker_life.life > 1 && attacked_life.life > 1)
                    ) {

                    r('round', attacker_attack.strength, attacked_attack.strength);
                    r('life', attacked_life.life, attacker_life.life);

                    attacked_life.life -= attacker_attack.strength;
                    attacker_life.life -= attacked_attack.strength;


                    attacker_attack.rounds--;
                    attacked_attack.rounds--;
                }


                //---------------------


                if (attacker_life.life < 1)attacker_life.life = 1;
                if (attacked_life.life < 1)attacked_life.life = 1;


            }


        }
    );

}

