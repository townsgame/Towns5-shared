
console.log('Testing T.Area');




//======================================================================================================================Errors



describe('Testing T.Area that could not be created because of', function () {


    it('less than 2 params', function () {

        expect(function () {
            new T.Area()
        }).toThrow();
        expect(function () {
            new T.Area(new T.Position(10, 10))
        }).toThrow();
        expect(function () {
            new T.Area(
                new T.Position(10, 10),
                new T.Position(10, 15)
            )
        }).toThrow();


    });


    it('duplicite positions', function () {


        expect(function () {
            new T.Area(
                new T.Position(10, 10),
                new T.Position(10, 15),
                new T.Position(10, 15)
            )
        }).toThrow();


    });


    it('3 positions on same line', function () {


        expect(function () {
            new T.Area(
                new T.Position(10, 10),
                new T.Position(20, 20),
                new T.Position(30, 30)
            )
        }).toThrow();


        expect(function () {
            new T.Area(
                new T.Position(10, 10),
                new T.Position(-20, -20),
                new T.Position(30, 30)
            )
        }).toThrow();

    });


    it('all positions on same line', function () {


        expect(function () {
            new T.Area(
                new T.Position(10, 10),
                new T.Position(1, 1),
                new T.Position(5, 5),
                new T.Position(6, 6),
                new T.Position(1000000, 1000000),
                new T.Position(20, 20),
                new T.Position(-7777, -7777),
                new T.Position(30, 30)
            )
        }).toThrow();


    });

});


//======================================================================================================================



describe('Testing T.Area square', function () {


    beforeAll(function () {

        this.area = new T.Area(
            new T.Position(0, 0),
            new T.Position(10, 0),
            new T.Position(10, 10),
            new T.Position(0, 10)
        );

    });


    it('isContaining', function () {

        expect(this.area.isContaining(new T.Position(0, 0))).toBe(true);
        expect(this.area.isContaining(new T.Position(10, 0))).toBe(true);
        expect(this.area.isContaining(new T.Position(5, 5))).toBe(true);
        expect(this.area.isContaining(new T.Position(6, 6))).toBe(true);
        expect(this.area.isContaining(new T.Position(-5, 5))).toBe(false);
        expect(this.area.isContaining(new T.Position(-1, 0))).toBe(false);

    });

});



describe('Testing T.Area triangle', function () {


    beforeAll(function () {

        this.area = new T.Area(
            new T.Position(0, 0),
            new T.Position(10, 0),
            new T.Position(0, 10)
        );

    });


    it('isContaining', function () {

        expect(this.area.isContaining(new T.Position(0, 0))).toBe(true);
        expect(this.area.isContaining(new T.Position(10, 0))).toBe(true);
        expect(this.area.isContaining(new T.Position(5, 5))).toBe(true);
        expect(this.area.isContaining(new T.Position(6, 6))).toBe(false);
        expect(this.area.isContaining(new T.Position(-5, 5))).toBe(false);
        expect(this.area.isContaining(new T.Position(-1, 0))).toBe(false);

    });

});