var app = angular.module('visualSearch', []);
var isOverlay = false;

app.directive('overlay', function($document,$window) {
  return {
    restrict: 'E',
    template: '<div id="overlay"></div>',
    replace: true,
    link: function(scope,element) {
      element.data('overlay',true);

      angular.element($document[0].body).on('click',function(e) {
        var inThing =  angular.element(e.target).inheritedData('overlay');
        if (!inThing && overlayUp == true) {
			console.log(overlayUp);
			if (isOverlay == true) {
				console.log("close");
				overlayHide();
			}
			else{
				isOverlay = true;
			}
        }
      })
    }
  }
});