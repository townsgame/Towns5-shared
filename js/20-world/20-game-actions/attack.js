


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
            return((Math.pow(this.params.distance,2)*this.params.strength*this.params.rounds*(1/this.params.cooldown))*100*K);
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
            var attacker_defence = attacker.getActionAbility('defense');
            var attacked_attack = attacked.getActionAbility('attack');
            var attacked_defence = attacked.getActionAbility('defense');


            //---------------------Missing actionAbility


            if(attacker_attack instanceof T.Game.ActionAbility){
                attacker_attack=attacker_attack.clone();
            }else{
                throw new Error('Attacker has not ability to attack');
            }



            if(attacker_defence instanceof T.Game.ActionAbility){
                attacker_defence=attacker_defence.clone();
            }else{
                attacker_defence = game.getActionEmptyInstance('defence');
            }


            if(attacked_attack instanceof T.Game.ActionAbility){
                attacked_attack=attacked_attack.clone();
            }else{
                attacked_attack = game.getActionEmptyInstance('attack');

            }


            if(attacked_defence instanceof T.Game.ActionAbility){
                attacked_defence=attacked_defence.clone();
            }else{
                attacked_defence = game.getActionEmptyInstance('defence');
            }



            //---------------------Defense

            attacker_attack.params.attack-=
                attacked_defence.params.defense;
            if(attacker_attack.params.attack<0)attacker_attack.params.attack=0;



            attacked_attack.params.attack-=
                attacker_defence.params.defense;
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





/*{
    'distance': {type:'number',default:0},
    'strength': {type:'number',default:0},
    'rounds': {type:'number',default:1},
    'cooldown': {type:'number',default:1}
}*/