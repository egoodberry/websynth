describe("MainCtrl", function() {
  var scope;

  beforeEach(function() {
    angular.mock.module('app');
    angular.mock.inject(function($rootScope, $controller){
      scope = $rootScope.$new();
      $controller('MainCtrl', {$scope: scope});
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
      spyOn(scope, "sayNumber");
      spyOn(Math, "random").andReturn(50);
      scope.newNumber();
    });

    // context("when the numberType is set to currency", function() {
      // beforeEach(function() {
      // });
    // });

    // context("when the numberType is set to year", function() {
    // });

    context("when the numberType is set to plain", function() {
      beforeEach(function() {
        scope.numberType = 'plain';
      });

      it("picks a random number between 0 and the maximum", function() {
        expect(scope.plainNumber).toEqual(50);
      });

      context("when no maximum is defined", function() {
      });
    });

    it("speaks the number", function() {
      expect(scope.sayNumber).toHaveBeenCalled();
    });
  });
});
