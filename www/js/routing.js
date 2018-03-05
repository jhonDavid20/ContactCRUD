angular.module('starter')

.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/contactList");

    $stateProvider.state('App-ContactList', {
        url: "/contactList",
        templateUrl: 'templates/ContactList.html',
        controller: 'starter-controller',
        cache: false
    }).state('App-NewContact', {
        url: '/newcontact',
        templateUrl: 'templates/AddOrUpdateContact.html',
        controller: 'starter-controller',
        cache: false
    }).state('App-EditContact',{
        url: '/editcontact/:id',
        templateUrl: 'templates/AddOrUpdateContact.html',
        controller: 'starter-controller',
        cache: false
    }).state('App-DetailContact',{
        url:'/detailcontact/:id',
        templateUrl: 'templates/ContactDetail.html',
        controller: 'starter-controller',
        cache: false
    })
});