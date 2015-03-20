timely.require(["jquery_timely","domReady","ai1ec_calendar"],function(e,t,n){var r=function(){var t=function(){var e=localStorage.getItem("ai1ec_saved_events");return e?e.split(","):[]},r=e(".ai1ec-saved-events-count"),i=e(".ai1ec-show-saved"),s=e(".ai1ec-close-saved-events"),o=e("#ai1ec-share-events-link"),u=e("#timely-share-modal"),a=e("#a1iec-shorten"),f=e("#ai1ec-share-email"),l=e(".ai1ec-email-form"),c=e("#ai1ec-share-email-send").closest("form"),h=e("#ai1ec-share-email-field"),p=e("#ai1ec-share-email-body"),d=e("#ai1ec-share-facebook"),v=e("#ai1ec-share-twitter"),m=e("#ai1ec-share-google"),g=e(".ai1ec-saved-events"),y=e(".ai1ec-saved-events-exit"),b=e("#ai1ec-share-events-title"),w=e(".ai1ec-saved-events-title"),E=e(".ai1ec-share-multiple"),S=e("#ai1ec-share-open"),x=function(){var e=t().length;!e||w.length?i.addClass("ai1ec-hidden"):(i.removeClass("ai1ec-hidden"),r.text("("+e+")")),i.find("a").attr("href",_(!0))},T=function(){e(this).addClass("ai1ec-active").find("i.ai1ec-fa-star-o").removeClass("ai1ec-fa-star-o").addClass("ai1ec-fa-star"),y.addClass("ai1ec-hidden"),w.remove()},N=function(){var t=e(".ai1ec-views-dropdown .ai1ec-active a"),n=t.attr("href").replace(/(\/|\|)post_ids~((\d+)(,?))+/g,"").replace(/(\/|\|)time_limit~1/,"");return t.attr("href",n).trigger("click"),i.removeClass("ai1ec-active").find("a").blur().find("i.ai1ec-fa-star").removeClass("ai1ec-fa-star").addClass("ai1ec-fa-star-o"),!1},C,k=function(){C=e(".ai1ec-views-dropdown .ai1ec-active").attr("data-action")},L=function(){e(".ai1ec-calendar-view-container").trigger("initialize_view.ai1ec",!0)},A=function(){var n=e(this),r=n.closest(".ai1ec-event"),s=r.length?r.attr("class").match(/ai1ec-event-id-(\d+)/)[1]:n.data("post_id"),o=t();return I(n),n.data("post_id")&&I(e(".ai1ec-action-star").not(n)),n.hasClass("ai1ec-selected")?-1===e.inArray(s,o)&&o.push(s):o.splice(o.indexOf(s),1),localStorage.setItem("ai1ec_saved_events",o.join(",")),x(),!n.hasClass("ai1ec-selected")&&i.hasClass("ai1ec-active")&&i.find("a").trigger("click"),!1},O=function(){return encodeURIComponent(b.val()||"Custom Calendar").replace(/\'/g,"%27").replace(/\-/g,"%2D").replace(/\_/g,"%5F").replace(/\./g,"%2E").replace(/\!/g,"%21").replace(/\~/g,"%7E").replace(/\*/g,"%2A").replace(/\#/g,"%23").replace(/\(/g,"%28").replace(/\)/g,"%29")},M=function(){var t=e(".ai1ec-views-dropdown .ai1ec-active a").attr("href");return undefined===t?!1:-1===e(".ai1ec-views-dropdown .ai1ec-active a").attr("href").indexOf("ai1ec=")},_=function(e){var r;return w.length&&b.val(w.find("h1").text()),M()?r=n.calendar_url+"action~"+C+(e?"/my_saved_events~1":"/saved_events~"+O())+"/exact_date~1"+"/post_ids~":r=n.calendar_url+(-1===n.calendar_url.indexOf("?")?"?":"&")+"ai1ec=action~"+C+(e?"|my_saved_events~1":"|saved_events~"+O())+"|exact_date~1"+"|post_ids~",r+=t().join(),r},D=_(),P=function(){m.attr("href",m.data("url")+encodeURIComponent(D)),v.attr("href",v.data("url")+encodeURIComponent(D)+"&text="+encodeURIComponent(v.data("text"))),d.attr("href",d.data("url")+"&p[url]="+encodeURIComponent(D)),f.data("url",D),o.val(D),S.attr("href",D)},H=function(){D=e(".ai1ec-views-dropdown .ai1ec-active a").attr("href")+"saved_events~"+O(),D=D.replace(/action~(\w+)/,"").replace(/\/\//g,"/").replace(/:\//g,"://"),P(),a.removeAttr("checked")},B=function(){if(!a.is(":checked")){E.is(":visible")?H():(D=o.data("original-url"),P());return}o.data("original-url",D),e.ajax({url:"https://www.googleapis.com/urlshortener/v1/url?shortUrl=http://goo.gl/fbsS",type:"POST",contentType:"application/json; charset=utf-8",data:'{longUrl: "'+D+'"}',dataType:"json",success:function(e){D=e.id},complete:function(){P()}})},j=function(){var t=400,n=500;return window.open(e(this).attr("href"),"Sharing Events","width="+n+",height="+t+",toolbar=0,status=0,left="+(screen.width/2-n/2)+",top="+(screen.height/2-t/2)),l.addClass("ai1ec-hidden"),!1},F=function(){if(w.length){var t=w.find("h1").text();t.length>12&&(t=e.trim(t.substring(0,12))+"&hellip;"),y.removeClass("ai1ec-hidden").find("a").attr("href",n.calendar_url).end().find("span > i").html(t),i.addClass("ai1ec-hidden")}else i.removeClass("ai1ec-hidden")},I=function(e){e.toggleClass("ai1ec-selected").find("i.ai1ec-fa").toggleClass("ai1ec-fa-star ai1ec-fa-star-o")},q=function(){return localStorage.removeItem("ai1ec_saved_events"),N(),!1},R=function(){var n=(new Date).getTime(),r=t(),i=r.length;return e(".ai1ec-event:visible").each(function(){var t=e(this),i=t.attr("class").match(/ai1ec-event-id-(\d+)/)[1];(new Date(t.data("end"))).getTime()<n&&(r.splice(r.indexOf(i),1),t.remove())}),i!==r.length?(localStorage.setItem("ai1ec_saved_events",r.join(",")),x(),r.length?L():N()):e(this).fadeOut(),!1},U=function(){k();var n=t(),r=e("#timely-save-button .ai1ec-action-star"),s=e(".ai1ec-clear-saved-buttons");e(".ai1ec-action-star").removeClass("ai1ec-selected");for(var o=0;o<n.length;o++)I(e(".ai1ec-event-id-"+n[o]).find(".ai1ec-action-star"));r.length&&-1<e.inArray(r.data("post_id").toString(),n)&&I(r),x();for(var o=0;o<2;o++)g.animate({opacity:.5},200).animate({opacity:1},300);i.hasClass("ai1ec-active")&&s.clone(!0).insertAfter(e("#ai1ec-calendar-view > div, #ai1ec-calendar-view > table").filter(function(){return this.className.match(/ai1ec-(\w+)-view/)}).first()).removeClass("ai1ec-hidden")};e(document).on("click",".ai1ec-close-saved-events",N),e(document).on("click",".ai1ec-action-star",A),e(document).on("click",".ai1ec-saved-events",function(){E.show(),H()}),e(document).on("initialize_view.ai1ec",".ai1ec-calendar-view-container",U),e(document).on("click",".ai1ec-action-share",function(){return a.removeAttr("checked"),D=e(this).attr("data-url")||location.href,P(),E.hide(),!1}),e(document).on("click",".ai1ec-clear-saved",q),e(document).on("click",".ai1ec-clear-expired",R),b.on("keyup change",H),a.on("click",B),d.on("click",j),m.on("click",j),v.on("click",j),f.on("click",function(){return l.removeClass("ai1ec-hidden"),!1}),h.on("keyup change",function(){c.attr("action","mailto:"+e(this).val()),p.val(p.data("body")+" "+f.data("url"))}),i.on("click",T),F(),k(),x()};t(r)}),timely.define("scripts/save_and_share",function(){});