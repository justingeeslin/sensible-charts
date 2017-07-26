describe('SensiblePieChart', function() {

		beforeAll(function() {

		});

		it('should construct', function() {
			$(document.body).append($('<div class="chart visitors" id="pie"></div>'));
			myFirstPieChart = new SensiblePieChart();
			expect(myFirstPieChart instanceof SensiblePieChart).toBe(true)
			expect($('#pie').children('svg').length > 0).toBe(true)
    });

		it('should display custom data', function() {
			$(document.body).append($('<div class="chart visitors" id="pie2"></div>'));
			myFirstPieChart = new SensiblePieChart({
				sel: '#pie2',
			  data: {
		  		content: [
		  			{ label: "Snoopy", value: 5 },
		  			{ label: "Charlie Brown", value: 8 },
		  			{ label: "Peppermint Patty", value: 2 }
		  		]
		  	},
			});
			window.setTimeout(function() {
				expect(d3.select('#pie2').select('svg').text()).toBe("33%53%13%SnoopyCharlie BrownPeppermint Patty")
			}, 50)

    });

		afterAll(function() {

		});

});
