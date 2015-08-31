angular.module('searchUsers', [])
.controller('mainController', function($scope, $filter, $http) {
  $http.get("data/users.csv")
  .success(function (response) {
    parseFile(response)
  })

  function parseFile(response) {
    var lineBreaks = response.split(/\r/)
    for (var i = 0, x = lineBreaks.length, rows = []; i < x; i++) {
      rows.push(lineBreaks[i].split(","))
    }
    makeUserRecords(rows)
  }

  function makeUserRecords(rows) {
    var users = []
    for (var rowNum = 1, rowTotal = rows.length, colHeader = rows[0], user = new Object(); rowNum < rowTotal; rowNum++) {
      var user = new Object()
      for (var i = 0, x = colHeader.length; i < x; i++) {
        user[colHeader[i]] = rows[rowNum][i]
      }
      users.push(user)
    }
    ssnStrip(users)
  }

  function ssnStrip(users) {
    for (var i = 0, x = users.length; i < x; i++) {
      users[i].ssn = users[i].ssn.toString().replace(/^[0-9]{1,5}/, "XXX-XX-")
    }
    $scope.users = users
    $scope.tableData = $scope.users
  }

  $scope.submit = function(query){
    $scope.tableData = $filter('filter')($scope.users, query)
  }
  $scope.sortType = 'firstName'
})