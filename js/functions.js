function viewParticipant(number, object) {
    $(".clickBubbleSelected").map(function() {
        this.classList.remove("clickBubbleSelected")
    })
    object.classList.add("clickBubbleSelected");
    $("#participantContainer").animate({opacity: 0}, 100, function() {
        $("#participantImage0").attr("src", "./images/loading.gif");
        $("#participantImage1").attr("src", "./images/loading.gif");
        $("#participantImage2").attr("src", "./images/loading.gif");
        $.getJSON("./participants/" + number + "/data.json", function(data) {
            $.each( data, function( key, value ) {
                if(key === "name") {
                    $("#participantName").text(value);
                } else if(key === "author") {
                    $("#participantAuthor").text(value);
                } else if(key === "website") {
                    if(value.length === 0) {
                        $("#participantWebsite").css("display", "none");
                    } else {
                        $("#participantWebsite").css("display", "unset");
                        $("#participantWebsite").attr("href", "http://" + value);
                        $("#participantWebsiteText").text(value);
                    }
                } else if(key === "text") {
                    $("#participantText").text(value);
                } else if(key === "image0") {
                    loadImage("./participants/" + number + "/" + value, "#participantImage0", object);
                    $("#participantImage0Link").attr("href", "./participants/" + number + "/" + value);
                } else if(key === "image1") {
                    loadImage("./participants/" + number + "/" + value, "#participantImage1", object);
                    $("#participantImage1Link").attr("href", "./participants/" + number + "/" + value);
                } else if(key === "image2") {
                    loadImage("./participants/" + number + "/" + value, "#participantImage2", object);
                    $("#participantImage2Link").attr("href", "./participants/" + number + "/" + value);
                }
            });
            $("#participantLine").addClass("shown");
            $("#participantContainer").addClass("shown");
            $("#participantContainer").animate({opacity: 1}, 400);
        });
    });

}

function loadImage(src, elementID, object) {
    $('<img />').attr("src", src).on('load', function() {
        if(object.classList.contains("clickBubbleSelected")) {
            $(elementID).attr("src", src);
        }
    });
}

function scrollToHome() {
    scrollToElement("#homeElement");
}

function scrollToEvent() {
    scrollToElement("#eventElement");
}

function scrollToParticipants() {
    scrollToElement("#participantsElement");
}

function scrollToContact() {
    scrollToElement("#contactElement");
}

function scrollToElement(elementID) {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(elementID).offset().top
    }, 50, "linear");
}

$(document).ready(function() {
    $(window).scroll(function() {
        const topHeight = $(this).scrollTop() + $(window).height() * (2 / 3);
        let currentID;
        if($("#eventElement").offset().top >= topHeight || $(this).scrollTop() === 0) {
            currentID = "#homeElement";
        } else if($(this).scrollTop() + $(window).height() + 1 >= $(document).height()) {
            currentID = "#contactElement";
        } else if($("#participantsElement").offset().top >= topHeight) {
            currentID = "#eventElement";
        } else if($("#contactElement").offset().top >= topHeight) {
            currentID = "#participantsElement";
        } else {
            currentID = "#contactElement";
        }
        if(!($(currentID + "Nav").hasClass("active"))) {
            $(".nav-item.active").map(function() {
                this.classList.remove("active")
            })
            $(currentID + "Nav").addClass("active");
        }
    });
});