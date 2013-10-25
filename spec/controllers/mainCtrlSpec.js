describe("MainCtrl", function() {
  var scope;

  beforeEach(function() {
    angular.mock.module('app');
    angular.mock.inject(function($rootScope, $controller){
      scope = $rootScope.$new();
      $controller('MainCtrl', { $scope: scope });
    });
  });

  it("sets a default state", function() {
    expect(scope.speed).toBe(100);
    expect(scope.maximum).toBe(100);
    expect(scope.numberType).toBe("plain");
    expect(scope.numberSpoken).toBeFalsy();
    expect(scope.stars.length).toEqual(0);
  });

  describe("#newNumber", function() {
    beforeEach(function() {
      spyOn(App.util, "randomNumber").andCallFake(function(min, max) {
        if (min === 0 && max === 99) { // currency centimes
          return 3;
        }
        else if (min === 1000 && max === 2100) { // year
          return 4;
        }
        else { // plain number
          return 5;
        }
      });
      spyOn(App.voice, "say");
      scope.speed = 9;
    });

    describe("state", function() {
      beforeEach(function() {
        scope.newNumber();
      });

      it("sets numberSpoken to true", function() {
        expect(scope.numberSpoken).toBeTruthy();
      });
    });

    context("when the numberType is set to currency", function() {
      beforeEach(function() {
        scope.numberType = 'currency';
        scope.newNumber();
      });

      it("speaks the numbers as a monetary value", function() {
        expect(App.voice.say).toHaveBeenCalledWith("5 euro 3", scope.speed);
      });
    });

    context("when the numberType is set to plain", function() {
      beforeEach(function() {
        scope.numberType = 'plain';
        scope.newNumber();
      });

      it("speaks the number", function() {
        expect(App.voice.say).toHaveBeenCalledWith(5, scope.speed);
      });
    });
  });

  describe("#respond", function() {
    beforeEach(function() {
      spyOn(App.voice, "praise");
      spyOn(App.voice, "reprimand");
    });

    context("plain numbers", function() {
      beforeEach(function() {
        scope.numberType = "plain";
        spyOn(App.util, "randomNumber").andReturn(555);
        scope.newNumber();
      });

      context("when the response is correct", function() {
        beforeEach(function() {
          scope.response = "555";
        });

        it("praises", function() {
          scope.respond();
          expect(App.voice.praise).toHaveBeenCalled()
        });

        it("adds a star", function() {
          expect(scope.stars.length).toEqual(0);
          scope.respond();
          expect(scope.stars.length).toEqual(1);
        });

        it("clears the response", function() {
          scope.respond();
          expect(scope.response).toBeNull();
          expect(scope.numberSpoken).toBeFalsy();
        });
      });

      context("when the response is incorrect", function() {
        beforeEach(function() {
          scope.response = "444";
        });

        it("reprimands", function() {
          scope.respond();
          expect(App.voice.reprimand).toHaveBeenCalled()
        });

        it("removes a star", function() {
          scope.stars.push({});
          expect(scope.stars.length).toEqual(1);
          scope.respond();
          expect(scope.stars.length).toEqual(0);
        });
      });
    });

    context("currencies", function() {
      beforeEach(function() {
        scope.numberType = "currency";
        spyOn(App.util, "randomNumber").andReturn(11);
        scope.newNumber();
      });

      context("when the response is correct", function() {
        beforeEach(function() {
          scope.response = "11.11";
        });

        it("praises", function() {
          scope.respond();
          expect(App.voice.praise).toHaveBeenCalled()
        });

        it("adds a star", function() {
          expect(scope.stars.length).toEqual(0);
          scope.respond();
          expect(scope.stars.length).toEqual(1);
        });

        it("clears the response", function() {
          scope.respond();
          expect(scope.response).toBeNull();
          expect(scope.numberSpoken).toBeFalsy();
        });
      });

      context("when the response is incorrect", function() {
        beforeEach(function() {
          scope.response = "1111";
        });

        it("reprimands", function() {
          scope.respond();
          expect(App.voice.reprimand).toHaveBeenCalled()
        });

        it("removes a star", function() {
          scope.stars.push({});
          expect(scope.stars.length).toEqual(1);
          scope.respond();
          expect(scope.stars.length).toEqual(0);
        });
      });
    });
  });

  describe("#showAnswer", function() {
    beforeEach(function() {
      spyOn(App.util, "alert");
      establishCorrectAnswer();
    });

    function establishCorrectAnswer() {
      spyOn(App.util, "randomNumber").andReturn(25);
      scope.newNumber();
    }

    it("alerts the correct answer", function() {
      scope.showAnswer();
      expect(App.util.alert).toHaveBeenCalledWith("25");
    });

    it("clears the response", function() {
      scope.showAnswer();
      expect(scope.response).toBeNull();
      expect(scope.numberSpoken).toBeFalsy();
    });
  });

  describe("#disableMaximum", function() {
    context("when the numberType is year", function() {
      beforeEach(function() {
        scope.numberType = 'year';
      });

      it("returns true", function() {
        expect(scope.disableMaximum()).toBeTruthy();
      });
    });

    context("when the numberType is not year", function() {
      beforeEach(function() {
        scope.numberType = 'plain';
      });

      it("returns false", function() {
        expect(scope.disableMaximum()).toBeFalsy();
      });
    });
  });

  describe("#addStar", function() {
    it("adds a star with a count of the stars", function() {
      expect(scope.stars.length).toEqual(0);
      scope.addStar();
      expect(scope.stars[0]).toEqual({ number: 1 });
      scope.addStar();
      expect(scope.stars[1]).toEqual({ number: 2 });
    });
  });

  describe("#removeStar", function() {
    it("removes a star", function() {
      scope.addStar();
      expect(scope.stars.length).toEqual(1);
      scope.removeStar();
      expect(scope.stars.length).toEqual(0);
    });
  });
});
