'use strict';

angular.module('wakanowVisa', ['ngRoute', 'ngAnimate'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .when('/visa/:countryCode', {
        templateUrl: 'views/country-detail.html',
        controller: 'CountryDetailController',
        controllerAs: 'vm'
      })
      .when('/apply/travellers', {
        templateUrl: 'views/step1-travellers.html',
        controller: 'TravellersController',
        controllerAs: 'vm'
      })
      .when('/apply/details', {
        templateUrl: 'views/step2-details.html',
        controller: 'DetailsController',
        controllerAs: 'vm'
      })
      .when('/apply/documents', {
        templateUrl: 'views/step3-documents.html',
        controller: 'DocumentsController',
        controllerAs: 'vm'
      })
      .when('/apply/review', {
        templateUrl: 'views/step4-review.html',
        controller: 'ReviewController',
        controllerAs: 'vm'
      })
      .when('/confirmation/:bookingRef', {
        templateUrl: 'views/confirmation.html',
        controller: 'ConfirmationController',
        controllerAs: 'vm'
      })
      .otherwise({ redirectTo: '/' });
  }])

  // Step progress bar directive — mirrors the 4-segment MMT bar
  .directive('stepBar', function() {
    return {
      restrict: 'E',
      scope: { step: '=', total: '=', country: '=', dates: '=' },
      template: `
        <div class="step-bar">
          <div class="step-bar__segments">
            <div class="step-bar__seg" ng-repeat="i in [].constructor(total) track by $index"
              ng-class="{
                'step-bar__seg--done':    $index < step,
                'step-bar__seg--active':  $index === step - 1,
                'step-bar__seg--pending': $index >= step
              }"></div>
          </div>
          <div class="step-bar__meta">
            <span class="step-bar__label">STEP {{step}} OF {{total}}</span>
            <span class="step-bar__trip" ng-if="country && dates">
              {{country}} &bull; {{dates}}
            </span>
          </div>
        </div>
      `
    };
  });
