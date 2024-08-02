
function customer_xmlDecode(p_string, p_stripNewline)
{
  p_string = p_string.replace(/&gt;/g, ">");
  p_string = p_string.replace(/&lt;/g, "<");
  p_string = p_string.replace(/&quot;/g, "\"");
  p_string = p_string.replace(/&apos;/g, "\'");
  if (p_stripNewline)
  {
    p_string = p_string.replace(/&#x0d;/g, "");
    p_string = p_string.replace(/&#x0a;/g, "");
  }
  else
  {
    p_string = p_string.replace(/&#x0d;/g, "\r");
    p_string = p_string.replace(/&#x0a;/g, "\n");
  }
  p_string = p_string.replace(/&amp;/g, "&");
  return p_string;
}

function customer_encodeAndStripNewlines(p_string)
{
  p_string = p_string.replace(/&#x0d;/g, " ");
  p_string = p_string.replace(/&#x0a;/g, " ");
  p_string = p_string.replace(/\r?\n|\r/g, " ");
  return $("<div/>").text(p_string).html();
}

function customer_encodeHTML(text) {
  text = text.replace(/\&/g, "&amp;");
  text = text.replace(/\"/g, "&quot;");
  text = text.replace(/\'/g, "&#39;");
  text = text.replace(/\</g, "&lt;");
  text = text.replace(/\>/g, "&gt;");
  return text;
}

function doYellowFade(p_element, p_time)
{
  p_element.data({ 'originalColor': p_element.css('backgroundColor') });
  var startColor = 155;
  
  p_element.css({'backgroundColor':'rgb(243,243,' + startColor + ')'});


  var intervalId = setInterval(function()
  {
    p_element.css({ 'backgroundColor': 'rgb(243,243,' + startColor + ')' });
    startColor += 4;
    if (startColor >= 250)
    {
      clearInterval(intervalId);
      intervalId = -1;
      p_element.css({ 'backgroundColor': p_element.data('originalColor') });
    }
  }
  , p_time);

}

function kbEntriesSearchCallback(p_data)
{
  
  var ulElement = $('#faqSearchResultList');
  ulElement.empty();

  $('#faqTopList').addClass('hidden');
  
  if (p_data && p_data.length > 0)
  {  
    for (var i=0;i<p_data.length; i++)
    {
      ulElement.append($('<li><a href=\"' + p_data[i].link + '\">' + customer_encodeAndStripNewlines(p_data[i].description) + '</a></li>'));
    }
  }
  
  ulElement.prev('h3').html("").removeClass('hidden');
  ulElement.removeClass('hidden');
  
  doYellowFade(ulElement.closest('.box'), 100);
  $('#faqLoadingImg').addClass('hidden'); 
  
}

function customer_ajax(p_url, p_callbackFunction)
{

  $.ajax({ async: true, cache: false, dataType: 'json', data: '{}', type: 'post', url: p_url,
    success: p_callbackFunction,
    error: function (e, s) { /*alert("Error parsing json: " + s);*/ }
  });
}

var faqElement;
var timeoutId = 0;
var oldText = "";
var url = "";


function customer_faqTimeout()
{
  var text = faqElement.val();
  var postUrl = url;
  if (text.length > 2 && oldText != text)
  {   
    customer_ajax(postUrl + "&searchString=" + encodeURI(text), kbEntriesSearchCallback);
  }

  oldText = text;
  timeoutId = 0;
}

function customer_doFAQSearch(p_element, p_url)
{
  
  if (timeoutId > 0)
  {
    timeoutId = clearTimeout(timeoutId);
  }
  if (p_element.val().length > 2)
  {

    if (!$('#faqSearchResultList').hasClass('hidden'))
    {
      $('#faqSearchResultList').empty();
    }
    
    $('#faqLoadingImg').removeClass('hidden');
    $('#faqTopList').addClass('hidden');
    $('#faqTopList').prev('h3').html("");
  }  

  if(p_element.val().length == 0)
  {
    /*$('#faqSearchResultList').prev('h3').html(lang_bestMatches);    */
    $('#faqLoadingImg').addClass('hidden');
    $('#faqSearchResultList').addClass('hidden');
    $('#faqTopList').removeClass('hidden');
    var headerElement = $('#faqTopList').prev('h3');

    headerElement.html(headerElement.data('text'));
  }
  else
  { 
    url = p_url;
    faqElement = p_element;
    timeoutId = setTimeout(customer_faqTimeout,  1000);
  }
  return true;
}

function dateToISO(d) {
  if (!d) return "";

  return d.getFullYear() + '-' +
    ('0' + (d.getMonth() + 1)).slice(-2) + '-' +
    ('0' + d.getDate()).slice(-2);
}

function dateTimeToISO(d) {
  if (!d) return "";

  var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
  var localISOTime = (new Date(d - tzoffset)).toISOString().slice(0, -1);

  return localISOTime;
}

function timeToISO(d) {
  var tmp = dateTimeToISO(d);
  if (tmp.length >= 19) // YYYY-MM-DDTHH:MI:SS.MSS
      tmp = tmp.substr(11, 8);
  return tmp;
}


var currentAttId = 0;
/*
 * Due to the event propagation we need to rebind our event handlers after every change in our filelist structure
*/
function customer_rebindAttachmentEvents()
{
  $('#fileUpload input[name^=attachment]').unbind('change').change(function()
  {
    if ($(this).val() != "")
    {
      if ($(this).next('a.remove').hasClass('hidden'))
      {
        var delImage = (typeof wwwRoot === 'undefined' ? '/' : wwwRoot) + 'graphics/SevenCustomer/del.png';
        $('#fileList').append($('<li style=\"margin-top: 14px\" ><input type=\"file\" name=\"attachment_\" /><a class=\"remove hidden\"><img src="' + delImage + '" /></a></li>\n'));
        currentAttId++;
        $(this).next('a.remove').removeClass('hidden');
        $(this).parent().css({ 'marginTop': 0 }).prepend($('<span>' + customer_encodeHTML($(this).val().replace(/.*\\/, '')) + '</span>'));
        $(this).css({ 'display': 'none' });
        customer_rebindAttachmentEvents();
      }
    }
  });

  $('#fileList a.remove').unbind('click').click(function()
  {
    if ($('#fileList').children().length > 1)
    {
      var attachmentsElement = $('input[name=attachments]');
      if (attachmentsElement.length > 0)
      {
        var el = attachmentsElement.val().split(',');
        var newVal = '';
        var attVal = $(this).siblings('input[name=attId]').val();
        if (attVal > 0)
        {
          for (var i = 0; i < el.length; i++)
          {
            if (attVal == el[i])
              continue;
            newVal += el[i] + ",";
          }
          attachmentsElement.val(newVal);
        }
      }

      $(this).parent().remove();
      customer_rebindAttachmentEvents();
    }
  });

}

$(document).ready(function()
{

  /* Initialize our smartFields */
  $('input[type=text].smartField').each(function()
  {
    if ($(this).val() == '' || $(this).val() == $(this).attr('alt'))
    {
      $(this).val($(this).attr('alt'));
      $(this).addClass('obliq');
    }
  });

  /* Register event handlers for search functionality  - for framework*/
  $('input.smartField').focus(function()
  {
    if ($(this).attr('alt') == $(this).val())
    {
      $(this).removeClass('obliq');
      $(this).val('');
      $(this).next('img').addClass('hidden');
    }
  });

  $('input[type=text].smartField').blur(function()
  {
    if ($(this).attr('alt') == $(this).val() || $(this).val() == '')
    {
      $(this).addClass('obliq');
      $(this).val($(this).attr('alt'));
      $(this).next('img').removeClass('hidden');
    }
  });



  $('input.faqSearcherGlobal').keyup(function(ev)
  {
    if (ev.keyCode == 13)
      return false;

    customer_doFAQSearch($(this), customerUrl + "&action=listKbEntriesJson");
  });
  var headerFAQElement = $('#faqTopList').prev('h3');
  headerFAQElement.data('text', headerFAQElement.html());

  /* Script for listTicket */
  var messageDivs = $('div.ticketMessage');
  if (messageDivs.length > 0)
  {
    // Show the first and the last - realign the toolbar
    messageDivs.eq(0).show().after($('#showAllMessages'));
    messageDivs.eq(Math.max(0, messageDivs.length - 1)).show();
  }

  // Show all messages when pressed
  $('#showAllMessages').click(function() { $('div.ticketMessage').show(); $(this).hide(); });


  $('.addMessage').click(function(e)
  {
    $('#addMessageContainer').show();
    $(this).hide();
    $('#message').focus();
    e.preventDefault();
  });

  /* 
  Attachment handling in listTicket and addMessage. 
  We need to do rebinding everytime we add another file input element.
  */
  customer_rebindAttachmentEvents();


  $('#fileUploadButton').click(function()
  {
    $('#fileUpload').show();
    $(this).hide();
  });


  $('#ticketLessDetails').click(function()
  {
    $('#listTicket .info').hide();
    $('#ticketMoreDetails').show();
    $(this).hide();
  });

  $('#ticketMoreDetails').click(function()
  {
    $('#listTicket .info').show();
    $('#ticketLessDetails').show();
    $(this).hide();
  });

  if ($('#listTicket .info').is(':visible'))
  {
    $('#ticketLessDetails').show();
  }
  else
  {
    $('#ticketMoreDetails').show();
  }

  /* Form validation on listTicket */
  $('#listTicket #mainForm').submit(function()
  {
    var msg = $('#message').val().replace(/^\s*|\s*$/,"");
    if (msg == '')
    {
      $('#message').css({ border: '1px solid red' });
      $('#messageEmpty').show();
      return false;
    }

    /* Update our indexes on file inputs */
    var idx = 0;
    $('#fileList input[type=file]').each(function()
    {
      $(this).attr('name', $(this).attr('name') + idx);
      idx++;
    });

    return true;
  });


  $('#ticketForm form').submit(function()
  {
    /* Enter JavaScript validation code for newTicket */
    var isOk = true;

    var idx = 0;
    $('#fileList input[type=file]').each(function()
    {
      $(this).attr('name', $(this).attr('name') + idx);
      idx++;
    });

    return isOk;
  });

  /* Create 'stylish' FAQ paths */
  $('.faqPaths table').each(function()
  {
    var parentElement = $(this).parent();
    var parentWidth = parentElement.width();
    var ourWidth = $(this).width();
    if (ourWidth > parentWidth)
    {
      $(this).css({ 'marginLeft': -(ourWidth - parentWidth) + 'px' });
    }

    $(this).find('tr td a.path').eq(-1).css({ 'color': '#000' });

  });

  /* Functions for FAQ ratings */
  $('#rater').click(function()
  {
    var pos = $(this).position();
    
    var fader = $('<div id="fader">&nbsp;</div>');
    $('#faqEntry').append(fader);
    
   
    
    fader.css({ 'position': 'absolute', 'background': 'white', top: '0', bottom: '0', left: '0', right: '0', 'z-index': '1' });
    fader.click(function(e)
    {
      $(this).unbind('click');
      $(this).remove(); $('#raterPopup').hide();
    }
    );


    fader.show();

    var raterPopup = $('#raterPopup');
    raterPopup.css({ top: pos.top - raterPopup.outerHeight() + 'px', left: pos.left + 'px' }).show();
  });

  $('#raterPopup .close').click(function()
  {
    $('#raterPopup').hide();
    $('#fader').remove();
  });

  $('#raterPopup img').click(function()
  {
    $(this).prevAll().addBack().attr('src', $(this).attr('src').replace('_grey', ''));
    $(this).nextAll().attr('src', $(this).attr('src').replace('star.png', 'star_grey.png'));
    $('#score').val(($(this).prevAll().length) * 20);
  });

  $('#raterPopup a.vote').click(function(e)
  {
    e.preventDefault();
    var formElement = $(this).closest('form');
    formElement.submit();
    return true;
  });

  $('#listTickets .ticket').click(function(e)
  {
    // Simulate click on the main anchor
    document.location = $(this).find('tr.details td.first a').attr('href');
  });

  /* Code for showing comments of FAQ's */
  $('#showComment').click(function()
  {
    $(this).addClass('hidden');
    $('#hideComment').removeClass('hidden');
    $('.faqComment').removeClass('hidden');
  });

  $('#hideComment').click(function()
  {
    $(this).addClass('hidden');
    $('#showComment').removeClass('hidden');
    $('.faqComment').addClass('hidden');
  });

  /* Adjust the sizes of details and head sections of the listTickets table */
  var tdIdx = 0;
  $('#listTickets .listTicketsTable tr.head th').each(function()
  {
    tdIdx++; /* nth-child is 1-indexed */
    $('#listTickets .listTicketsTable tr.details td:nth-child(' + tdIdx + ')').width($(this).width());
  });
});


