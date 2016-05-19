


T.World.game.installActionClass(
    {
        distance:   0,
        strength:   0,
        rounds:     1,
        cooldown:   1
    },
    class extends T.Game.Action{


        static getType(){
            return('attack');
        }


        countPriceBase(){
            return((Math.pow(this.params.distance,2)*this.params.strength*this.params.rounds*(1/this.params.cooldown))*100*0.05);
        }


        getPriceResources(){

            return([
                new T.Resources({'wood':   2}),
                //new T.Resources({'clay':   0}),
                new T.Resources({'stone':  3}),
                new T.Resources({'iron':   2})
            ]);
        }


        static execute(game,attacker,attacked,resources_attacker){

            var attacker_attack = attacker.getActionAbility('attack');
            var attacker_defence = attacker.getActionAbility('defence');
            var attacked_attack = attacked.getActionAbility('attack');
            var attacked_defence = attacked.getActionAbility('defence');


            //---------------------Missing actionAbility


            if(attacker_attack instanceof T.Game.Action){
                attacker_attack=attacker_attack.clone();
            }else{
                throw new Error('Attacker has not ability to attack');
            }



            if(attacker_defence instanceof T.Game.Action){
                attacker_defence=attacker_defence.clone();
            }else{
                attacker_defence = game.getActionEmptyInstance('defence');
            }


            if(attacked_attack instanceof T.Game.Action){
                attacked_attack=attacked_attack.clone();
            }else{
                attacked_attack = game.getActionEmptyInstance('attack');

            }


            if(attacked_defence instanceof T.Game.Action){
                attacked_defence=attacked_defence.clone();
            }else{
                attacked_defence = game.getActionEmptyInstance('defence');
            }



            //---------------------Defence

            attacker_attack.params.attack-=
                attacked_defence.params.defence;
            if(attacker_attack.params.attack<0)attacker_attack.params.attack=0;



            attacked_attack.params.attack-=
                attacker_defence.params.defence;
            if(attacked_attack.params.attack<0)attacked_attack.params.attack=0;


            //---------------------

            attacker.life=1000;
            attacked.life=1000;


            while(
                    (attacker_attack.params.rounds || attacked_attack.params.rounds) &&
                    (attacker.life>1 && attacked.life>1)
                ){

                attacker.life-=attacker_attack.params.attack;
                attacked.life-=attacker_attack.params.attack;


                attacker_attack.params.rounds--;
                attacked_attack.params.rounds--;
            }


            //---------------------


            if(attacker.life<1)attacker.life=1;
            if(attacked.life<1)attacked.life=1;


        }




    }
);

