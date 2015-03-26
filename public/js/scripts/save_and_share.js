timely.require(["jquery_timely","domReady","ai1ec_calendar"],function(e,t,n){var r=function(){var t=function(){var e=localStorage.getItem("ai1ec_saved_events");return e?e.split(","):[]},r=e(".ai1ec-sas-saved-events-count"),i=e(".ai1ec-sas-show-saved"),s=e("#ai1ec-share-events-link"),o=e("#timely-share-modal"),u=e("#a1iec-shorten"),a=e("#ai1ec-share-email"),f=e(".ai1ec-email-form"),l=e("#ai1ec-share-email-send").closest("form"),c=e("#ai1ec-share-email-field"),h=e("#ai1ec-share-email-body"),p=e("#ai1ec-share-facebook"),d=e("#ai1ec-share-twitter"),v=e("#ai1ec-share-google"),m=e(".ai1ec-sas-saved-events"),g=e(".ai1ec-sas-saved-events-exit"),y=e("#ai1ec-share-events-title"),b=e(".ai1ec-sas-saved-events-title"),w=e(".ai1ec-share-multiple"),E=e("#ai1ec-share-open"),S=function(){var e=t().length;!e||b.length?i.addClass("ai1ec-hidden"):(i.removeClass("ai1ec-hidden"),r.text("("+e+")")),i.find("a").attr("href",_(!0))},x=function(t,n){var r=e(this);if(!n&&r.hasClass("ai1ec-active"))return T(),!1;r.addClass("ai1ec-active").find("i.ai1ec-fa-star-o").removeClass("ai1ec-fa-star-o").addClass("ai1ec-fa-star").end().find("a").addClass("ai1ec-active"),g.addClass("ai1ec-hidden"),b.remove()},T=function(){var t=e(".ai1ec-views-dropdown .ai1ec-active a"),n=t.attr("href").replace(/(\/|\|)post_ids~((\d+)(,?))+/g,"").replace(/(\/|\|)time_limit~1/,"");return t.attr("href",n).trigger("click"),N(),!1},N=function(){i.removeClass("ai1ec-active").find("a").removeClass("ai1ec-active").blur().find("i.ai1ec-fa-star").removeClass("ai1ec-fa-star").addClass("ai1ec-fa-star-o")},C,k=function(){C=e(".ai1ec-views-dropdown .ai1ec-active").attr("data-action")},L=function(){e(".ai1ec-calendar-view-container").trigger("initialize_view.ai1ec",!0)},A=function(){var n=e(this),r=n.closest(".ai1ec-event, .ai1ec-single-event"),s=r.length?r.attr("class").match(/ai1ec-event-id-(\d+)/)[1]:n.data("post_id"),o=t();return I(n,!n.hasClass("ai1ec-selected")),n.data("post_id")&&I(e(".ai1ec-sas-action-star").not(n),n.hasClass("ai1ec-selected")),n.hasClass("ai1ec-selected")?-1===e.inArray(s,o)&&o.push(s):o.splice(o.indexOf(s),1),localStorage.setItem("ai1ec_saved_events",o.join(",")),S(),!n.hasClass("ai1ec-selected")&&i.hasClass("ai1ec-active")&&i.find("a").trigger("click",!0),t().length||N(),!1},O=function(){return encodeURIComponent(y.val()||"Custom Calendar").replace(/\'/g,"%27").replace(/\-/g,"%2D").replace(/\_/g,"%5F").replace(/\./g,"%2E").replace(/\!/g,"%21").replace(/\~/g,"%7E").replace(/\*/g,"%2A").replace(/\#/g,"%23").replace(/\(/g,"%28").replace(/\)/g,"%29")},M=function(){var t=e(".ai1ec-views-dropdown .ai1ec-active a").attr("href");return undefined===t?!1:-1===e(".ai1ec-views-dropdown .ai1ec-active a").attr("href").indexOf("ai1ec=")},_=function(e){var r;return b.length&&y.val(b.find("h1").text()),M()?r=n.calendar_url+"action~"+C+(e?"/my_saved_events~1":"/saved_events~"+O())+"/exact_date~1"+"/post_ids~":r=n.calendar_url+(-1===n.calendar_url.indexOf("?")?"?":"&")+"ai1ec=action~"+C+(e?"|my_saved_events~1":"|saved_events~"+O())+"|exact_date~1"+"|post_ids~",r+=t().join(),r},D=_(),P=function(t){var n=d.data("view-text");if(t&&t.length){var r=d.data("single-text"),i=e.trim(t.find(".ai1ec-event-title").contents().get(0).nodeValue)||t.find(".ai1ec-load-event").contents().get(0).nodeValue,o=t.find(".ai1ec-event-location").text().replace(/@/,""),u=(e.trim(t.find(".ai1ec-event-time").contents().get(0).nodeValue)||t.find(".ai1ec-event-time").text()).split("@")[0];n=r.replace(/\[title\]/,i).replace(/\[venue\]/,o).replace(/\[date\]/,u).replace(/\s{2,}/g," ")}d.attr("href",d.data("url")+encodeURIComponent(D)+"&text="+encodeURIComponent(n)),v.attr("href",v.data("url")+encodeURIComponent(D)),p.attr("href",p.data("url")+"&p[url]="+encodeURIComponent(D)),a.data("url",D),s.val(D),E.attr("href",D)},H=function(){D=e(".ai1ec-views-dropdown .ai1ec-active a").attr("href")+"saved_events~"+O(),D=D.replace(/action~(\w+)/,"").replace(/\/\//g,"/").replace(/:\//g,"://"),P(),u.removeAttr("checked")},B=function(){if(!u.is(":checked")){w.is(":visible")?H():(D=s.data("original-url"),P());return}s.data("original-url",D),e.ajax({url:"https://www.googleapis.com/urlshortener/v1/url?shortUrl=http://goo.gl/fbsS",type:"POST",contentType:"application/json; charset=utf-8",data:'{longUrl: "'+D+'"}',dataType:"json",success:function(e){D=e.id},complete:function(){P()}})},j=function(){var t=400,n=500;return window.open(e(this).attr("href"),"Sharing Events","width="+n+",height="+t+",toolbar=0,status=0,left="+(screen.width/2-n/2)+",top="+(screen.height/2-t/2)),f.addClass("ai1ec-hidden"),!1},F=function(){if(b.length){var t=b.find("h1").text();t.length>12&&(t=e.trim(t.substring(0,12))+"&hellip;"),g.removeClass("ai1ec-hidden").find("a").attr("href",n.calendar_url).end().find("span > i").html(t),i.addClass("ai1ec-hidden")}else i.removeClass("ai1ec-hidden")},I=function(e,t){t?e.addClass("ai1ec-selected").find("i.ai1ec-fa").removeClass("ai1ec-fa-star-o").addClass("ai1ec-fa-star"):e.removeClass("ai1ec-selected").find("i.ai1ec-fa").addClass("ai1ec-fa-star-o").removeClass("ai1ec-fa-star")},q=function(){return localStorage.removeItem("ai1ec_saved_events"),T(),!1},R=function(){var n=(new Date).getTime(),r=t(),s=r.length;return e(".ai1ec-event:visible").each(function(){var t=e(this),i=t.attr("class").match(/ai1ec-event-id-(\d+)/)[1];(new Date(t.data("end"))).getTime()<n&&(r.splice(r.indexOf(i),1),t.remove())}),e(".ai1ec-date-events").each(function(){var t=e(this);t.children().length||t.closest(".ai1ec-date").remove()}),s!==r.length?(localStorage.setItem("ai1ec_saved_events",r.join(",")),S(),r.length?e("a.ai1ec-load-view",i).trigger("click",!0):T()):e(this).fadeOut(),!1},U=function(){k();var n=t(),r=e(".single-ai1ec_event .ai1ec-sas-action-star"),s=e(".ai1ec-sas-clear-saved-buttons");e(".ai1ec-sas-action-star").removeClass("ai1ec-selected");if(r.length)-1<e.inArray(r.closest(".ai1ec-single-event").attr("class").match(/ai1ec-event-id-(\d+)/)[1],n)&&I(r,!0);else for(var o=0;o<n.length;o++){var u=e(".ai1ec-event-id-"+n[o]).find(".ai1ec-sas-action-star");I(u,!0)}S();for(var o=0;o<2;o++)m.animate({opacity:.5},200).animate({opacity:1},300);i.hasClass("ai1ec-active")&&!s.closest(".ai1ec-calendar-view").length&&s.clone(!0).insertAfter(e("#ai1ec-calendar-view > div, #ai1ec-calendar-view > table").filter(function(){return this.className.match(/ai1ec-(\w+)-view/)}).first()).removeClass("ai1ec-hidden")};e(document).on("click",".ai1ec-sas-action-star",A),e(document).on("click",".ai1ec-sas-saved-events",function(){w.show(),H()}),e(document).on("initialize_view.ai1ec",".ai1ec-calendar-view-container",U),e(document).on("click",".ai1ec-sas-action-share",function(){u.removeAttr("checked");var t=e(this).closest(".ai1ec-popover, .ai1ec-event");return D=t.find(".ai1ec-load-event:first").attr("href")||location.href,P(t),w.hide(),!1}),e(document).on("click",".ai1ec-sas-clear-saved",q),e(document).on("click",".ai1ec-sas-clear-expired",R),y.on("keyup change",H),u.on("click",B),p.on("click",j),v.on("click",j),d.on("click",j),a.on("click",function(){return f.removeClass("ai1ec-hidden"),!1}),c.on("keyup change",function(){l.attr("action","mailto:"+e(this).val()),h.val(h.data("body")+" "+a.data("url"))}),i.on("click",x),F(),k(),S(),U()};t(r)}),timely.define("scripts/save_and_share",function(){});