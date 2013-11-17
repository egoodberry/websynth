describe('arpeggiator', function() {
  var arpeggiator, oscillator;

  describe("#step", function() {
    context("4 steps", function() {
      beforeEach(function() {
        oscillator = { frequency: { value: 440 } };
        arpeggiator = new App.arpeggiator(oscillator);
        arpeggiator.phases = 4;
      });

      it("increases the oscillator frequency by 100", function() {
        arpeggiator.step();
        expect(oscillator.frequency.value).toEqual(540);

        arpeggiator.step();
        expect(oscillator.frequency.value).toEqual(640);

        arpeggiator.step();
        expect(oscillator.frequency.value).toEqual(540);

        arpeggiator.step();
        expect(oscillator.frequency.value).toEqual(440);

        arpeggiator.step();
        expect(oscillator.frequency.value).toEqual(540);
      });
    });
  });
});
