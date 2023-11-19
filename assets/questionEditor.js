var aeInlineTab = '0',
  browseMode = 'class',
  algorithmEditor = null,
  cssEditor = null;
function append(a) {
  var b = getAlgorithm();
  setAlgorithm(b + a + '\n');
}
function getRandomNumber() {
  var a, b, c, d, e;
  if (null != (a = getVarName($("[name\x3d'a1']")[0]))) {
    var f = $("[name\x3d'a2']")[0].options[$("[name\x3d'a2']")[0].selectedIndex].value;
    null != (b = getExpression($("[name\x3d'a3']")[0])) &&
      null != (c = getExpression($("[name\x3d'a4']")[0])) &&
      ((d = $("[name\x3d'a5']")[0].value),
      (e = !(null == d || d.match(/^\s*$/))),
      'number' == f
        ? e
          ? append(a + '\x3drange(' + b + ',' + c + ',' + d + ');')
          : append(a + '\x3drand(' + b + ',' + c + ');')
        : 'integer' == f
          ? ((b = Math.round(b)),
            (c = Math.round(c)),
            (d = Math.round(d)),
            e ? append(a + '\x3drange(' + b + ',' + c + ',' + d + ');') : append(a + '\x3drange(' + b + ',' + c + ');'))
          : e
            ? append(a + '\x3d' + f + 'range(' + b + ',' + c + ',' + d + '));')
            : append(a + '\x3d' + f + 'rand(' + b + ',' + c + '));'));
  }
}
function getIfThenElse() {
  var a, b, c, d, e;
  if (
    null != (a = getVarName($("[name\x3d'b1']")[0])) &&
    null != (b = getExpression($("[name\x3d'b2']")[0])) &&
    null != (c = getExpression($("[name\x3d'b6']")[0])) &&
    null != (d = getExpression($("[name\x3d'b3']")[0]))
  ) {
    var f = $("[name\x3d'b4']")[0].options[$("[name\x3d'b4']")[0].selectedIndex].value,
      g = 'not(eq(' == f ? '))' : ')';
    null != (e = getExpression($("[name\x3d'b5']")[0])) &&
      append(a + '\x3dif(' + f + d + ',' + e + g + ',' + b + ',' + c + ');');
  }
}
function getCondition() {
  var a, b, c;
  null != (a = getExpression($("[name\x3d'c1']")[0])) &&
    null != (b = getExpression($("[name\x3d'c3']")[0])) &&
    ((c = $("[name\x3d'b4']")[0].options[$("[name\x3d'c2']")[0].selectedIndex].value),
    append('condition:' + c + a + ',' + b + ('not(eq(' == c ? '))' : ')')));
}
function getMaple() {
  var a, b;
  if (null != (a = getVarName($("[name\x3d'm1']")[0]))) {
    b = $("[name\x3d'm2']")[0].value;
    var c =
      0 < $("[name\x3d'algoLibname']")[0].value.length ? ', libname\x3d' + $("[name\x3d'algoLibname']")[0].value : '';
    'maple' == $("[name\x3d'mapleMode']")[0][$("[name\x3d'mapleMode']")[0].selectedIndex].value
      ? append(a + '\x3dmaple("' + b + c + '");')
      : (0 < c.length && (c = ", libname\x3d'" + $("[name\x3d'algoLibname']")[0].value + "'"),
        append(a + '\x3dplotmaple("' + b + c + '");'));
  }
}
function getNotEmpty(a) {
  var b = a.value;
  return b.match(/^\s*$/)
    ? (alert('You must enter an expression in all the fields.'), (a.value = '####'), a.select(), null)
    : b;
}
function getVarName(a) {
  var b = getNotEmpty(a);
  if (null != b) {
    if (b.match(/^\s*\$?([a-zA-Z][a-zA-Z0-9]*)\s*$/)) b = RegExp.$1;
    else if (b.match(/^\s*\$\{([a-zA-Z][\sa-zA-Z0-9]*)\}\s*$/)) b = RegExp.$1;
    else if (b.match(/^\s*([a-zA-Z][\sa-zA-Z0-9]*)\s*$/)) b = RegExp.$1;
    else return alert('The variable name "' + b + '" is not in acceptable form.\n\n' + VAR_NAMES), a.select(), null;
    return b.match(/ /) ? '${' + b + '}' : '$' + b;
  }
}
function getExpression(a) {
  a = getNotEmpty(a);
  if (null != a) {
    if (a.match(/^\s*\$?([a-zA-Z][a-zA-Z0-9]*)\s*$/)) a = RegExp.$1;
    else if (a.match(/^\s*\$\{([a-zA-Z][\sa-zA-Z0-9]*)\}\s*$/)) a = RegExp.$1;
    else if (a.match(/^\s*([a-zA-Z][\sa-zA-Z0-9]*)\s*$/)) a = RegExp.$1;
    else return a;
    return a.match(/ /) ? '${' + a + '}' : '$' + a;
  }
}
function setAlgorithm(a) {
  if (null != algorithmEditor) return algorithmEditor.setValue(a);
  console.error('algorithmEditor is not initialized');
}
function getAlgorithm() {
  return null != algorithmEditor ? algorithmEditor.getValue() : '';
}
function getCustomCss() {
  return null != cssEditor ? cssEditor.getValue() : '';
}
function refreshAlgorithm(a, b) {
  if ($('#algorithmEditor').length) {
    hideAlgorithmError();
    var c = getAlgorithm(),
      d = getBaseURL() + 'rest/algorithms';
    $.ajax({ type: 'POST', url: d, data: c, contentType: 'application/json', dataType: 'json' })
      .done(function (b) {
        var c = $('#algorithmPreview');
        $.isEmptyObject(b)
          ? $(c).hide()
          : ($('tr:not(.heading)', c).remove(),
            _.each(b, function (a, b) {
              var d = '\x3ctr\x3e\x3ctd\x3e' + b + '\x3c/td\x3e\x3ctd\x3e' + a.value + '\x3c/td\x3e\x3ctd\x3e';
              '' != a.rangeStart && (d += a.rangeStart + ' - ' + a.rangeEnd);
              d += '\x3c/td\x3e\x3c/tr\x3e';
              $(c).append(d);
            }),
            $(c).show(),
            'undefined' != typeof MathJax && MathJax.Hub.Queue(['Typeset', MathJax.Hub, c[0]]));
        'function' == typeof a && a();
      })
      .fail(function (a) {
        algorithmicError(a.responseText);
        'function' == typeof b && b(a.responseText);
      });
  }
  return !1;
}
function hideAlgorithmError() {
  $('.errorMsg', '#algorithmError').html('');
  $('#algorithmError').hide();
}
function algorithmicError(a) {
  $('.errorMsg', '#algorithmError').html(a);
  $('#algorithmError').show();
  $('#algorithmPreview').hide();
  $('.aeInlineToolbar').length
    ? (saveInlineTab(aeInlineTab), doSelectInlineTab('2'))
    : ($('#algorithm').removeClass('collapsed'),
      $('html, body').animate({ scrollTop: $('#algorithm').offset().top - 25 }, 500));
}
function buildThemeArray(a) {
  return _.reject(a.split('@@@@@')[0].split(','), function (a) {
    return '' === a.trim();
  });
}
function addThemesFromTemplate(a) {
  'string' === typeof a.appliedThemes && (a.appliedThemes = [a.appliedThemes]);
  _.each(a.appliedThemes, function (a) {
    var c = buildThemeArray($('#appliedThemes').val());
    a = buildThemeArray(a);
    _.each(a, function (a) {
      if ('' != a) {
        for (var b = !1, f = 0; f < c.length; f++)
          if (c[f] == a) {
            b = !0;
            break;
          }
        b || c.push(a);
      }
    });
    $('#appliedThemes').val(c.join(','));
  });
}
function getPreviewBaseUrl() {
  var a = getBaseURL(),
    a = a.substring(0, a.length - 1),
    b = a.lastIndexOf('/');
  return 8 < b ? a.substring(0, b) : a;
}
function saveQuestion() {
  refreshAlgorithm(verifyAndSaveQuestion);
  return !1;
}
function verifyAndSaveQuestion() {
  removeUnsavedListener();
  var a = $('.editQuestionForm');
  $('[name\x3d"actionId"]', a).val('save');
  return finish();
}
function saveDraftQuestion(a) {
  refreshAlgorithm(function () {
    verifyAndSaveDraftQuestion(a);
  });
  return !1;
}
function verifyAndSaveDraftQuestion(a) {
  var b = $('.editQuestionForm'),
    c = $('[name\x3d"actionId"]', b).val();
  $('[name\x3d"actionId"]', b).val('savedraft');
  if ('AddMathAppForm' == b.attr('name') && !validateDimensions()) return !1;
  prepareToSubmit();
console.log($(b));
  // $.ajax({ async: !1, method: 'POST', url: $(b).prop('action'), data: $(b).serialize(), dataType: 'text' })
  //   .done(function (d) {
  //     $('.errorStyle1').remove();
  //     $('[name\x3d"actionId"]', b).val(c);
  //     d &&
  //       ($("input[name\x3d'uid']", b).val(d),
  //       $(a.target).on('shown.bs.tooltip', function (b) {
  //         $(a.target).data('timer') && clearTimeout($(a.target).data('timer'));
  //         $(a.target).data(
  //           'timer',
  //           setTimeout(function () {
  //             $(b.target).tooltip('hide');
  //             $(b.target).removeData('timer');
  //           }, 2e3),
  //         );
  //       }),
  //       $(a.target).tooltip('show'));
  //   })
  //   .fail(function (a) {
  //     $('.errorStyle1').remove();
  //     $('[name\x3d"actionId"]', b).val(c);
  //     a = $('\x3cp class\x3d"errorStyle1"\x3e' + a.responseText + '\x3c/p\x3e');
  //     $($('.editorArea')[0]).before(a);
  //   })
  //   .always(function () {
  //     null !== d && d.remove();
  //     null !== e && e.remove();
  //   });
  return !1;
}
function previewQuestion(a) {
  this.previewWindow = openWindow(
    'about:blank',
    'previewWindow',
    'resizable\x3dyes,scrollbars\x3dyes,toolbar\x3dno,width\x3d960,height\x3d800',
  );
  var b = $('#previewForm');
  $('#error', b).val(!1);
  $('#errorMsg', b).val('');
  refreshAlgorithm(
    function () {
      verifyAndPreviewQuestion(a);
    },
    function (a) {
      var b = $('#previewForm');
      $('#error', b).val(!0);
      $('#errorMsg', b).val(a);
      $(b).trigger('submit');
    },
  );
  return !1;
}
function verifyAndPreviewQuestion(a) {
  var b = $('.editQuestionForm');
  $('[name\x3d"actionId"]', b).val('preview');
  prepareToSubmit();
  $.ajax({ method: 'POST', url: $(b).prop('action'), data: $(b).serialize(), dataType: 'text' })
    .done(function (b) {
      var d = JSON.parse(b);
      b = $('#previewForm');
      $('#questionDefinition', b).val(d.questionDefinition);
      $('#version', b).val(d.version);
      $('#baseUrl', b).val(getPreviewBaseUrl());
      d = 0 < getAlgorithm().length;
      $('#algorithmic').val(d);
      $(b).trigger('submit');
      'function' == typeof a && a();
    })
    .fail(function () {
      $('[name\x3d"actionId"]', b).val('save');
      prepareToSubmit();
      $(b).trigger('submit');
      'function' == typeof a && a();
    });
  return !1;
}
function importThemes() {
  $('#applyThemesModal')
    .off('shown.bs.modal')
    .on('shown.bs.modal', function () {
      var a = this;
      $('li[id^\x3d"row_"]', this).remove();
      $.ajax({
        method: 'GET',
        dataType: 'json',
        url: getBaseURL() + 'rest/themes?page\x3d0\x26pageSize\x3d0\x26sortBy\x3dname\x26order\x3dasc',
      }).done(function (b) {
        for (var c = 0; c < b.length; c++) {
          var d;
          d = $('#optionsContainer #rowTemplate', a).clone(!0);
          $(d).attr('id', 'row_' + c);
          $(d).removeClass('hidden');
          $(d).addClass('themes');
          $(d).attr('themeuid', b[c].uid);
          $('span', d).html(b[c].name);
          $('#optionsContainer', a).append(d);
          $(d).draggable({ cursor: 'move', revert: 'invalid' });
        }
        b = $('input[id\x3d"appliedThemes"]').val().split('@@@@@')[0].split(',');
        for (c = 0; c < b.length; c++)
          '' != b[c] &&
            $("li[themeuid\x3d'" + b[c] + "']", a)
              .detach()
              .css({ top: 0, left: 0 })
              .appendTo($('#chosenContainer'));
        $('#optionsContainer').css(
          'height',
          Math.max(
            $('#optionsContainer').css('height').replace('px', ''),
            $('#chosenContainer').css('height').replace('px', ''),
          ) + 'px',
        );
        $('#chosenContainer').css(
          'height',
          Math.max(
            $('#optionsContainer').css('height').replace('px', ''),
            $('#chosenContainer').css('height').replace('px', ''),
          ) + 'px',
        );
        $('#chosenContainer').droppable({
          accept: '.themes',
          drop: function (a, b) {
            clearInterval($(b.draggable).data('timer'));
            $(this).css('border', '');
            0 < $('.indicator', this).length
              ? $('.indicator', this).replaceWith($(b.draggable).detach().css({ top: 0, left: 0 }))
              : $(b.draggable).detach().css({ top: 0, left: 0 }).appendTo($(this));
          },
          over: function (a, b) {
            var c = this;
            $(this).css('border', '1px solid green');
            var d = setInterval(function () {
              var a = $('#chosenContainer')[0].getBoundingClientRect().top,
                d = $(b.draggable)[0].getBoundingClientRect().top - a,
                e = $('#chosenContainer').children(
                  ":not(.hidden,.indicator,[themeuid\x3d'" + $(b.draggable).attr('themeuid') + "'])",
                );
              if (0 < e.length)
                if (e[0].getBoundingClientRect().top - a >= d)
                  $('.indicator', c).remove(),
                    $(e[0]).before(
                      '\x3cli class\x3d"indicator" style\x3d"height:1px; background-color:blue"\x3e\x3c/li\x3e',
                    );
                else if (e[e.length - 1].getBoundingClientRect().top - a <= d)
                  $('.indicator', c).remove(),
                    $(e[e.length - 1]).after(
                      '\x3cli class\x3d"indicator" style\x3d"height:1px; background-color:blue"\x3e\x3c/li\x3e',
                    );
                else
                  for (var h = 0; h < e.length; h++)
                    e[h].getBoundingClientRect().top - a <= d &&
                      h + 1 < e.length &&
                      e[h + 1].getBoundingClientRect().top - a >= d &&
                      ($('.indicator', c).remove(),
                      $(e[h + 1]).before(
                        '\x3cli class\x3d"indicator" style\x3d"height:1px; background-color:blue"\x3e\x3c/li\x3e',
                      ));
            }, 250);
            $(b.draggable).data('timer', d);
          },
          out: function (a, b) {
            $(this).css('border', '');
            $('.indicator', this).remove();
            clearInterval($(b.draggable).data('timer'));
          },
        });
        $('#optionsContainer').droppable({
          accept: '.themes',
          drop: function (a, b) {
            $(this).css('border', '');
            for (
              var d = $(this).children(':not(.hidden)'), c = 0;
              c < d.length && !(0 < $('span', d[c]).html().localeCompare($('span', b.draggable).html()));
              c++
            );
            0 == c
              ? $(b.draggable).detach().css({ top: 0, left: 0 }).prependTo($(this))
              : c < d.length
                ? $(b.draggable).detach().css({ top: 0, left: 0 }).insertBefore($(d[c]))
                : $(b.draggable)
                    .detach()
                    .css({ top: 0, left: 0 })
                    .insertAfter($(d[d.length - 1]));
          },
          over: function () {
            $(this).css('border', '1px solid green');
          },
          out: function () {
            $(this).css('border', '');
          },
        });
      });
    });
  $('#applyThemesModal').modal('show');
  $('#applyThemesModal .btn-primary')
    .off('click')
    .on('click', function () {
      var a = $('#applyThemesModal'),
        b = [];
      $('#chosenContainer li:not(.indicator, .hidden)', a).each(function () {
        b.push($(this).attr('themeuid'));
      });
      $('input[id\x3d"appliedThemes"]').val(b.join(','));
      applyCustomCss([CKEDITOR.instances.editor, CKEDITOR.instances.commentEditor, CKEDITOR.instances.fbEditor]);
      $('#applyThemesModal').modal('hide');
    });
  return !1;
}
function applyCustomCss(a) {
  if ('undefined' != typeof a) {
    var b = function (a, b) {
        if (a.document) $("style[id\x3d'editorCustom']", a.document.$.head).remove(), $(a.document.$.head).append(b);
        else
          a.once('instanceready', function (a) {
            $("style[id\x3d'editorCustom']", a.editor.document.$.head).remove();
            $(a.editor.document.$.head).append(b);
          });
      },
      c = {};
    _.each(a, function (a) {
      if ('undefined' != typeof a && null != a) {
        var e = getCustomCss();
        if (0 < $('#appliedThemes').length) {
          var f = $('#appliedThemes').val().split('@@@@@')[0];
          0 < f.length
            ? 'undefined' == typeof c[f]
              ? $.ajax({ method: 'GET', dataType: 'text', url: getBaseURL() + 'themes/' + f })
                  .done(function (g) {
                    c[f] = g;
                    b(a, "\x3cstyle type\x3d'text/css' id\x3d'editorCustom'\x3e" + c[f] + e + '\x3c/style\x3e');
                  })
                  .fail(function (a) {
                    alert(a.reponseText);
                  })
              : b(a, "\x3cstyle type\x3d'text/css' id\x3d'editorCustom'\x3e" + c[f] + e + '\x3c/style\x3e')
            : b(a, "\x3cstyle type\x3d'text/css' id\x3d'editorCustom'\x3e" + e + '\x3c/style\x3e');
        } else b(a, "\x3cstyle type\x3d'text/css' id\x3d'editorCustom'\x3e" + e + '\x3c/style\x3e');
      }
    });
  }
}
var showDesigner = function (a) {
  a.preventDefault();
  $('#algorithmDesigner').slideToggle('fast', function () {
    $('#algorithmDesigner').is(':hidden')
      ? $('#showDesigner').text(showAlgoDesigner)
      : $('#showDesigner').text(hideAlgoDesigner);
  });
};
function addRowIntoSroTable(a, b, c) {
  $('#sroTable').append(
    '\x3ctr\x3e\x3ctd class\x3d"variable"\x3e' +
      a +
      '\x3c/td\x3e\x3ctd\x3e' +
      b +
      '\x3c/td\x3e\x3ctd\x3e' +
      c +
      '\x3c/td\x3e\x3c/tr\x3e',
  );
}
function updateSroTable(a) {
  for (var b = $('#sroTable'), c = b.find('td.variable'), d = '', e = 0, f = 0; f < c.length; f++) {
    var g = c[f].innerHTML,
      d = d + (g + ',');
    0 == g.indexOf('response') && ((g = g.substr(8)), isNaN(g) || (e = Math.max(e, parseInt(g))));
  }
  b.attr('data-variables', d);
  b.attr('data-maxresponsenum', e);
  a && b.closest('#sroTableDiv').removeClass('startHidden');
}
function createAceEditor(a, b, c) {
  return null != document.getElementById(a)
    ? ((b = $(b).val()),
      (a = ace.edit(a)),
      a.setTheme('ace/theme/eclipse'),
      a.getSession().setMode(c),
      a.getSession().setUseWorker(!1),
      a.session.setValue(b),
      a.setShowPrintMargin(!1),
      a)
    : null;
}
function beforeunloadHandler(a) {
  if (!(0 < $('form[name\x3d"AssignmentEditForm"]').length)) {
    var b = $('.editQuestionForm');
    if (0 != b.length) {
      var c = $('[name\x3d"actionId"]', b).val();
      $('[name\x3d"actionId"]', b).val('isunsaved');
      prepareToSubmit();
      $.ajax({ async: !1, method: 'POST', url: $(b).prop('action'), data: $(b).serialize(), dataType: 'text' })
        .done(function (d) {
          $('[name\x3d"actionId"]', b).val(c);
          if ('true' == d) return (d = $("input[name\x3d'hasUnsavedQuestion']").val()), (a.returnValue = d);
          a.preventDefault();
        })
        .fail(function () {
          $('[name\x3d"actionId"]', b).val(c);
          var d = $("input[name\x3d'hasUnsavedQuestion']").val();
          return (a.returnValue = d);
        });
    }
  }
}
function addUnsavedListener() {
  removeUnsavedListener();
  window.addEventListener('beforeunload', beforeunloadHandler);
}
function removeUnsavedListener() {
  window.removeEventListener('beforeunload', beforeunloadHandler);
}
function saveInlineTab(a) {
  switch (a) {
    case '1':
      readEditor($(CKEDITOR.instances.editor.container.$).parent());
      break;
    case '2':
      prepareAceEditorsForSubmit();
      break;
    case '3':
      readEditor($(CKEDITOR.instances.fbEditor.container.$).parent());
      break;
    case '4':
      prepareAceEditorsForSubmit(), applyCustomCss([CKEDITOR.instances.editor, CKEDITOR.instances.fbEditor]);
  }
}
function selectInlineTab(a) {
  a.preventDefault();
  a = a.target.id;
  '' != a && ((a = a.split('.')), aeInlineTab != a[1] && (saveInlineTab(aeInlineTab), doSelectInlineTab(a[1])));
}
function doSelectInlineTab(a) {
  var b = $('#editor, #alEditor, #fbEditor, #cssEditor, #hintEditor').toArray();
  0 < a &&
    a <= b.length &&
    ($(
      b.filter(function (b, d) {
        return d != a - 1;
      }),
    ).hide(),
    $(
      b.filter(function (b, d) {
        return d == a - 1;
      }),
    ).slideDown('fast'),
    $('[id^\x3daeInlineTab').removeClass('active'),
    $('#aeInlineTab\\.' + a).addClass('active'),
    (aeInlineTab = a),
    toggleIframeResizer(!0));
}
function initializeQuestionEditor() {
  $('#saveButton, #savedraftButton, #previewButton').on('click', function () {
    return !1;
  });
  0 < $('#algorithmEditor').length &&
    ($('#refreshAlgorithm').on('click', refreshAlgorithm),
    $('.close', '#algorithmError').on('click', hideAlgorithmError));
  CKEDITOR.on('instanceReady', function (a) {
    'undefined' == typeof CKEDITOR.instances.editor ||
      ('editor' != a.editor.name && 'commentEditor' != a.editor.name && 'fbEditor' != a.editor.name) ||
      (setTimeout(function () {
        applyCustomCss([a.editor]);
      }, 400),
      'function' == typeof setCKFinderParams && setCKFinderParams());
    addUnsavedListener();
    null == algorithmEditor &&
      (algorithmEditor = createAceEditor('algorithmEditor', '#algorithmHidden', 'ace/mode/mapleta'));
    if (algorithmEditor) algorithmEditor.on('change', hideAlgorithmError);
    null == cssEditor && (cssEditor = createAceEditor('customCssEditor', '#customCss', 'ace/mode/css'));
    $('#saveButton').off('click').on('click', saveQuestion);
    $('#savedraftButton').tooltip({ trigger: 'manual' });
    $('#savedraftButton').off('click').on('click', saveDraftQuestion);
    $('#previewButton').off('click').on('click', previewQuestion);
    0 < $('#applyThemesPlaceHolder').length && $('#applyThemesPlaceHolder').append($('#applyThemes'));
    $('#applyThemes').on('click', document, importThemes);
    $('#refreshCss').on('click', function () {
      applyCustomCss([CKEDITOR.instances.editor, CKEDITOR.instances.commentEditor, CKEDITOR.instances.fbEditor]);
      return !1;
    });
    0 < $('#sroTable').length && updateSroTable(!1);
    a.editor.on('mode', function (a) {
      0 != a.editor.mode.localeCompare('wysiwyg') &&
        ((a = $('.cke_contents textarea', a.editor.container.$)[0]), $(a).val(preserveJSONinAttributes($(a).val())));
    });
  });
  $('#showDesigner').on('click', function (a) {
    showDesigner(a);
  });
  0 < $('[id^\x3d"aeInlineTab"]').length &&
    ($('[id^\x3d"aeInlineTab"]')
      .off()
      .on('click', function (a) {
        selectInlineTab(a);
      }),
    doSelectInlineTab('1'));
  0 < $('#hintEditor').length && initInlineHintEditor();
  refreshAlgorithm();
}
function initInlineHintEditor() {
  setInlineHintHandlers();
  $('#hintEditorModal .btn-default').on('click', function () {
    inlineSaveHint();
  });
  $('#addHint').on('click', function (a) {
    inlineAddHint(a);
  });
  initHintSortable();
}
function setInlineHintHandlers() {
  $('.editHint')
    .off()
    .on('click', function (a) {
      inlineEditHint(a);
    });
  $('.deleteHint')
    .off()
    .on('click', function (a) {
      inlineDeleteHint(a);
    });
}
function inlineAddHint(a) {
  a.preventDefault();
  $('#orderId').val('NEW');
  $('#hintname').val('Hint');
  $('#hintpenalty').val('0.0');
  CKEDITOR.instances.hinteditor.setData('');
  $('#hintEditorModal').modal({ backdrop: !1 });
}
function inlineDeleteHint(a) {
  $(a.target).parents('tr').remove();
  adjustHintOrderIds();
}
function inlineSaveHint() {
  var a = $('#orderId').val();
  'NEW' == a &&
    $('#hintPreview').append(
      '\x3ctr class\x3d"hintRow" data-orderid\x3d"NEW"\x3e\x3ctd class\x3d"hintName"\x3e\x3c/td\x3e\x3ctd class\x3d"hintPenalty"\x3e\x3c/td\x3e\x3ctd\x3e\x3cspan class\x3d"editHint"\x3e\x3cimg class\x3d"questionLink" src\x3d"' +
        hintEditImg +
        '" title\x3d"Edit" alt\x3d"Edit"\x3e\x3c/span\x3e \x3cspan class\x3d"deleteHint"\x3e\x3cimg class\x3d"questionLink" src\x3d"' +
        hintDeleteImg +
        '" title\x3d"Delete" alt\x3d"Delete"\x3e\x3c/span\x3e\x3c/td\x3e\x3c/tr\x3e',
    );
  a = $('[data-orderid\x3d"' + a + '"]');
  a.data('name', encodeURIComponent($('#hintname').val()));
  a.attr('data-name', a.data('name'));
  a.find('.hintName').html($('#hintname').val());
  a.data('penalty', encodeURIComponent($('#hintpenalty').val()));
  a.attr('data-penalty', a.data('penalty'));
  a.find('.hintPenalty').html($('#hintpenalty').val());
  readEditor($(CKEDITOR.instances.hinteditor.container.$).parent());
  a.data('hint', encodeURIComponent($('#hintText').val()));
  a.attr('data-hint', a.data('hint'));
  adjustHintOrderIds();
  setInlineHintHandlers();
  $('#hintEditorModal').modal('hide');
}
function inlineEditHint(a) {
  a = $($(a.target).parents('tr')[0]);
  $('#orderId').val(a.data('orderid'));
  $('#hintname').val(decodeURIComponent(a.data('name')));
  $('#hintpenalty').val(decodeURIComponent(a.data('penalty')));
  CKEDITOR.instances.hinteditor.setData(decodeURIComponent(a.data('hint')));
  $('#hintEditorModal').modal({ backdrop: !1 });
}
function adjustHintOrderIds() {
  _.each($('.hintRow'), function (a, b) {
    $(a).data('orderId', b);
    $(a).attr('data-orderid', $(a).data('orderId'));
  });
}
function disableHintSortable() {
  $('#hintPreview tbody').sortable('disable');
}
function initHintSortable() {
  $('#hintPreview tbody')
    .sortable({
      itemSelector: 'tr',
      axis: 'y',
      placeholder: 'hintPlaceholder',
      helper: function (a, b) {
        var c = b.clone(),
          d = $(b.find('td')[0]).css('width'),
          e = $(b.find('td')[1]).css('width'),
          f = $(b.find('td')[2]).css('width');
        $(c.find('td')[0]).css('width', d);
        $(c.find('td')[1]).css('width', e);
        $(c.find('td')[2]).css('width', f);
        c.addClass('hintHelper');
        return c;
      },
      stop: function (a, b) {
        adjustHintOrderIds();
      },
    })
    .disableSelection();
}
