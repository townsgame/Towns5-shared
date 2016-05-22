
console.log('Testing T.PositionDate');




describe('Testing 1 position creating with', function () {


    it('valid', function () {

        expect(function(){new T.PositionDate(1, 2, new Date());}).not.toThrow();
        expect(function(){new T.PositionDate(1, 2, new Date('2016-05-22T11:30:41.426Z'));}).not.toThrow();
        expect(function(){new T.PositionDate(1, 2, new Date('2016-05-22T11:31:17.481Z'));}).not.toThrow();
        expect(function(){new T.PositionDate(1, 2, 1234567);}).not.toThrow();

    });


    it('invalid date', function () {

        expect(function(){new T.PositionDate(1, 2, new Date('xxx'));}).toThrow();
        expect(function(){new T.PositionDate(1, 2, {aaa:'bbb'});}).toThrow();
        expect(function(){new T.PositionDate(1, 2, 'hovnoooooo');}).toThrow();
        expect(function(){new T.PositionDate(1, 2, function(){});}).toThrow();

    });


});






//======================================================================================================================Clonning and JSON



describe('Testing position with date can be', function() {

    beforeAll(function () {

        this.positionDate = new T.PositionDate(1, 2, new Date('2016-05-22T11:30:41.426Z'));

    });



    it('converted and deconverted to and from JSON.', function () {

        this.positionDate_clone = new T.PositionDate(JSON.parse(JSON.stringify(this.positionDate)));


        expect(this.positionDate_clone).not.toBe(this.positionDate);
        expect(this.positionDate_clone).toEqual(this.positionDate);


    });


    it('deep cloned', function () {

        this.positionDate_clone = this.positionDate.clone();


        expect(this.positionDate_clone).not.toBe(this.positionDate);
        expect(this.positionDate_clone).toEqual(this.positionDate);


    });


});

