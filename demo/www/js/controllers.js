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
    .controller('BackCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
        $scope.$parent.clearFabs();
        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);
        ionicMaterialInk.displayEffect();
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
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

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


            categories: ['10 jan','11 jan','12 jan','13 jan','14 jan','15 jan'],
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
            text: 'Overall exercise level ',
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
                ['Remain', 1],
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

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
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

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
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


                categories: ['10 jan','11 jan','12 jan','13 jan','14 jan','15 jan'],
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