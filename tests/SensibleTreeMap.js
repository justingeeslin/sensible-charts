describe('SensibleTreeMap', function() {

		beforeAll(function() {
			// $(document.body).empty()
		});

		it('should construct', function() {
			myFirst = new SensibleTreeMap();
			expect(myFirst instanceof SensibleTreeMap).toBe(true)
    });

		it('should draw a treemap to the default container with the default data', function() {
			$(document.body).append($('<div id="chart"></div>'));
			myFirst = new SensibleTreeMap({
				sel: '#chart'
			});
			expect(d3.select('#chart').select('svg').text()).toBe("A1B1B2C1C2C3")
    });

		it('should draw a treemap to the default container with custom data', function() {
			$(document.body).append($('<div id="chart2"></div>'));
			myFirst = new SensibleTreeMap({
				sel: '#chart2',
				data: {
		      "name": "All Visits to Help (from another page)",
					value: 500,
		      "children": [
						{
							"name": "Monitor",
							"children": [
								{
									"name": "Charlie Brown",
									"value": 10
								},
								{
									"name": "Linus",
									"value": 10
								},
								{
									"name": "Peppermint Patty",
									"value": 80
								}
							]
						},
						{
							"name": "Setup",
							"children": [
								{
									"name": "Snoopy",
									"value": 1
								},
							]
						},
						{
							"name": "Create",
							"children": [
								{
									"name": "D O Double G",
									"value": 2
								},
							]
						}
					]
				}
			});
			expect(d3.select('#chart2').select('svg').text()).toBe("All Visits to Help (from another page)MonitorSetupCreateCharlie BrownLinusPeppermint PattySnoopyD O Double G")
    });

		afterAll(function() {

		});

});
