/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})
    .controller('BackCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk,$cordovaHealthKit) {
        $scope.$parent.clearFabs();
        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);
        ionicMaterialInk.displayEffect();
        $scope.saveWorkout = function () {
            $cordovaHealthKit.saveWorkout(
                {
                    'activityType': 'HKWorkoutActivityTypeCycling',
                    'quantityType': 'HKQuantityTypeIdentifierStepCount',
                    'startDate': new Date(), // now
                    'endDate': null, // not needed when using duration
                    'duration': 6000, //in seconds
                    'energy': 400, //
                    'energyUnit': 'kcal', // J|cal|kcal
                    'distance': 5, // optional
                    'distanceUnit': 'km'
                }
            ).then(function (v) {
                // alert(JSON.stringify(v));
            }, function (err) {
                console.log(err);
            });
        };
    })
.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    //$timeout(function() {
    //    $scope.isExpanded = true;
    //    $scope.$parent.setExpanded(true);
    //}, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set click
    $scope.imageUrl = '';
    $scope.word = "Skip"

    $scope.onTap = function() {
        //$ionicLoading.show({
        //        template:'<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        //});

        $scope.imageUrl = "img/prototype/heart_rate.png" ;
        $scope.word = "Next" ;

    };

    // Set Motion

    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
    $scope.chartPie = {
        options: {
            chart: {
                type: 'pie',
                // marginTop: '10px'
                height: 200,
            },
            colors: ['#e6e6e6', '#40bb68'],

        },
        series: [{
            data: [
                ['Remain', 100],
                ['Finished', 500]
            ],
            name: 'Steps',
            //data:[50,40],
            dataLabels: {
                rotation: 270,
                enabled: false,
                format: '<b>{point.name}</b>: {point.percentage:.1f} MB'
            }
        }],
        title: {
            text: ''

        },
        tooltip: {
            valueDecimals: 2,
            valueSuffix: ' USD'
        },

        credits: {
            enabled: false
        },

        loading: false
    }

    $scope.chartarea = {
        options: {
            chart: {
                type: 'area',
                inverted: false,
                zoomType: 'xy',

                height: 200,



            },
            plotOptions: {

                series: {
                    cursor: 'pointer',
                    column :{
                        size: '30%',
                    },

                }
            },
            colors: ['#058dc7', '#40bb68']
        },

        xAxis: {


            categories: ['17 Mar','18 Mar','19 Mar','20 Mar','21 Mar','22 Mar'],
            title: {
                text: ''
            },
            labels: {
                rotation: -90,
                style: {
                    fontSize: '12px',
                }
            }

        },
        yAxis: {
            min: 0,
            title: {
                text: 'Exercise Level',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' '
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',

            floating: false,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Overall participation level ',
            style: {
                //color: '#FF00FF',
                fontSize: '12px'
            },
        },

        series: [{
            name: 'Group average',
            data: [50,60,70,50,60,70],
        }, {
            name: 'You',
            data: [40,30,60,50,60,70],
        }, ],
        loading : false

    }



    $scope.chartDonut = {
        options: {
            chart:{               height: 200,
            },
            plotOptions: {

                pie: {

                    dataLabels: {
                        enabled: false,

                        style: {
                            fontWeight: 'bold',
                            color: 'white',
                            textShadow: '0px 1px 2px black',

                        }

                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%']
                }
            },
            colors: ['#e6e6e6', '#40bb68'],

        },



        series: [{
            type: 'pie',
            innerSize: '50%',
            data: [
                ['Remain', 2],
                ['Finished', 4]
            ],
            name: 'Assessment ',
            //data:[50,40],
            dataLabels: {
                rotation: 270,
                enabled: false,
                format: '<b>{point.name}</b>: {point.percentage:.1f} MB'

            }
        }],
        title: {
            text: '',
            align: 'center',
            verticalAlign: 'middle',
            y: -60
        },


        credits: {
            enabled: false
        },

        loading: false
    }

})

    .controller('Assessment1Ctrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$cordovaHealthKit,$http) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set click
        $scope.imageUrl = '';
        $scope.word = "Skip"

        $scope.onTap = function() {
            //$ionicLoading.show({
            //        template:'<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
            //});

            $scope.imageUrl = "img/prototype/heart_rate.png" ;
            $scope.word = "Next" ;

        };

        // Set Motion

        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        $scope.body = {
            height: ''
        };


        $scope.saveHeight = function () {
            $cordovaHealthKit.saveHeight($scope.body.height, 'cm').then(function (v) {
            }, function (err) {
                console.log(err);
            });
        };
        // $scope.readHeartrate = function () {
        //     $cordovaHealthKit.readHeartrate()
        //     $cordovaHealthKit.saveHeight($scope.body.height, 'cm').then(function (v) {
        //     }, function (err) {
        //         console.log(err);
        //     });
        // };

        $scope.getHeight = function () {
            $cordovaHealthKit.readHeight('cm').then(function (v) {
                alert('Your height: ' + v.value + " " + v.unit);
            }, function (err) {
                console.log(err);
            });
        };

        $scope.saveWorkout = function () {
            $cordovaHealthKit.saveWorkout(
                {
                    'activityType': 'HKWorkoutActivityTypeCycling',
                    'quantityType': 'HKQuantityTypeIdentifierDistanceCycling',
                    'startDate': new Date(), // now
                    'endDate': null, // not needed when using duration
                    'duration': 6000, //in seconds
                    'energy': 400, //
                    'energyUnit': 'kcal', // J|cal|kcal
                    'distance': 5, // optional
                    'distanceUnit': 'km'
                }
            ).then(function (v) {
                alert(JSON.stringify(v));
            }, function (err) {
                console.log(err);
            });
        };
        // $scope.submit=function(){
        //   var link="http://test.com";
        //   $http.post(link,{{userID:'I844071'},v})
        // }

        $scope.getWorkouts = function () {
            $cordovaHealthKit.findWorkouts().then(function (v) {
                // alert(JSON.stringify(v));
                //$scope.collection=v;
                $scope.collection = Object.keys(v).map(function(k) { return v[k] });
                // $scope.submit=function(){
                var link="https://sapiotbcdfb1bb3.us1.hana.ondemand.com/sap/path_to_wellness/services/ptw.xsjs";
                $http.post(link,{Action:"uploadActivities",UserID:"I844071",Data:(v)}).then(function (res) {
                    $scope.response=res.data;
                   // console.log(res.data);
                    $scope.chartarea = {
                        options: {
                            chart: {
                                type: 'area',
                                inverted: false,
                                zoomType: 'xy',

                                height: 200,
                            },
                            plotOptions: {

                                series: {
                                    cursor: 'pointer',
                                    column :{
                                        size: '30%',
                                    },

                                }
                            },
                            colors: ['#40bb68','#058dc7' ]
                        },

                        xAxis: {


                            categories: ['17 Mar','18 Mar','19 Mar','20 Mar','21 Mar','22 Mar'],
                            title: {
                                text: ''
                            },
                            labels: {
                                rotation: -90,
                                style: {
                                    fontSize: '12px',
                                }
                            }

                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Heat rate history',
                                align: 'high'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        tooltip: {
                            valueSuffix: ' '
                        },

                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'top',

                            floating: false,
                            borderWidth: 1,
                            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                            shadow: true
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: 'Heat rate history',
                            style: {
                                //color: '#FF00FF',
                                fontSize: '12px'
                            },
                        },

                        series: [ {
                            name: 'Average Heart rate',
                            data: [95,93,85,76,80,74],
                        } ],
                        loading : false

                    }
                })
                // };
            }, function (err) {
                console.log(err);

            });
        };
        $scope.chartarea = {
            options: {
                chart: {
                    type: 'area',
                    inverted: false,
                    zoomType: 'xy',

                    height: 200,
                },
                plotOptions: {

                    series: {
                        cursor: 'pointer',
                        column :{
                            size: '30%',
                        },

                    }
                },
                colors: ['#40bb68','#058dc7' ]
            },

            xAxis: {


                categories: ['17 Mar','18 Mar','19 Mar','20 Mar','21 Mar','22 Mar'],
                title: {
                    text: ''
                },
                labels: {
                    rotation: -90,
                    style: {
                        fontSize: '12px',
                    }
                }

            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Heat rate history',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' '
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',

                floating: false,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Heat rate history',
                style: {
                    //color: '#FF00FF',
                    fontSize: '12px'
                },
            },

            series: [  ],
            loading : false

        }


    })
.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})
    .controller('ModalCtrl', function($scope, $ionicModal) {

        $scope.contacts = [
            { name: 'Gordon Freeman' },
            { name: 'Barney Calhoun' },
            { name: 'Lamarr the Headcrab' },
        ];

        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.createContact = function(u) {
            $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
            $scope.modal.hide();
        };
    })
    .controller('ModalCtrl2', function($scope, $ionicModal) {

        $scope.contacts = [
            { name: 'Gordon Freeman' },
            { name: 'Barney Calhoun' },
            { name: 'Lamarr the Headcrab' },
        ];

        $ionicModal.fromTemplateUrl('templates/modal2.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.createContact = function(u) {
            $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
            $scope.modal.hide();
        };
    })

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

//    click number

    .controller('NumberCtrl', function($scope) {
        $scope.collection1 = ["0","1","2", "3","4","5","6","7+"];
        $scope.collection2 = ["0","1","2", "3","4","5","6","7+"];

        $scope.selectedIndex1 = 3;
        $scope.selectedIndex2 = 3;


        $scope.itemClicked1 = function ($index) {
            console.log($index);
            $scope.selectedIndex1 = $index;

        }

        $scope.itemClicked2 = function ($index) {
            console.log($index);
            $scope.selectedIndex2 = $index;
        }
    })


//dash
    .controller('dashCtrl', function($scope) {


        $scope.chartPie = {
            options: {
                chart: {
                    type: 'pie',
                    // marginTop: '10px'
                },
                colors: ['#058dc7', '#50b432'],

            },
            series: [{
                data: [
                    ['Download', 100],
                    ['Upload', 500]
                ],
                name: 'InternetUsage MB',
                //data:[50,40],
                dataLabels: {
                    rotation: 270,
                    enabled: false,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} MB'
                }
            }],
            title: {
                text: 'Pie Chart'
            },
            tooltip: {
                valueDecimals: 2,
                valueSuffix: ' USD'
            },

            credits: {
                enabled: false
            },

            loading: false
        }

        $scope.chartarea = {
            options: {
                chart: {
                    type: 'area',
                    inverted: false,
                    zoomType: 'xy',

                    height: 250,



                },
                plotOptions: {

                    series: {
                        cursor: 'pointer',
                        column :{
                            size: '30%',
                        },

                    }
                },
                colors: ['#058dc7', '#50b432']
            },

            xAxis: {


                categories: ['17 Mar','18 Mar','19 Mar','20 Mar','21 Mar','22 Mar'],
                title: {
                    text: ''
                },
                labels: {
                    rotation: -90,
                    style: {
                        fontSize: '12px',
                    }
                }

            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Bandthwidth (MB)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' '
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',

                floating: false,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Internet Usage',
                style: {
                    //color: '#FF00FF',
                    fontSize: '12px'
                },
            },

            series: [{
                name: 'Download',
                data: [50,60,70,50,60,70],
            }, {
                name: 'Upload',
                data: [40,30,60,50,60,70],
            }, ],
            loading : false

        }



        $scope.chartDonut = {
            options: {
                plotOptions: {

                    pie: {

                        dataLabels: {
                            enabled: false,

                            style: {
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0px 1px 2px black',

                            }

                        },
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '75%']
                    }
                },
                colors: ['#058dc7', '#50b432'],

            },



            series: [{
                type: 'pie',
                innerSize: '50%',
                data: [
                    ['Download', 100],
                    ['Upload', 500]
                ],
                name: 'InternetUsage MB',
                //data:[50,40],
                dataLabels: {
                    rotation: 270,
                    enabled: false,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} MB'

                }
            }],
            title: {
                text: '',
                align: 'center',
                verticalAlign: 'middle',
                y: -60
            },


            credits: {
                enabled: false
            },

            loading: false
        }




    })






    .controller('PlaylistCtrl', function($scope, $stateParams) {
    });