angular.module('starter')

.controller('starter-controller', function($scope, $http, $location, $ionicPopup, $state) {
    
    $scope.OnChangeRoute = function(path) {
        $location.path(path);
    }
    
    $scope.doRefresh = function() {
        $http.get('https://app.alegra.com/api/v1/contacts/')
            .then(function(response) {
                $scope.contactList = response.data;
            }).finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            }
        );
    }

    $scope.$on("$ionicView.enter", function(scopes, states) {
        // Request will be fired only if the ContactList.html is the active view to load the list of contacts.
        if(states.stateName == "App-ContactList") {
            $scope.pendingRequest = true;

            $http.get('https://app.alegra.com/api/v1/contacts/')
                .then(function(response) {
                    $scope.contactsList = response.data;
                    $scope.pendingRequest = false;
                }
            );  
        } else if(states.stateName == "App-EditContact" ) {
            $scope.pendingRequest = true;
            $scope.updateViewTitle = "Edit Contact";
            let id = states.stateParams.id;
            
            $http.get('https://app.alegra.com/api/v1/contacts/' + id)
                .then(function(response) {
                   $scope.contact = response.data;
                   $scope.pendingRequest = false;
                }
            );
        }else if(states.stateName == "App-DetailContact" ) {
            $scope.pendingRequest = true;
            $scope.updateViewTitle = "Detail Contact";
            let id = states.stateParams.id;
            
            $http.get('https://app.alegra.com/api/v1/contacts/' + id)
                .then(function(response) {
                   $scope.contact = response.data;
                   $scope.pendingRequest = false;
                }
            );
        }
    });

    $scope.OnContactDelete = function(id) {
        $ionicPopup.confirm({
            title: 'Warning!',
            template: '<p><i class="icon ion-alert-circled"></i> Are you sure you want to delete this contact?</p>',
            cancelText: 'No',
            okText: 'Yes'
        }).then(function(response) {
            if (response) {
                $http.delete('https://app.alegra.com/api/v1/contacts/' + id)
                    .then(function(response) {
                        $ionicPopup.alert({
                            title: 'Contact Deleted',
                            template: '<p><i class="icon ion-checkmark-circled"></i> ' + response.data.message + '<p>'
                        });

                        $state.go('App-ContactList', {}, { reload: true });
                    }
                );
            }
        });
    }

    $scope.MakeChanges = function(contact){
    if($scope.updateViewTitle == 'Edit Contact'){
       let id = $scope.contact.id;
        $ionicPopup.confirm({
                title: 'Warning!',
                template: '<p><i class="icon ion-alert-circled"></i> Are you sure you want to save this changes?</p>',
                cancelText: 'No',
                okText: 'Yes'
        }).then(function(response) {
            if (response) {
            $http.put('https://app.alegra.com/api/v1/contacts/' + id, $scope.contact)
                .then(function(response) {
                    $ionicPopup.alert({
                        title: 'Contact Edited!',
                        template: '<p>Changes Made Successfully</p>'
                    })
                    }).then(function(response) {
                        if (response) {
                            $location.path("'/contactlist'");
                        }
                    });
                }
            })
        }else{
            if(document.getElementById("name").value == "" || document.getElementById("id").value == ""){
                return($ionicPopup.alert({
                    title: 'Complete required fields:',
                    template: '<p>Name - Identification</p>'
                }));
            }
            $http.post('https://app.alegra.com/api/v1/contacts', contact)
                .then(function(response) {
                    $ionicPopup.alert({
                        title: 'Contact Created!',
                        template: '<p>Contact Added Successfully</p>'
                    });
                    console.log(response);

                    $location.path("'/contactlist'");
                });
        }
    }  
});