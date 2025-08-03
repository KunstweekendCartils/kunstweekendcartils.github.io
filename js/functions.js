function viewParticipant(number, object) {
    const id = ["helmieSkrabanja", "sibillaSchulz", "joergRidderbusch", "michielVanLuijn", "willSchropp", "miriamGiesenArthurReuleaux",
        "erikKleinSchiphorst", "saskiaHoeboer", "helgaVanDerPoel", "margaBoogaard", "redmerHoekstra", "martienSchenk", "beateBuendgen",
        "georgesDaemen", "babkeMoelee", "tanjaT", "ingridStockmann", "wilfriedKleiber", "marianneVanDedemLolkeVanDerBeij", "marcellinoErven",
        "ruudZweypfenning", "ronaldVanLaar", "ingridCapozzi", "leonSporck", "mariejoseVanDerMeer", "tedVroemen", "marcoKaeller", "nelRood"][number - 1];
    gtag('event', 'open_participant', {
        'participant_id': number,
        'participant_name': id
    });
    $(".clickBubbleSelected").map(function() {
        this.classList.remove("clickBubbleSelected")
    })
    object.classList.add("clickBubbleSelected");
    $("#participantContainer").animate({opacity: 0}, 100, function() {
        $("#participantImage0").attr("src", "./images/loading.gif");
        $("#participantImage1").attr("src", "./images/loading.gif");
        $("#participantImage2").attr("src", "./images/loading.gif");
        $("#participantTextExpandButton").hide();
        $("#participantTextExpandText").hide();
        $("#participantWebsite2").css("display", "none");
        $.getJSON("./participants/" + id + "/data.json", function(data) {
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
                        $("#participantWebsite").attr("href", "https://" + value);
                        $("#participantWebsiteText").text(value);
                    }
                } else if(key === "website2") {
                    if(value.length === 0) {
                        $("#participantWebsite2").css("display", "none");
                    } else {
                        $("#participantWebsite2").css("display", "unset");
                        $("#participantWebsite2").attr("href", "https://" + value);
                        $("#participantWebsiteText2").text(value);
                    }
                } else if(key === "text") {
                    if(value.length >= 500) {
                        $("#participantText").text(value.substring(0, 400));
                        $("#participantTextExpandText").text(value.substring(400));
                        $("#participantTextExpandButton").show();
                    } else {
                        $("#participantText").text(value);
                    }
                } else if(key === "image0") {
                    loadImage("./participants/" + id + "/" + value, "#participantImage0", object);
                    $("#participantImage0Link").attr("href", "./participants/" + id + "/" + value);
                } else if(key === "image1") {
                    loadImage("./participants/" + id + "/" + value, "#participantImage1", object);
                    $("#participantImage1Link").attr("href", "./participants/" + id + "/" + value);
                } else if(key === "image2") {
                    loadImage("./participants/" + id + "/" + value, "#participantImage2", object);
                    $("#participantImage2Link").attr("href", "./participants/" + id + "/" + value);
                }
            });
            $("#participantLine").addClass("shown");
            $("#participantContainer").addClass("shown");
            $("#participantContainer").animate({opacity: 1}, 400);
        });
    });

}

function expandParticipantText() {
    $("#participantTextExpandButton").hide();
    $("#participantTextExpandText").show();
}

function expandHistoryText() {
    $("#historyExpand").hide();
    $("#historyText").show();
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

function scrollToHistory() {
    scrollToElement("#historyElement");
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
        const topHeight = $(this).scrollTop() + 100 /*+ $(window).height() * (1 / 2)*/;
        let currentID;
        if($("#eventElement").offset().top >= topHeight || $(this).scrollTop() === 0) {
            currentID = "#homeElement";
        } else if($(this).scrollTop() + $(window).height() + 1 >= $(document).height()) {
            currentID = "#contactElement";
        } else if($("#participantsElement").offset().top >= topHeight) {
            currentID = "#eventElement";
        } else if($("#historyElement").offset().top >= topHeight) {
            currentID = "#participantsElement";
        } else if($("#contactElement").offset().top >= topHeight) {
            currentID = "#historyElement";
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