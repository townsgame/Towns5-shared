
module T {
    export class Area {

        public positions;

        constructor(...positions:T.Position[]) {

            this.positions = [];

            for (var i = 0; i < positions.length; i++) {

                this.positions.push(positions[i]);

            }

            if(this.positions.length<3){
                throw new Error('There should be at least 3 points.');
            }

            var c = positions[0].getDistance(positions[1]);
            var a = positions[1].getDistance(positions[2]);
            var b = positions[0].getDistance(positions[2]);

            //r(a,b,c);

            if(a+b>c && b+c>a && a+c>b){}else{
                throw new Error('First three points are in line.');
            }


        }


        isContaining(position: Position) {

            //todo working only for convex areas

            var testside,ia,ib,sidecollision,collision;
            for(testside=0;testside<2;testside++) {


                sidecollision=false;
                for (var i = 0; i < this.positions.length; i++) {

                    ia = i;
                    ib = i + 1;
                    if (ib == this.positions.length)ib = 0;

                    collision = T.Math.lineCollision(
                        this.positions[ia].x,
                        this.positions[ia].y,
                        this.positions[ib].x,
                        this.positions[ib].y,

                        position.x,
                        position.y,
                        position.x,
                        position.y + (testside-0.5)*1000000000//todo better
                    );

                    if(collision==true){
                        sidecollision=true;
                        break;
                    }
                    /*r(
                        this.positions[ia].x,
                        this.positions[ia].y,
                        this.positions[ib].x,
                        this.positions[ib].y,

                        position.x,
                        position.y,
                        position.x,
                        position.y + (testside-0.5)*1000000000//todo better

                        collision
                    );*/

                }


                if (!sidecollision)return false;

            }

            return true;

        }


    }
}




