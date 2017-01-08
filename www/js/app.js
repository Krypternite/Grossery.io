// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var db;
angular.module('grossery', ['ionic', 'grossery.controllers', 'ng-mfb', 'grossery.services'])

	.run(function ($ionicPlatform, initService) {
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);

			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}


			db = window.openDatabase("my.db", "1.0", "Cordova Demo", 200000);
			initService.createTables(db);


		});
	})

	.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
		$ionicConfigProvider.backButton.previousTitleText(false);
		$ionicConfigProvider.backButton.icon('ion-chevron-left');
		$ionicConfigProvider.backButton.text('')
		$ionicConfigProvider.views.swipeBackEnabled(false);
		$stateProvider

			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: 'templates/menu.html',
				controller: 'AppCtrl'
			})

			.state('app.home', {
				url: '/home',
				cache: false,
				views: {
					'menuContent': {
						templateUrl: 'templates/home.html',
						controller: 'homeController'
					}
				}
			})

			.state('app.newList', {
				url: '/newList',
				views: {
					'menuContent': {
						templateUrl: 'templates/newList.html',
						controller: 'NewListController'
					}
				}
			})

			.state('app.config', {
				url: '/config',
				views: {
					'menuContent': {
						templateUrl: 'templates/config.html',
						controller: 'configController'

					}
				}
			})

			.state('app.browseList', {
				url: '/browseList',
				cache: false,	
				views: {
					'menuContent': {
						templateUrl: 'templates/browse.html',
						controller: 'browseListController'
					}
				}
			})

			.state('app.browseChild', {
				url: '/browseList/:listId',
				views: {
					'menuContent': {
						templateUrl: 'templates/browseChild.html',
						controller: 'browseChildController'
					}
				}
			})

			.state('app.playlists', {
				url: '/playlists',
				views: {
					'menuContent': {
						templateUrl: 'templates/playlists.html',
						controller: 'PlaylistsCtrl'
					}
				}
			})

			.state('app.single', {
				url: '/playlists/:playlistId',
				views: {
					'menuContent': {
						templateUrl: 'templates/playlist.html',
						controller: 'PlaylistCtrl'
					}
				}
			});
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/app/home');
	});
