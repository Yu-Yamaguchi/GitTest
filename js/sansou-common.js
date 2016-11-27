$(function(){
	// aタグ無効化対象[href=#]のものを処理
	$(document).on("click", "a[href=#]", function(){
		return false;
	});

	// バルス
	var ballshCmd = "38,38,40,40,37,39,37,39,66,65";
	var keyList = [];

	$(document).on("keydown", function(e){
		keyList.push(e.keyCode);
		if (keyList.toString().indexOf(ballshCmd) >= 0) {
			$(document).off("keydown");
			$("#body").effect("shake", "slow");
			$("body").append("<div id='ballshBg' class='modal-backdrop' style='opacity: 0;'><div style='position: absolute; font-size: 200px; color: #ffffff; top: 40%; left: 50%; margin-left: -300px;'>バルス！</div></div>");

			var colmap = $(".ballsh").map(function(){
				var $this = $(this);
				$this.collapse = function(){
					$this.effect("drop",{ direction: "down" });
				}
				return $this;
			});

			var collapseDur = 500;
			var interval = collapseDur;
			for(var i = colmap.length; i--;){
				var self = colmap[i];
				self.collapse.applyTimeout(interval,self);
				interval+=collapseDur;
			}

			setTimeout(function(){
				$("#ballshBg").animate({
					"opacity": "1"
				}, 3000);
			}, interval);
			interval += 3000;

			setTimeout(function(){
			});

		}
	});
});

/**
 setTimesoutをFunctionのプロトタイプとして拡張する。
 */
Function.prototype.applyTimeout = function (msec, self, args) {
  var fnc = this;
  return setTimeout(
    function () {
      fnc.apply(self, args);
    },
    msec);
};