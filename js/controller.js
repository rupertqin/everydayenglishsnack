function Player($scope, $element, $http, $sce){
	$scope.tracks = [
		'06 Don Quixote',
		'07 the great Gatsby',
		'15 Araby',
		'22 the scarlet letter',
		'23 sons and lovers'
	];

	$http({method: 'GET', url: 'article.html'}).
  success(function(data) {
    $scope.article = data
  }).
  error(function(data, status, headers, config) {
    console.log('eerror')
  });

  $scope.track = $scope.tracks[0]

	$scope.select = function(){

		var url = location.origin + location.pathname,
				$options = $element.find("option"),
				trackName;

		angular.forEach($options, function($option, key){
		  if($option.selected) {
		  	trackName = $option.innerText
		  	return false
		  }
		});

		trackName = trackName.split(' ').slice(1).join('-').toLowerCase()
		window.location.href = url + "#" + trackName
		
	};

	$scope.trustHtml = function() {
    return $sce.trustAsHtml($scope.article);
  };

  $scope.trustAudioHtml = function() {
    return $sce.trustAsHtml('<audio  src="tracks/' + $scope.track + '.mp3" controls preload="auto" autoplay></audio>');
  };

}