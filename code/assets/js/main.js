require([
    "modules/SceneController",
    "modules/Spawner"
], function(SceneController, Spawner) {

    //Session Variables-----------------------------------------------------------------------------
    var sceneController = new SceneController.SceneController("viewDiv");
    var spawner = new Spawner.Spawner();

    //Functions  -----------------------------------------------------------------------------------

    //Build the map and generate a palette from a random image
    function initialise(){
        
		sceneController.buildScene();
		
		$("#owl-demo").owlCarousel({
			jsonPath : 'assets/data/testdata.json',
			jsonSuccess : customDataSuccess,
			items : 18,
			itemsMobile : false,
			pagination: false,
			rewindNav: false
		});
	 
		function customDataSuccess(data){
			var content = "";
			for(var i in data["items"]){
				var img = data["items"][i].src;
				var alt = data["items"][i].alt;
				content += "<div><img src=\"" + img + "\" alt=\"" + alt + "\"><em style='opacity: 0;'>" + alt.toLowerCase() + "</em></div>"
			}
			$("#owl-demo").html(content);
		}

		$(document).on('click', '.owl-item', function(){
			var $this = $(this);
			if($this.hasClass('clicked')){
				$this.removeClass('clicked');
			} else{
				$this.addClass('clicked');
			}
		});

		$("#filter").keyup(function () {
			$(".owl-item").hide().filter(":contains(" + $(this).val().toLowerCase() + ")").show();
		});
 
    } 
    

    //Logic ----------------------------------------------------------------------------------------

    initialise();

    console.log(sceneController.getView());
    //spawner.doStuff();


});

