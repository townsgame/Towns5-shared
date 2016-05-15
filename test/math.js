

console.log('Testing math.static.js');



describe('sign', function() {

    it('positive', function () {
        expect(T.Math.sign(23)).toEqual(1);
    });
    it('negative', function () {
        expect(T.Math.sign(-81)).toEqual(-1);
    });
    it('zero', function () {
        expect(T.Math.sign(0)).toEqual(0);
    });
});




describe('baseLog', function() {

    it('log(5,2)', function () {
        expect(T.Math.baseLog(5,2)).toBeCloseTo(0.43);
    });
    it('log(5,8)', function () {
        expect(T.Math.baseLog(5,8)).toBeCloseTo(1.29);
    });
    it('log(5,8)', function () {
        expect(T.Math.baseLog(5,8)).toBeCloseTo(3*Math.log(2)/Math.log(5));
    });
});




describe('prettyNumber', function() {

    it('12345', function () {
        expect(T.Math.prettyNumber(12345,2)).toBe(12000);
    });
    it('123.45', function () {
        expect(T.Math.prettyNumber(123.45,2)).toBe(120);
    });
    it('333', function () {
        expect(T.Math.prettyNumber(333,6)).toBe(333);
    });

});




describe('angleDiff', function() {
    it('23,28', function () {
        expect(T.Math.angleDiff(23,28)).toBe(5);
    });
});




describe('rad2deg', function() {

    it('0', function () {
        expect(T.Math.rad2deg(0)).toBe(0);
    });

    it('pi', function () {
        expect(T.Math.rad2deg(Math.PI)).toBeCloseTo(180);
    });

    it('pi/2', function () {
        expect(T.Math.rad2deg(Math.PI/2)).toBeCloseTo(90);
    });

    it('4pi', function () {
        expect(T.Math.rad2deg(Math.PI*4)).toBeCloseTo(0);
    });

});




describe('deg2rad', function() {

    it('0', function () {
        expect(T.Math.deg2rad(0)).toBe(0);
    });

    it('180', function () {
        expect(T.Math.deg2rad(180)).toBeCloseTo(Math.PI);
    });

    it('90', function () {
        expect(T.Math.deg2rad(90)).toBeCloseTo(Math.PI/2);
    });

    it('4*180', function () {
        expect(T.Math.deg2rad(180*4)).toBeCloseTo(0);
    });
});



/*
//xy2dist(x,y);
describe('xy2dist', function() {

    it('xxxx', function () {
        expect(T.Math.xy2dist(xxxxxxxx)).toBe(xxxxx);
    });
});


//xy2distDeg(x,y);
describe('xy2distDeg', function() {

    it('xxxx', function () {
        expect(T.Math.xy2distDeg(xxxxxxxx)).toBe(xxxxx);
    });
});


//distDeg2xy(dist,deg);
describe('distDeg2xy', function() {

    it('xxxx', function () {
        expect(T.Math.distDeg2xy(xxxxxxxx)).toBe(xxxxx);
    });
});


//xyRotate(x,y,deg);
describe('xyRotate', function() {

    it('xxxx', function () {
        expect(T.Math.xyRotate(xxxxxxxx)).toBe(xxxxx);
    });
});


//randomSeedPosition(seed,position);
describe('randomSeedPosition', function() {

    it('xxxx', function () {
        expect(T.Math.randomSeedPosition(xxxxxxxx)).toBe(xxxxx);
    });
});


//toFloat(value,defval);
describe('toFloat', function() {

    it('xxxx', function () {
        expect(T.Math.toFloat(xxxxxxxx)).toBe(xxxxx);
    });
});


//toInt(value,defval);
describe('toInt', function() {

    it('xxxx', function () {
        expect(T.Math.toInt(xxxxxxxx)).toBe(xxxxx);
    });
});


//bounds(value,min,max);
describe('bounds', function() {

    it('xxxx', function () {
        expect(T.Math.bounds(xxxxxxxx)).toBe(xxxxx);
    });
});


//lineCollision(a1x,a1y,a2x,a2y,b1x,b1y,b2x,b2y);
describe('lineCollision', function() {

    it('xxxx', function () {
        expect(T.Math.lineCollision(xxxxxxxx)).toBe(xxxxx);
    });
});


//blurXY(generator,blur) ;
describe('blurXY', function() {

    it('xxxx', function () {
        expect(T.Math.blurXY(xxxxxxxx)).toBe(xxxxx);
    });
});


//bytesToSize(bytes) ;
describe('bytesToSize', function() {

    it('xxxx', function () {
        expect(T.Math.bytesToSize(xxxxxxx
        x)).toBe(xxxxx);
    });
});


//proportions(a_start,a_position,a_end,b_start,b_end);describe('xxxx', function() {

    it('proportions', function () {
        expect(T.Math.proportions(xxxxxxxx)).toBe(xxxxx);
    });
});




/**/