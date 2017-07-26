describe('SensibleTreeMap', function() {

		beforeAll(function() {
			$(document.body).empty()
			$(document.body).append($('<div id="chart"></div>'));
		});

		it('should construct', function() {
			myFirst = new SensibleTreeMap();
			expect(myFirst instanceof SensibleTreeMap).toBe(true)
			// expect($('.chart.visitors').children('svg').length > 0).toBe(true)
    });

		afterAll(function() {

		});

});
