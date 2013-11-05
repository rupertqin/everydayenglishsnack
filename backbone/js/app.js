$(function(){
	var Select = Backbone.Model.extend({
		defaults: {
			tracks: [
				'06 Don Quixote',
				'07 the great Gatsby',
				'15 Araby',
				'22 the scarlet letter',
				'23 sons and lovers'
			]
		}
	});

	var AudioCollection = Backbone.Collection.extend({
		model: Select
	})

	var SelectCollection = Backbone.Collection.extend({
		model: Select
	})

	var AudioView = Backbone.View.extend({
		el: 'audio',

		initialize: function(){
			this.collection = new AudioCollection();
			var select = new Select();
			this.collection.add(select);
			return this.render();
		},

		render: function(){
			var tracks = this.collection.models[0].get("tracks");
			var src = "../tracks/" + tracks[0];
			this.$el.attr("src", src);
		}

	});

	var SelectView = Backbone.View.extend({
		el: 'select',

		events: {
			'change': 'playTrack'
		},

		initialize: function(){
			this.collection = new SelectCollection();
			var select = new Select();
			this.collection.add(select);
			return this.render();
		},

		render: function(){
			var self = this;
			var list = this.collection.models[0].get("tracks");
			var options = _.map(list, function(track){
				return $('<option></option>').html(track);
			});
			this.$el.html(options);
			return this;
		},

		playTrack: function(){
			console.log('dddd');
			var track = this.$el.val();
			var src = "../tracks/" + track;
			$("audio").attr("src", src);

			var url = location.origin + location.pathname,
				$options = this.$el.find("option"),
				trackName;

			_.each($options, function($option, key){
			  if($option.selected) {
			  	trackName = $option.innerText
			  	return false
			  }
			});

			trackName = trackName.split(' ').slice(1).join('-').toLowerCase()
			window.location.href = url + "#" + trackName

		}

	});



	var ArticleView = Backbone.View.extend({
		el: "article",

		initialize: function(){
			return this.render();
		},

		render: function(){
			$.ajax({
				method: 'GET', 
				url: '../article.html',
				success: function(data){
					console.log(data)
					$("article").html(data)
				}
			});
			return this;
		},

		playTrack: function(){
			
		}

	});



	var audioView = new AudioView();

	var itemView = new SelectView();

	var articleView = new ArticleView();

})