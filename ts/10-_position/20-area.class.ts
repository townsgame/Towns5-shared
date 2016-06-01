
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

            var c = T.Math.xy2dist(positions[0].getDistance(positions[1]));
            var a = T.Math.xy2dist(positions[1].getDistance(positions[2]));
            var b = T.Math.xy2dist(positions[0].getDistance(positions[2]));

            r(a,b,c);

            if(a+b>c && b+c>a && a+c>b){}else{
                throw new Error('First three points are in line.');
            }


        }


        isContaining(position: Position) {

            var vs = [];
            for (var i = 0; i < this.positions.length; i++) {

                vs.push([
                        this.positions[i].x,
                        this.positions[i].y
                    ]);

            }

            var x = position.x,
                y = position.y;


            var inside = false;
            for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
                var xi = vs[i][0], yi = vs[i][1];
                var xj = vs[j][0], yj = vs[j][1];

                var intersect = ((yi > y) != (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }

            return inside;


        }


    }
}




