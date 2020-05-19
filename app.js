//MODULE
var myApp=angular.module('weatherApp',['ngRoute','ngResource']) ;

//SET UP ROUTE

myApp.config(function($routeProvider){
   $routeProvider
       
       .when('/', {
       templateUrl:'Pages/homePage.html',
       controller:'homeController'
   })
       .when('/weatherPage', {
       templateUrl:'Pages/weatherPage.html',
       controller:'weatherController'
   }).when('/weatherPage/:days', {
       templateUrl:'Pages/weatherPage.html',
       controller:'weatherController'
   });
    
});

//SERVICE

myApp.service('newService',function(){
    
    this.cityName="Boston";
})


//CONTROLLER

myApp.controller('homeController',['$scope','newService',function($scope,newService){
    
    $scope.cityName=newService.cityName;
    
    $scope.$watch('cityName',function(){
        newService.cityName=$scope.cityName;
    });
    
}]);

myApp.controller('weatherController',['$scope','$resource','newService','$routeParams',function($scope,$resource,newService,$routeParams){
    
    $scope.cityName=newService.cityName;
    
    $scope.days=$routeParams.days||'2';

    $scope.weatherAPI=$resource("http://api.openweathermap.org/data/2.5/forecast?appid=0f3d49df9a126d91e316dfd1f85e12cc");
    
    $scope.weatherResult=$scope.weatherAPI.get({q: $scope.cityName, cnt:$scope.days});
    
    $scope.convertToFahrenheit=function(degreeK){
        return Math.round((1.8*(degreeK-273.15)+32));
    }
    
    
   
    //console.log($scope.weatherResult);
     
}]);

myApp.directive('weatherReport',function(){
    return {
        restrict:'AE',
        templateUrl:'Directive/weatherReport.html',
        replace:true,
        scope:{
            weatherDay:"=",
            convertToStandard:"&",
            dateFormat:"@"
        }
        
    }
});