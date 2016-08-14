

console.log('Testing T.TMath');


describe('sign', function() {

    it('positive', function () {
        expect(T.TMath.sign(23)).toEqual(1);
    });
    it('negative', function () {
        expect(T.TMath.sign(-81)).toEqual(-1);
    });
    it('zero', function () {
        expect(T.TMath.sign(0)).toEqual(0);
    });
});




describe('baseLog', function() {

    it('log(5,2)', function () {
        expect(T.TMath.baseLog(5,2)).toBeCloseTo(0.43);
    });
    it('log(5,8)', function () {
        expect(T.TMath.baseLog(5,8)).toBeCloseTo(1.29);
    });
    it('log(5,8)', function () {
        expect(T.TMath.baseLog(5,8)).toBeCloseTo(3*Math.log(2)/Math.log(5));
    });
});




describe('prettyNumber', function() {

    it('12345', function () {
        expect(T.TMath.prettyNumber(12345,2)).toBe(12000);
    });
    it('123.45', function () {
        expect(T.TMath.prettyNumber(123.45,2)).toBe(120);
    });
    it('333', function () {
        expect(T.TMath.prettyNumber(333,6)).toBe(333);
    });

});




describe('angleDiff', function() {
    it('23,28', function () {
        expect(T.TMath.angleDiff(23,28)).toBe(5);
    });

    it('355,5', function () {
        expect(T.TMath.angleDiff(355,5)).toBe(10);
    });

    it('90,270', function () {
        expect(T.TMath.angleDiff(90,270)).toBe(180);
    });
});




describe('rad2deg', function() {

    it('0', function () {
        expect(T.TMath.rad2deg(0)).toBe(0);
    });

    it('pi', function () {
        expect(T.TMath.rad2deg(Math.PI)).toBeCloseTo(180);
    });

    it('pi/2', function () {
        expect(T.TMath.rad2deg(Math.PI/2)).toBeCloseTo(90);
    });

    it('4pi', function () {
        expect(T.TMath.rad2deg(Math.PI*4)).toBeCloseTo(0);
    });

});




describe('deg2rad', function() {

    it('0', function () {
        expect(T.TMath.deg2rad(0)).toBe(0);
    });

    it('180', function () {
        expect(T.TMath.deg2rad(180)).toBeCloseTo(Math.PI);
    });

    it('90', function () {
        expect(T.TMath.deg2rad(90)).toBeCloseTo(Math.PI/2);
    });

    it('4*180', function () {
        expect(T.TMath.deg2rad(180*4)).toBeCloseTo(0);
    });
});




//xy2dist(x,y);
describe('xy2dist', function() {

    it('0,0', function () {
        expect(T.TMath.xy2dist(0,0)).toBe(0);
    });

    it('1,1', function () {
        expect(T.TMath.xy2dist(1,1)).toBeCloseTo(1.414);
    });

    it('0,100', function () {
        expect(T.TMath.xy2dist(0,100)).toBe(100);
    });

});

/*
//xy2distDeg(x,y);
describe('xy2distDeg', function() {

    it('xxxx', function () {
        expect(T.TMath.xy2distDeg(xxxxxxxx)).toBe(xxxxx);
    });


});


//distDeg2xy(dist,deg);
describe('distDeg2xy', function() {

    it('xxxx', function () {
        expect(T.TMath.distDeg2xy(xxxxxxxx)).toBe(xxxxx);
    });
});


//xyRotate(x,y,deg);
describe('xyRotate', function() {

    it('xxxx', function () {
        expect(T.TMath.xyRotate(xxxxxxxx)).toBe(xxxxx);
    });
});
*/


//randomSeedPosition(seed,position);
describe('randomSeedPosition', function() {

    it('same seeds', function () {
        expect(T.TMath.randomSeedPosition(1,new T.Position(23,48)))
            .toBe(T.TMath.randomSeedPosition(1,new T.Position(23,48)))

    });


    for(var i=33;i>0;i--) {

        it('>=0', function () {
            expect(T.TMath.randomSeedPosition(Math.random() * 1000, new T.Position(Math.random() * 1000, Math.random() * 1000)))
                .toBeGreaterThan(0)
        });

        it('<=1', function () {
            expect(T.TMath.randomSeedPosition(Math.random() * 1000, new T.Position(Math.random() * 1000, Math.random() * 1000)))
                .toBeLessThan(1)
        });

    }

});


//toFloat(value,defval);
describe('toFloat', function() {

    it('1.48', function () {
        expect(T.TMath.toFloat('1.48')).toBe(1.48);
    });


    it('NaN', function () {
        expect(T.TMath.toFloat('NaN',5)).toBe(5);
    });


    it('asdf', function () {
        expect(T.TMath.toFloat('asdf',5)).toBe(5);
    });

});


//toInt(value,defval);
describe('toInt', function() {

    it('1.48', function () {
        expect(T.TMath.toInt('1.48')).toBe(1);
    });


    it('NaN', function () {
        expect(T.TMath.toInt('NaN',5)).toBe(5);
    });


    it('asdf', function () {
        expect(T.TMath.toInt('asdf',5)).toBe(5);
    });

});


//bounds(value,min,max);
describe('bounds', function() {

    it('in', function () {
        expect(T.TMath.bounds(5,0,10)).toBe(5);
    });
    it('grater', function () {
        expect(T.TMath.bounds(15,0,10)).toBe(10);
    });
    it('lower', function () {
        expect(T.TMath.bounds(-5,0,10)).toBe(0);
    });
});


//isOnLine(x, y, endx, endy, px, py)
describe('isOnLine', function() {

    it('/.', function () {
        expect(T.TMath.isOnLine(0,0,10,10,10,2)).toBe(false);
    });
    it('!', function () {
        expect(T.TMath.isOnLine(0,0,0,10,0,-2)).toBe(false);
    });
    it('i', function () {
        expect(T.TMath.isOnLine(0,0,0,10,0,12)).toBe(false);
    });
    it('`.', function () {
        expect(T.TMath.isOnLine(0,10,2,8,10,0)).toBe(false);
    });
    it('|', function () {
        expect(T.TMath.isOnLine(1,0,1,10,1,1)).toBe(true);
    });
    it('/', function () {
        expect(T.TMath.isOnLine(0,0,10,10,5,5)).toBe(true);
    });

});



//lineCollision(a1x,a1y,a2x,a2y,b1x,b1y,b2x,b2y);
describe('lineCollision', function() {

    it('//', function () {
        expect(T.TMath.lineCollision(0,0,10,10,0,2,10,12)).toBe(false);
    });
    it('/|', function () {
        expect(T.TMath.lineCollision(0,0,10,10,100,0,100,10)).toBe(false);
    });
    it('X', function () {
        expect(T.TMath.lineCollision(0,0,10,10,0,2,2,0)).toBe(true);
    });
    it('L', function () {
        expect(T.TMath.lineCollision(0,0,10,10,10,10,10,0)).toBe(true);
    });
    it('T', function () {
        expect(T.TMath.lineCollision(0,0,10,0,10,10,10,-10)).toBe(true);
    });
    it('/', function () {
        expect(T.TMath.lineCollision(0,0,10,10,1,1,9,9)).toBe(true);
    });
    it('!', function () {
        expect(T.TMath.lineCollision(0,0,0,2,0,4,0,10)).toBe(false);
    });


});

/*
//blurXY(generator,blur) ;
describe('blurXY', function() {

    it('xxxx', function () {
        expect(T.TMath.blurXY(xxxxxxxx)).toBe(xxxxx);
    });
});*/


//bytesToSize(bytes) ;
describe('bytesToSize', function() {

    it('1B', function () {
        expect(T.TMath.bytesToSize(1)).toBe('1B');
    });
    it('1KB', function () {
        expect(T.TMath.bytesToSize(1024)).toBe('1KB');
    });
    it('1MB', function () {
        expect(T.TMath.bytesToSize(1024*1024)).toBe('1MB');
    });
    it('1GB', function () {
        expect(T.TMath.bytesToSize(1024*1024*1024)).toBe('1GB');
    });
    it('1TB', function () {
        expect(T.TMath.bytesToSize(1024*1024*1024*1024)).toBe('1TB');
    });


    it('2B', function () {
        expect(T.TMath.bytesToSize(2)).toBe('2B');
    });
    it('2KB', function () {
        expect(T.TMath.bytesToSize(2*1024)).toBe('2KB');
    });
    it('2MB', function () {
        expect(T.TMath.bytesToSize(2*1024*1024)).toBe('2MB');
    });
    it('2GB', function () {
        expect(T.TMath.bytesToSize(2*1024*1024*1024)).toBe('2GB');
    });
    it('2TB', function () {
        expect(T.TMath.bytesToSize(2*1024*1024*1024*1024)).toBe('2TB');
    });


    it('~2KB', function () {
        expect(T.TMath.bytesToSize(2*1024-23)).toBe('2KB');
    });
    it('~2MB', function () {
        expect(T.TMath.bytesToSize(2*1024*1024-23)).toBe('2MB');
    });
    it('~2GB', function () {
        expect(T.TMath.bytesToSize(2*1024*1024*1024-23)).toBe('2GB');
    });
    it('~2TB', function () {
        expect(T.TMath.bytesToSize(2*1024*1024*1024*1024-23)).toBe('2TB');
    });


});


//proportions(a_start,a_position,a_end,b_start,b_end);describe('xxxx', function() {
describe('proportions', function() {

    it('', function () {
        expect(T.TMath.proportions(0,5,10,5,15)).toBe(10);
    });
    it('', function () {
        expect(T.TMath.proportions(-10,10,10,-70000,15)).toBe(15);
    });
});




/**/