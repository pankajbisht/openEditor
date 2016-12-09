$(function () {
 	"use strict";
    
	var gbl = null;
	window.c = _("#canvas");
	
	var editor = CodeMirror.fromTextArea(document.getElementById("codeArea"), {
		lineNumbers: true,
		matchBrackets: true,
		continueComments: "Enter",
		extraKeys: {"Ctrl-Q": "toggleComment"}
	});


    function getScript () {
        $(".script").show();
        var script = editor.getValue();
        console.group("script");
        console.log(script);
        console.groupEnd("script");
        $(".script").hide();
        return script;
    }
        
    
	function focusOut (e) {
		e.stopPropagation();
      	var script = getScript();
        c.clear(0, 0 , 600, 500);
       
		localStorage.setItem("script", script);
        
        $("head").append("<script>" + script + "</script>");
	}
	
    
    function reset () {
        window.location.reload();
    }


	function code () {
		$("canvas").addClass("w3-hide");
        $("textarea, .CodeMirror").removeClass("w3-hide");
        $(".CodeMirror").css("width", "100%");
	}


	function preview () {
	    $("textarea, .CodeMirror").addClass("w3-hide");
        $("canvas").removeClass("w3-hide");
    }    


	function tooBox () {
		var self = $(this);
		var text = self.text();
	
        if (text == "Reset") 
            reset();
		else if (text == "Code")
			code();
		else if (text == "Preview")
			preview();
	}

	
	function logClear () {
		$(".logs").html("");
	}


	function init () {
		if(localStorage.getItem("script")) {
		    gbl = localStorage.getItem("script");
		    $(".script").val(gbl);
			editor.getDoc().setValue(gbl);
		    $(".innerbox").trigger("blur");
		}
	}


	$(document).ready(function () {

		init();

		editor.setSize(600, 500);

		$("#log-clear").on("click", logClear);
		$("div").on("focusout", focusOut);
		$("#tool").on("click", 'button', tooBox); 
	});
});
