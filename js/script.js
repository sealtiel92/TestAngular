var testApp = angular.module('testApp', ['ngRoute']);

//routes
testApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })
        .when('/post', {
            templateUrl : 'pages/post.html',
            controller  : 'postController'
        })
        .when('/postDetails/:id', {
            templateUrl : 'pages/postDetails.html',
            controller  : 'postController'
        })
        .when('/photo', {
            templateUrl : 'pages/photo.html',
            controller  : 'photoController'
        })
        .when('/photoDetails/:id', {
            templateUrl : 'pages/photoDetails.html',
            controller  : 'photoController'
        });
});


testApp.controller('mainController', function($scope) {
    //main
    console.log("run");
});

testApp.controller('postController', function($scope,$http,$routeParams) {
        // Get All post
        $scope.getPosts = function()
        {
            $http.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
            .then(
            function(success){
                $scope.posts = success.data;
            },
            function(error){
                console.log(error);
            });
        },
        // :ID GET post
        $scope.getComment = function()
        {
            id = $routeParams.id;
            if(!isNaN(id))
            $http.get('https://jsonplaceholder.typicode.com/comments?postId='+id)
            .then(
            function(success){
                $scope.comments = success.data;
            },
            function(error){
                console.log(error);
            });
        },
        $scope.addPost = function(newPost)
        {
            if(newPost&&newPost.title!==undefined&&newPost.body!==undefined)
            $http.post('https://jsonplaceholder.typicode.com/posts',{
                title:$scope.newPost.title,
                body:$scope.newPost.body,
                userId:1,
            })
            .then(
                function(success){
                    $scope.posts.push(newPost);
                    $scope.newPost = {};
                    console.log("Post saved");
                },
                function(error){
                    console.log(error);
                }
            );
        }
});

testApp.controller('photoController', function($scope,$http,$routeParams) {
        // GET all photos
        $scope.getPhotos = function()
        {
            $http.get('https://jsonplaceholder.typicode.com/photos?_limit=10')
            .then(
            function(success){
                $scope.photos = success.data;
            },
            function(error){
                console.log(error);
            });
        },
        $scope.getPhoto = function()
        {
            // :ID GET Photo 
            id = $routeParams.id;
            if(!isNaN(id))
            $http.get('https://jsonplaceholder.typicode.com/photos?id='+id)
            .then(
            function(success){
                $scope.photo = success.data[0];
                // GET Album
                $http.get('https://jsonplaceholder.typicode.com/albums?id='+$scope.photo.albumId)
                .then(
                function(success){
                    $scope.album = success.data[0];
                },
                function(error){
                    console.log(error);
                });
            },
            function(error){
                console.log(error);
            });
        }
});