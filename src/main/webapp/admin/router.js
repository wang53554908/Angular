'use strict';

app
  .run(
      function ($rootScope,   $state,   $stateParams,$localStorage,$http,LoginService) {
		  
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
          $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
	        	LoginService.getSessionInfo().then(function(result){
		  	    	if(result==undefined || result.user==undefined || !result.user){
		  	    		event.preventDefault();// 取消默认跳转行为
		      			window.location.href="toLogin";
		  	    	}
      	        });
	            $rootScope.previousState = from;
	            $rootScope.previousStateParams = fromParams;
          });
	}
  )
.config(
      function ($stateProvider,   $urlRouterProvider) {
          $urlRouterProvider
              .otherwise('/app/dashboard');
          $stateProvider
              .state('auth',{
                  abstract: true,
                  url:'/auth',
                  template: '<div ui-view class="fade-in"></div>',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('admin/auth/ctrl.js');
                      }]
                  }
              })
              .state('auth.loading',{
                  url:'/loading',
                  templateUrl:'admin/auth/loading.html',
              })
              .state('auth.login',{
                  url:'/login',
                  templateUrl:'admin/auth/login.html',
              })
		  
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'admin/app.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('angularBootstrapNavTree').then(
//                              function(){
//                                 return $ocLazyLoad.load('admin/main.js');
//                              }
                          );
                        }
                      ]
                  }
              })
              .state('app.dashboard', {
                  url: '/dashboard',
                  templateUrl: 'admin/dashboard.html',
                  cache:false,
                  ncyBreadcrumb: {
                    label: '<i class="fa fa-home"></i> 首页'
                  }
              })
              .state('app.news', {
                  abstract: true,
                  url: '/news',
                  template: '<div ui-view class="fade-in"></div>',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('admin/news/ctrl.js');
                      }]
                  }
              })
              .state('app.news.list', {
                  url: '/list?page&search',
                  templateUrl: 'admin/news/list.html',
                  ncyBreadcrumb: {
                    parent:'app.dashboard',
                    label: '新闻列表',
                  }
              })
              .state('app.news.detail', {
                  url: '/detail/{id}',
                  templateUrl: 'admin/news/detail.html',
                  ncyBreadcrumb: {
                    parent:'app.news.list',
                    label: '编辑',
                  }
			  })
              .state('app.news.create', {
                  url: '/create',
                  templateUrl: 'admin/news/detail.html',
                  ncyBreadcrumb: {
                    parent:'app.news.list',
                    label: '新增',
                  }
              })
              .state('app.dashboard-v1', {
                  url: '/dashboard-v1',
                  templateUrl: 'tpl/app_dashboard_v1.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/chart.js']);
                    }]
                  }
              })
              .state('app.dashboard-v2', {
                  url: '/dashboard-v2',
                  templateUrl: 'tpl/app_dashboard_v2.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/chart.js']);
                    }]
                  }
              })
              .state('app.ui', {
                  url: '/ui',
                  template: '<div ui-view class="fade-in-up"></div>'
              })
              .state('app.ui.buttons', {
                  url: '/buttons',
                  templateUrl: 'tpl/ui_buttons.html'
              })
              .state('app.ui.icons', {
                  url: '/icons',
                  templateUrl: 'tpl/ui_icons.html'
              })
              .state('app.ui.grid', {
                  url: '/grid',
                  templateUrl: 'tpl/ui_grid.html'
              })
              .state('app.ui.widgets', {
                  url: '/widgets',
                  templateUrl: 'tpl/ui_widgets.html'
              })          
              .state('app.ui.bootstrap', {
                  url: '/bootstrap',
                  templateUrl: 'tpl/ui_bootstrap.html'
              })
              .state('app.ui.sortable', {
                  url: '/sortable',
                  templateUrl: 'tpl/ui_sortable.html'
              })
              .state('app.ui.portlet', {
                  url: '/portlet',
                  templateUrl: 'tpl/ui_portlet.html'
              })
              .state('app.ui.timeline', {
                  url: '/timeline',
                  templateUrl: 'tpl/ui_timeline.html'
              })
              .state('app.ui.tree', {
                  url: '/tree',
                  templateUrl: 'tpl/ui_tree.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('angularBootstrapNavTree').then(
                              function(){
                                 return $ocLazyLoad.load('js/controllers/tree.js');
                              }
                          );
                        }
                      ]
                  }
              })
              .state('app.ui.toaster', {
                  url: '/toaster',
                  templateUrl: 'tpl/ui_toaster.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('toaster').then(
                              function(){
                                 return $ocLazyLoad.load('js/controllers/toaster.js');
                              }
                          );
                      }]
                  }
              })
              .state('app.ui.jvectormap', {
                  url: '/jvectormap',
                  templateUrl: 'tpl/ui_jvectormap.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('js/controllers/vectormap.js');
                      }]
                  }
              })
              .state('app.ui.googlemap', {
                  url: '/googlemap',
                  templateUrl: 'tpl/ui_googlemap.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( [
                            'js/app/map/load-google-maps.js',
                            'js/app/map/ui-map.js',
                            'js/app/map/map.js'] ).then(
                              function(){
                                return loadGoogleMaps(); 
                              }
                            );
                      }]
                  }
              })
              .state('app.chart', {
                  url: '/chart',
                  templateUrl: 'tpl/ui_chart.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad){
                          return uiLoad.load('js/controllers/chart.js');
                      }]
                  }
              })
              // table
              .state('app.table', {
                  url: '/table',
                  template: '<div ui-view></div>'
              })
              .state('app.table.static', {
                  url: '/static',
                  templateUrl: 'tpl/table_static.html'
              })
              .state('app.table.datatable', {
                  url: '/datatable',
                  templateUrl: 'tpl/table_datatable.html'
              })
              .state('app.table.footable', {
                  url: '/footable',
                  templateUrl: 'tpl/table_footable.html'
              })
              .state('app.table.grid', {
                  url: '/grid',
                  templateUrl: 'tpl/table_grid.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('ngGrid').then(
                              function(){
                                  return $ocLazyLoad.load('js/controllers/grid.js');
                              }
                          );
                      }]
                  }
              })
              // form
              .state('app.form', {
                  url: '/form',
                  template: '<div ui-view class="fade-in"></div>',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad){
                          return uiLoad.load('js/controllers/form.js');
                      }]
                  }
              })
              .state('app.form.elements', {
                  url: '/elements',
                  templateUrl: 'tpl/form_elements.html'
              })
              .state('app.form.validation', {
                  url: '/validation',
                  templateUrl: 'tpl/form_validation.html'
              })
              .state('app.form.wizard', {
                  url: '/wizard',
                  templateUrl: 'tpl/form_wizard.html'
              })
              .state('app.form.fileupload', {
                  url: '/fileupload',
                  templateUrl: 'tpl/form_fileupload.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('angularFileUpload').then(
                              function(){
                                 return $ocLazyLoad.load('js/controllers/file-upload.js');
                              }
                          );
                      }]
                  }
              })
              .state('app.form.imagecrop', {
                  url: '/imagecrop',
                  templateUrl: 'tpl/form_imagecrop.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad){
                          return $ocLazyLoad.load('ngImgCrop').then(
                              function(){
                                 return $ocLazyLoad.load('js/controllers/imgcrop.js');
                              }
                          );
                      }]
                  }
              })
              .state('app.form.select', {
                  url: '/select',
                  templateUrl: 'tpl/form_select.html',
                  controller: 'SelectCtrl',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('ui.select').then(
                              function(){
                                  return $ocLazyLoad.load('js/controllers/select.js');
                              }
                          );
                      }]
                  }
              })
              .state('app.form.slider', {
                  url: '/slider',
                  templateUrl: 'tpl/form_slider.html',
                  controller: 'SliderCtrl',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('vr.directives.slider').then(
                              function(){
                                  return $ocLazyLoad.load('js/controllers/slider.js');
                              }
                          );
                      }]
                  }
              })
              .state('app.form.editor', {
                  url: '/editor',
                  templateUrl: 'tpl/form_editor.html',
                  controller: 'EditorCtrl',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('textAngular').then(
                              function(){
                                  return $ocLazyLoad.load('js/controllers/editor.js');
                              }
                          );
                      }]
                  }
              })
              // pages
              .state('app.page', {
                  url: '/page',
                  template: '<div ui-view class="fade-in-down"></div>'
              })
              .state('app.page.profile', {
                  url: '/profile',
                  templateUrl: 'tpl/page_profile.html'
              })
              .state('app.page.post', {
                  url: '/post',
                  templateUrl: 'tpl/page_post.html'
              })
              .state('app.page.search', {
                  url: '/search',
                  templateUrl: 'tpl/page_search.html'
              })
              .state('app.page.invoice', {
                  url: '/invoice',
                  templateUrl: 'tpl/page_invoice.html'
              })
              .state('app.page.price', {
                  url: '/price',
                  templateUrl: 'tpl/page_price.html'
              })
              .state('app.docs', {
                  url: '/docs',
                  templateUrl: 'tpl/docs.html'
              })
              // others
              .state('lockme', {
                  url: '/lockme',
                  templateUrl: 'tpl/page_lockme.html'
              })
              .state('access', {
                  url: '/access',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })
              .state('access.signin', {
                  url: '/signin',
                  templateUrl: 'tpl/page_signin.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/signin.js'] );
                      }]
                  }
              })
              .state('access.signup', {
                  url: '/signup',
                  templateUrl: 'tpl/page_signup.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/signup.js'] );
                      }]
                  }
              })
              .state('access.forgotpwd', {
                  url: '/forgotpwd',
                  templateUrl: 'tpl/page_forgotpwd.html'
              })
              .state('access.404', {
                  url: '/404',
                  templateUrl: 'tpl/page_404.html'
              })

              // fullCalendar
              .state('app.calendar', {
                  url: '/calendar',
                  templateUrl: 'tpl/app_calendar.html',
                  // use resolve to load other dependences
                  resolve: {
                      deps: ['$ocLazyLoad', 'uiLoad',
                        function( $ocLazyLoad, uiLoad ){
                          return uiLoad.load(
                            ['vendor/jquery/fullcalendar/fullcalendar.css',
                              'vendor/jquery/fullcalendar/theme.css',
                              'vendor/jquery/jquery-ui-1.10.3.custom.min.js',
                              'vendor/libs/moment.min.js',
                              'vendor/jquery/fullcalendar/fullcalendar.min.js',
                              'js/app/calendar/calendar.js']
                          ).then(
                            function(){
                              return $ocLazyLoad.load('ui.calendar');
                            }
                          )
                      }]
                  }
              })

              // mail
              .state('app.mail', {
                  abstract: true,
                  url: '/mail',
                  templateUrl: 'tpl/mail.html',
                  // use resolve to load other dependences
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/app/mail/mail.js',
                                               'js/app/mail/mail-service.js',
                                               'vendor/libs/moment.min.js'] );
                      }]
                  }
              })
              .state('app.mail.list', {
                  url: '/inbox/{fold}',
                  templateUrl: 'tpl/mail.list.html'
              })
              .state('app.mail.detail', {
                  url: '/{mailId:[0-9]{1,4}}',
                  templateUrl: 'tpl/mail.detail.html'
              })
              .state('app.mail.compose', {
                  url: '/compose',
                  templateUrl: 'tpl/mail.new.html'
              })

              .state('layout', {
                  abstract: true,
                  url: '/layout',
                  templateUrl: 'tpl/layout.html'
              })
              .state('layout.fullwidth', {
                  url: '/fullwidth',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_fullwidth.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_fullwidth.html'
                      }
                  },
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/vectormap.js'] );
                      }]
                  }
              })
              .state('layout.mobile', {
                  url: '/mobile',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_mobile.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_mobile.html'
                      }
                  }
              })
              .state('layout.app', {
                  url: '/app',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_app.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_fullwidth.html'
                      }
                  },
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/tab.js'] );
                      }]
                  }
              })
              .state('apps', {
                  abstract: true,
                  url: '/apps',
                  templateUrl: 'tpl/layout.html'
              })
              .state('apps.note', {
                  url: '/note',
                  templateUrl: 'tpl/apps_note.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/app/note/note.js',
                                               'vendor/libs/moment.min.js'] );
                      }]
                  }
              })
              .state('apps.contact', {
                  url: '/contact',
                  templateUrl: 'tpl/apps_contact.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/app/contact/contact.js'] );
                      }]
                  }
              })
              .state('app.weather', {
                  url: '/weather',
                  templateUrl: 'tpl/apps_weather.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load(
                              {
                                  name: 'angular-skycons',
                                  files: ['js/app/weather/skycons.js',
                                          'vendor/libs/moment.min.js', 
                                          'js/app/weather/angular-skycons.js',
                                          'js/app/weather/ctrl.js' ] 
                              }
                          );
                      }]
                  }
              })
              .state('music', {
                  url: '/music',
                  templateUrl: 'tpl/music.html',
                  controller: 'MusicCtrl',
                  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load([
                            'com.2fdevs.videogular', 
                            'com.2fdevs.videogular.plugins.controls', 
                            'com.2fdevs.videogular.plugins.overlayplay',
                            'com.2fdevs.videogular.plugins.poster',
                            'com.2fdevs.videogular.plugins.buffering',
                            'js/app/music/ctrl.js', 
                            'js/app/music/theme.css'
                          ]);
                      }]
                  }
              })
                .state('music.home', {
                    url: '/home',
                    templateUrl: 'tpl/music.home.html'
                })
                .state('music.genres', {
                    url: '/genres',
                    templateUrl: 'tpl/music.genres.html'
                })
                .state('music.detail', {
                    url: '/detail',
                    templateUrl: 'tpl/music.detail.html'
                })
                .state('music.mtv', {
                    url: '/mtv',
                    templateUrl: 'tpl/music.mtv.html'
                })
                .state('music.mtvdetail', {
                    url: '/mtvdetail',
                    templateUrl: 'tpl/music.mtv.detail.html'
                })
                .state('music.playlist', {
                    url: '/playlist/{fold}',
                    templateUrl: 'tpl/music.playlist.html'
                })
                .state('app.org', {
                  abstract: true,
                  url: '/org',
                  template: '<div ui-view class="fade-in-up"></div>',
            	  resolve: {
            		  deps: ['$ocLazyLoad',
                             function( $ocLazyLoad ){
                               return $ocLazyLoad.load('admin/org/orgController.js');
                       }]
                  }
              })
              .state('app.org.list', {
                  url: '/list',
                  templateUrl: 'admin/org/list.html',
                  ncyBreadcrumb: {
                    parent:'app.dashboard',
                    label: '组织列表',
                  }
              })
              .state('app.org.edit', {
                  url: '/edit/{id}',
                  templateUrl: 'admin/org/detail.html',
                  params:{
                	  'show':1,
                  },
                  ncyBreadcrumb: {
                    parent:'app.org.list',
                    label: '编辑',
                  }
			  })
			  .state('app.org.detail', {
                  url: '/detail/{id}',
                  templateUrl: 'admin/org/detail.html',
                  params:{
                	  'show':0,
                  },
                  ncyBreadcrumb: {
                    parent:'app.org.list',
                    label: '详情',
                  }
			  })
			  .state('app.org.create', {
                  url: '/create',
                  templateUrl: 'admin/org/detail.html',
                  ncyBreadcrumb: {
                    parent:'app.org.list',
                    label: '新增',
                  }
              })
              .state('app.emp', {
                  abstract: true,
                  url: '/emp',
                  template: '<div ui-view class="fade-in-up"></div>',
            	  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('admin/emp/empController.js');
                      }]
                  }
              })
              .state('app.emp.list', {
                  url: '/list',
                  templateUrl: 'admin/emp/list.html',
                  ncyBreadcrumb: {
                    parent:'app.dashboard',
                    label: '部门列表',
                  }
              })
              .state('app.emp.edit', {
                  url: '/edit/{id}',
                  templateUrl: 'admin/emp/detail.html',
                  params:{
                	  'show':1,
                  },
                  ncyBreadcrumb: {
                    parent:'app.emp.list',
                    label: '编辑',
                  }
			  })
			  .state('app.emp.detail', {
                  url: '/detail/{id}',
                  templateUrl: 'admin/emp/detail.html',
                  params:{
                	  'show':0,
                  },
                  ncyBreadcrumb: {
                    parent:'app.emp.list',
                    label: '详情',
                  }
			  })
			  .state('app.emp.create', {
                  url: '/create',
                  templateUrl: 'admin/emp/detail.html',
                  ncyBreadcrumb: {
                    parent:'app.emp.list',
                    label: '新增',
                  }
              })
              .state('app.empNew', {
                  abstract: true,
                  url: '/empNew',
                  template: '<div ui-view class="fade-in-up"></div>',
            	  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('angularBootstrapNavTree').then(
                              function(){
                                 return $ocLazyLoad.load('admin/emp/empNewController.js');
                              }
                          );
                        }
                      ]
                  }
              })
              .state('app.empNew.tree', {
                  url: '/tree',
                  templateUrl: 'admin/emp/empTree.html',
                  reload:true,
                  ncyBreadcrumb: {
                    parent:'app.dashboard',
                    label: '部门树',
                  }
              })
              .state('app.menu', {
                  abstract: true,
                  url: '/menu',
                  template: '<div ui-view class="fade-in-up"></div>',
            	  resolve: {
                      deps: ['$ocLazyLoad',
                             function( $ocLazyLoad ){
                               return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                   function(){
                                      return $ocLazyLoad.load('admin/menu/menuController.js');
                                   }
                               );
                             }
                           ]
                   }
              })
              .state('app.menu.tree', {
                  url: '/tree',
                  templateUrl: 'admin/menu/menuTree.html',
                  reload:true,
                  ncyBreadcrumb: {
                    parent:'app.dashboard',
                    label: '菜单树',
                  }
              })
              .state('app.res', {
                  abstract: true,
                  url: '/res',
                  template: '<div ui-view class="fade-in-up"></div>',
            	  resolve: {
                      deps: ['$ocLazyLoad',
                             function( $ocLazyLoad ){
                               return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                   function(){
                                      return $ocLazyLoad.load('admin/responsibility/resController.js');
                                   }
                               );
                             }
                           ]
                   }
              })
              .state('app.res.list', {
                  url: '/list',
                  templateUrl: 'admin/responsibility/list.html',
                  ncyBreadcrumb: {
                    parent:'app.dashboard',
                    label: '职责列表',
                  }
              })
              .state('app.res.edit', {
                  url: '/edit/{id}',
                  templateUrl: 'admin/responsibility/detail.html',
                  params:{
                	  'show':1,
                  },
                  ncyBreadcrumb: {
                    parent:'app.res.list',
                    label: '编辑',
                  }
			  })
			  .state('app.res.detail', {
                  url: '/detail/{id}',
                  templateUrl: 'admin/responsibility/detail.html',
                  params:{
                	  'show':0,
                  },
                  ncyBreadcrumb: {
                    parent:'app.res.list',
                    label: '详情',
                  }
			  })
			  .state('app.res.create', {
                  url: '/create',
                  templateUrl: 'admin/responsibility/detail.html',
                  ncyBreadcrumb: {
                    parent:'app.res.list',
                    label: '新增',
                  }
              })
              .state('app.position', {
                  abstract: true,
                  url: '/position',
                  template: '<div ui-view class="fade-in-up"></div>',
            	  resolve: {
                      deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                          return $ocLazyLoad.load('angularBootstrapNavTree').then(
                              function(){
                                 return $ocLazyLoad.load('admin/position/positionController.js');
                              }
                          );
                        }
                      ]
                  }
              })
              .state('app.position.tree', {
                  url: '/tree',
                  templateUrl: 'admin/position/positionTree.html',
                  reload:true,
                  ncyBreadcrumb: {
                    parent:'app.dashboard',
                    label: '职位树',
                  }
              })
              .state('app.user', {
                  abstract: true,
                  url: '/user',
                  template: '<div ui-view class="fade-in-up"></div>',
            	  resolve: {
            		  deps: ['$ocLazyLoad',
                             function( $ocLazyLoad ){
                               return $ocLazyLoad.load('admin/user/userController.js');
                       }]
                  }
              })
              .state('app.user.list', {
                  url: '/list',
                  templateUrl: 'admin/user/list.html',
                  ncyBreadcrumb: {
                    parent:'app.dashboard',
                    label: '用户列表',
                  }
              })
              .state('app.user.edit', {
                  url: '/edit/{id}',
                  templateUrl: 'admin/user/detail.html',
                  params:{
                	  'show':1,
                  },
                  ncyBreadcrumb: {
                    parent:'app.user.list',
                    label: '编辑',
                  }
			  })
			  .state('app.user.detail', {
                  url: '/detail/{id}',
                  templateUrl: 'admin/user/detail.html',
                  params:{
                	  'show':0,
                  },
                  ncyBreadcrumb: {
                    parent:'app.user.list',
                    label: '详情',
                  }
			  })
			  .state('app.user.create', {
                  url: '/create',
                  templateUrl: 'admin/user/detail.html',
                  ncyBreadcrumb: {
                    parent:'app.user.list',
                    label: '新增',
                  }
              })
              .state('app.button', {
                  abstract: true,
                  url: '/button',
                  template: '<div ui-view class="fade-in-up"></div>',
            	  resolve: {
                      deps: ['$ocLazyLoad',
                             function( $ocLazyLoad ){
                               return $ocLazyLoad.load('angularBootstrapNavTree').then(
                                   function(){
                                      return $ocLazyLoad.load('admin/button/buttonController.js');
                                   }
                               );
                             }
                           ]
                   }
              })
              .state('app.button.list', {
                  url: '/list',
                  templateUrl: 'admin/button/list.html',
                  ncyBreadcrumb: {
                    parent:'app.dashboard',
                    label: '按钮列表',
                  }
              })
              .state('app.button.edit', {
                  url: '/edit/{id}',
                  templateUrl: 'admin/button/detail.html',
                  params:{
                	  'show':1,
                  },
                  ncyBreadcrumb: {
                    parent:'app.button.list',
                    label: '编辑',
                  }
			  })
			  .state('app.button.detail', {
                  url: '/detail/{id}',
                  templateUrl: 'admin/button/detail.html',
                  params:{
                	  'show':0,
                  },
                  ncyBreadcrumb: {
                    parent:'app.button.list',
                    label: '详情',
                  }
			  })
			  .state('app.button.create', {
                  url: '/create',
                  templateUrl: 'admin/button/detail.html',
                  ncyBreadcrumb: {
                    parent:'app.button.list',
                    label: '新增',
                  }
              })
		}
  );

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})
app.factory('AuthInterceptor', function ($rootScope, $q,$location) {
  return {
	  request : function(config) {
      	  $rootScope.loading = true;
          return config;
      },
      requestError : function(err) {
          $rootScope.loading = false;
          return $q.reject(err);
      },
      response : function(res) {
          $rootScope.loading = false;
          return res;
      },
      responseError: function (response) {
        if(response.status==401 || response.status == 404 || response.status == 403)
        {
        	window.location.href="toLogin";
        }
        return $q.reject(response);
      }
  };
})