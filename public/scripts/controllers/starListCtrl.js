function StarListCtrl($scope) {
  $scope.stars = [];

  $scope.$on('addStar', function() {
    $scope.stars.push({ });
  });

  $scope.$on('removeStar', function() {
    $scope.stars.pop();
  });
}
numerosApp.controller('StarListCtrl', StarListCtrl);
