if(/Android/.test(navigator.appVersion)) {
	window.addEventListener("resize", function() {
		if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
			document.activeElement.scrollIntoView();
		}
	});
} 


var block = $('<div>').css({'height':'50px','width':'50px'}),
    indicator = $('<div>').css({'height':'200px'}),
    scrollbarWidth = 0;

$('body').append(block.append(indicator));
var w1 = $('div', block).innerWidth();    
block.css('overflow-y', 'scroll');
var w2 = $('div', block).innerWidth();
$(block).remove();
scrollbarWidth = (w1 - w2);


var bodyScrollOptions = {
    reserveScrollBarGap: true
};

function openModal(hrefModal) {
    
    if ($(hrefModal).length > 0){
        $(hrefModal).fadeIn(300);
    
        bodyScrollLock.clearAllBodyScrollLocks();
        bodyScrollLock.disableBodyScroll(hrefModal, bodyScrollOptions);
    }
}

function closeModals() {
	if (scrollbarWidth > 0) {
		$('.popup-block:not(:hidden)').fadeOut(200, function() {
            bodyScrollLock.clearAllBodyScrollLocks();
        });
	} else {
		$('.popup-block:not(:hidden)').fadeOut(200);
		
		bodyScrollLock.clearAllBodyScrollLocks();
	}
}


$(document.body).on('click','[data-toggle="modal"]',function(e) {
	e.preventDefault();
	
	var hrefModal = $(this).attr('data-target');
	
	openModal(hrefModal);
});

$(document.body).on('click','.popup-block__overlay',function(e) {
	var closeButton = $(this).children('[data-toggle="dismiss"]');
	
	if (e.target != this) {
//		return false;
	} else {
		closeModals();
	}
});


$(document.body).on('click','[data-toggle="dismiss"]',function(e) {
	e.preventDefault();
	
	closeModals();
});

// Disable copy or paste possibility
$(document).off('cut copy paste', '.no-paste').on('cut copy paste', '.no-paste', function(e) {
	e.preventDefault();
});

// Adding not-empty class if the input/textarea has value
$('input, textarea').each(function(e) {
	if ($(this).val() != '') {
		$(this).addClass('not-empty').parent().addClass('not-empty');
	} else {
		$(this).removeClass('not-empty').parent().removeClass('not-empty');
	}
});


$(document).off('change focusout keydown keypress input', 'input, textarea').on('change focusout keydown keypress input', 'input, textarea', function(e) {
	if ($(this).val() != '') {
		$(this).addClass('not-empty').parent().addClass('not-empty');
	} else {
		$(this).removeClass('not-empty').parent().removeClass('not-empty');
	}
});

$(document).off('focusin', 'input, textarea').on('focusin', 'input, textarea', function(e) {
	$(this).parent().addClass('focused');
});

$(document).off('focusout', 'input, textarea').on('focusout', 'input, textarea', function(e) {
	$(this).parent().removeClass('focused');
});

$(document).off('keypress keyup blur', '.only-digits').on('keypress keyup blur', '.only-digits', function(event) {
	$(this).val($(this).val().replace(/[^0-9]/g, ''));

	if ((event.which < 48 || event.which > 57)) {
		event.preventDefault();
	}
});

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 43 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

$(document).off('keypress keyup blur', 'input[type="tel"]').on('keypress keyup blur', 'input[type="tel"]', function(event) {
	$(this).val($(this).val().replace(/[^0-9\+]/g, ''));

	if (!isNumberKey(event)) {
		event.preventDefault();
	}
});

$(document).off('keypress keyup blur', '.only-floats').on('keypress keyup blur', '.only-floats', function(event) {
	$(this).val($(this).val().replace(/[^0-9\,.]/g, ''));

	if ((($(this).val().indexOf('.') != -1 || $(this).val().indexOf(',') != -1)) && (event.which < 48 || event.which > 57)) {
		event.preventDefault();
	}
});

$(document).off('click', '[data-toggle="clear-input"]').on('click', '[data-toggle="clear-input"]', function(e) {
	e.preventDefault();

	$(this).parent().find('input').val('').trigger('change');
});

$('[data-toggle="scroll-to-top"]').click(function(e) {
	e.preventDefault();

	$('html,body').animate({
		scrollTop: 0
	}, 600);
});

$('[data-toggle="anchor"]').click(function(e) {
	e.preventDefault();

	var dataTarget = $(this).attr('data-target'),
		targetPos = $(dataTarget).offset().top - 150;

	$('html,body').animate({
		scrollTop: targetPos
	}, 400);
});

$('[data-toggle="tab"]').click(function(e) {
	e.preventDefault();

	var dataTarget = $(this).attr('data-target');

	if ($(this).parent().is('li')) {
		$(this).addClass('active').parent().addClass('active').siblings().removeClass('active').children().removeClass('active');
	} else {
		$(this).addClass('active').siblings().removeClass('active');
	}

	$(dataTarget).addClass('active').siblings().removeClass('active');
});

$('input[type="number"]').on('keydown', function(e){
	-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||(/65|67|86|88/.test(e.keyCode)&&(e.ctrlKey===true||e.metaKey===true))&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault();
});

// Form Validation
$.extend($.validator.messages, {
    required: "Поле не заполнено!",
    email: '',
    url: "Введите правильный формат URL",
    date: "Введите правильный формат даты",
    number: "Введите цифры",
    digits: "Введите цифры",
    creditcard: "Введите правильную кредитную карточку",
    equalTo: "Поля должны соответствовать",
    maxlength: jQuery.validator.format("Максимальная длина - {0} знаков"),
    minlength: jQuery.validator.format("Минимальная длина - {0} знаков"),
    rangelength: jQuery.validator.format("Длина должна быть между {0} и {1} знаками"),
    range: jQuery.validator.format("Введите цифру между {0} и {1}"),
    max: jQuery.validator.format("Максимальное допустимое значение - {0}."),
    min: jQuery.validator.format("Минимально допустимое значение - {0}.")
});

$.validator.methods.email = function(value, element) {
	return this.optional( element ) || /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test( value );
}

$.validator.addMethod('lettersonly', function(value, element) {
 return this.optional(element) || /^[a-zа-яё\-\s]+$/iu.test(value);
}, 'Вводить можно только буквы');

$.validator.methods.number = function (value, element) {
	return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:[\s\.,]\d{3})+)(?:[\.,]\d+)?$/.test(value);
};

$.validator.methods.range = function (value, element, param) {
    var globalizedValue = value.replace(",", ".");
    return this.optional(element) || (globalizedValue >= param[0] && globalizedValue <= param[1]);
};

$.validator.methods.min = function(value, element, param) {
    value = value.replace(",", ".");
    return this.optional(element) || value >= param;
};

$.validator.methods.max = function(value, element, param) {
    value = value.replace(",", ".");
    return this.optional(element) || value <= param;
};

$(document).ready(function() {
	
    $(".form-validate").each(function() {
        $(this).validate({
			validateDelegate: function() { },
            onsubmit: true,
			errorElement: "div",
			errorPlacement: function (error, element) {
				error.addClass('invalid-feedback');

				var elementType = element.prop('type');
				
				switch(elementType) {
					case 'select-one':
						error.appendTo(element.parent());
						break;
						
					case 'checkbox':
						error.insertAfter(element.parent());
						break;
						
					case 'radio':
						error.insertAfter(element.parent());
						
						break;
						
					default:
						error.insertAfter(element);
						
						break;
					
				}

			},
			messages: {
				email: {
					required: 'Поле почты не заполнено!',
				},
			},
			highlight: function (element, errorClass, validClass ) {
				$(element).addClass("is-invalid").parent().addClass("is-invalid");
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass("is-invalid").parent().removeClass("is-invalid");
			},
			focusInvalid: false,
			invalidHandler: function(form, validator) {

				if (!validator.numberOfInvalids())
					return;

				var scrollToElement = $(validator.errorList[0].element);

				if ($(scrollToElement).prop('type') === 'select-one' || $(scrollToElement).prop('type') === 'radio' || $(scrollToElement).prop('type') === 'checkbox') {
					scrollToElement = $(scrollToElement).parent();
				}

				if ($(scrollToElement).parents('.popup-block').length > 0) {
					var thisModal = $(this).parents('.popup-block');
					
					var scrollTopValue = $(thisModal).scrollTop() + $(scrollToElement).offset().top - 120;

					$(thisModal).animate({
						scrollTop: scrollTopValue
					}, 400);
					
				} else {
					var scrollTopValue = $(scrollToElement).offset().top - 120;
					
					$('html, body').animate({
						scrollTop: scrollTopValue
					}, 400);
				}
				
			},
			ignore: '.tab-pane:hidden *, :disabled, .no-validate'
		});
		
		setTimeout(function() {
		   $(this).find('.num-input').each(function() {
				$(this).rules('add', {
					required: true,
					number: true
				});
			});
			
			$(this).find('[type="email"]').each(function() {
				$(this).rules('add', {
					required: true,
					email: true
				});
			});
		}, 0);
	});
	
});

$(window).on('scroll load orientationchange', function() {
	var scrolledHeight = 100;

	if ($(this).scrollTop() > scrolledHeight && !($('body').hasClass("scrolled")) ) {
		$('body').addClass("scrolled");
	} else if($(this).scrollTop() <= scrolledHeight && $('body').hasClass("scrolled")) {
		$('body').removeClass("scrolled");
	}
});

$('[type="tel"]').inputmask({
  mask: "+7 999 999 99 99",
  clearIncomplete: true,
  autoUnmask: false,
  removeMaskOnSubmit: false,
  showMaskOnHover: false
}),

$('select').niceSelect();

$(document).ready(function () {
	if( $(".swiper-container").length ) {
    var mainSwiper = new Swiper ('#main_slider', {
      slidesPerView: 1,
      speed: 600,
      navigation: {
        nextEl: '.main-button-next',
        prevEl: '.main-button-prev',
      },
      on: {
        slideNextTransitionStart: function () {
          $('.main-button-prev').addClass('active');
        },
        reachEnd: function () {
          $('.main-button-next').removeClass('active');
        },
        reachBeginning: function () {
          $('.main-button-next').addClass('active');
          $('.main-button-prev').removeClass('active');
        },
      },
    });
    $(window).resize(function() {
        mainSwiper.update(true),
        console.log("mainSwiper update")
    })
 	}
});

$('.main-block__form-input').hover(function() {
	$('.main-block__form').toggleClass('active');
});

$('.main-block__form-input').focus(function() {
	$('.main-block__form').removeClass('active');
	$('.main-block__form').addClass('disabled');
});

$('.btn--send').on('click', function() {
	$('.main-block__input-wrapper').addClass('delete puff-out-hor');
	$('.main-block__input-wrapper.hidden').addClass('active scale-in-center');
});

$.fn.oldtoggle = function() {
	var b = arguments;
	return this.each(function (i, el) {
		var a = function () {
			var c = 0;
			return function () {
				b[c++ % b.length].apply(el, arguments);
			}
		}();
		$(el).click(a);
	});
};

$('.main-block__recommended-option').click(function() {
	$(this).addClass('active');
});

$('.main-block__list-option').click(function() {
	$(this).addClass('active');
});


$('.main-block__speciality-checkbox').click(function() {
	$('.main-block__others-wrapper').addClass('active');
	$('.main-block__others-counter').html('(' + $('.main-block__checkbox-wrapper input:checkbox:checked').length + ')');
	$(this).parent().parent().parent().parent().find('.main-block__list-block').addClass('active');
});

$('.main-block__others-close').on('click', function() {
	$('.main-block__others-wrapper').removeClass('active');
	$('.main-block__speciality-block')[0].reset();
	$('.main-block__others-counter').html('(' + $('.main-block__checkbox-wrapper input:checkbox:checked').length + ')');
	$('.main-block__list-block').removeClass('active');
	$('.main-block__list-control').removeClass('visable');
	$('.tab-pane').removeClass('active');
});

$('#speciality_checkbox_1').oldtoggle(function() {
	$('#list_control_1').addClass('visible');
}, function() {
	$('#list_control_1').removeClass('visible');
	$('#tags-tab-1').removeClass('active');
});

$('#speciality_checkbox_2').oldtoggle(function() {
	$('#list_control_2').addClass('visible');
}, function() {
	$('#list_control_2').removeClass('visible');
	$('#tags-tab-2').removeClass('active');
});

$('#speciality_checkbox_3').oldtoggle(function() {
	$('#list_control_3').addClass('visible');
}, function() {
	$('#list_control_3').removeClass('visible');
	$('#tags-tab-3').removeClass('active');
});

$('#speciality_checkbox_4').oldtoggle(function() {
	$('#list_control_4').addClass('visible');
}, function() {
	$('#list_control_4').removeClass('visible');
	$('#tags-tab-4').removeClass('active');
});

$('#speciality_checkbox_5').oldtoggle(function() {
	$('#list_control_5').addClass('visible');
}, function() {
	$('#list_control_5').removeClass('visible');
	$('#tags-tab-5').removeClass('active');
});

$('#speciality_checkbox_6').oldtoggle(function() {
	$('#list_control_6').addClass('visible');
}, function() {
	$('#list_control_6').removeClass('visible');
	$('#tags-tab-6').removeClass('active');
});

$('#speciality_checkbox_7').oldtoggle(function() {
	$('#list_control_7').addClass('visible');
}, function() {
	$('#list_control_7').removeClass('visible');
	$('#tags-tab-7').removeClass('active');
});

$('#speciality_checkbox_8').oldtoggle(function() {
	$('#list_control_8').addClass('visible');
}, function() {
	$('#list_control_8').removeClass('visible');
	$('#tags-tab-8').removeClass('active');
});

$('#speciality_checkbox_9').oldtoggle(function() {
	$('#list_control_9').addClass('visible');
}, function() {
	$('#list_control_9').removeClass('visible');
	$('#tags-tab-9').removeClass('active');
});

$('#speciality_checkbox_10').oldtoggle(function() {
	$('#list_control_10').addClass('visible');
}, function() {
	$('#list_control_10').removeClass('visible');
	$('#tags-tab-10').removeClass('active');
});

$('#speciality_checkbox_11').oldtoggle(function() {
	$('#list_control_11').addClass('visible');
}, function() {
	$('#list_control_11').removeClass('visible');
	$('#tags-tab-11').removeClass('active');
});

$('#speciality_checkbox_12').oldtoggle(function() {
	$('#list_control_12').addClass('visible');
}, function() {
	$('#list_control_12').removeClass('visible');
	$('#tags-tab-12').addClass('active');
});

$('#speciality_checkbox_13').oldtoggle(function() {
	$('#list_control_13').addClass('visible');
}, function() {
	$('#list_control_13').removeClass('visible');
	$('#tags-tab-13').addClass('active');
});

$('#speciality_checkbox_14').oldtoggle(function() {
	$('#list_control_14').addClass('visible');
}, function() {
	$('#list_control_14').removeClass('visible');
	$('#tags-tab-14').addClass('active');
});

$('#speciality_checkbox_15').oldtoggle(function() {
	$('#list_control_15').addClass('visible');
}, function() {
	$('#list_control_15').removeClass('visible');
	$('#tags-tab-15').addClass('active');
});

$('#speciality_checkbox_16').oldtoggle(function() {
	$('#list_control_16').addClass('visible');
}, function() {
	$('#list_control_16').removeClass('visible');
	$('#tags-tab-16').addClass('active');
});

$('#speciality_checkbox_17').oldtoggle(function() {
	$('#list_control_17').addClass('visible');
}, function() {
	$('#list_control_17').removeClass('visible');
	$('#tags-tab-17').addClass('active');
});

$('#speciality_checkbox_18').oldtoggle(function() {
	$('#list_control_18').addClass('visible');
}, function() {
	$('#list_control_18').removeClass('visible');
	$('#tags-tab-18').addClass('active');
});

$('#speciality_checkbox_19').oldtoggle(function() {
	$('#list_control_19').addClass('visible');
}, function() {
	$('#list_control_19').removeClass('visible');
	$('#tags-tab-19').addClass('active');
});

$('#speciality_checkbox_20').oldtoggle(function() {
	$('#list_control_20').addClass('visible');
}, function() {
	$('#list_control_20').removeClass('visible');
	$('#tags-tab-20').addClass('active');
});

$('#speciality_checkbox_21').oldtoggle(function() {
	$('#list_control_21').addClass('visible');
}, function() {
	$('#list_control_21').removeClass('visible');
	$('#tags-tab-21').addClass('active');
});

$('#speciality_checkbox_22').oldtoggle(function() {
	$('#list_control_22').addClass('visible');
}, function() {
	$('#list_control_22').removeClass('visible');
	$('#tags-tab-22').addClass('active');
});

$('#speciality_checkbox_23').oldtoggle(function() {
	$('#list_control_23').addClass('visible');
}, function() {
	$('#list_control_23').removeClass('visible');
	$('#tags-tab-23').addClass('active');
});

$('#speciality_checkbox_24').oldtoggle(function() {
	$('#list_control_24').addClass('visible');
}, function() {
	$('#list_control_24').removeClass('visible');
	$('#tags-tab-24').addClass('active');
});

$('#speciality_checkbox_25').oldtoggle(function() {
	$('#list_control_25').addClass('visible');
}, function() {
	$('#list_control_25').removeClass('visible');
	$('#tags-tab-25').addClass('active');
});

$('#speciality_checkbox_26').oldtoggle(function() {
	$('#list_control_26').addClass('visible');
}, function() {
	$('#list_control_26').removeClass('visible');
	$('#tags-tab-26').addClass('active');
});

$('.nice-select').each(function() {
	if ($(this).hasClass('disabled')) {
		$(this).parent().parent().find('.main-block__steps-label').addClass('disabled');
	};
});

$('.nice-select').on('click', function() {
	$('.list').toggleClass('scale-up-ver-top');
});

$('#steps_first').change(function() {
	$('.main-block__steps-wrapper').removeClass('first disabled');
});

$('#steps_second').change(function() {
	$('.main-block__others-block').addClass('active');
	$('.main-block__speciality-block').removeClass('disabled');
	$('.main-block__waiting-block').addClass('disabled');
	$('.main-block__steps-inner').addClass('active');
	$('.main-block__recommended-block').addClass('active');
});

$('#steps_third').change(function() {
	$(this).parent().parent().find('.btn--step').removeClass('disabled');
});

$('#toggle_1').on('click', function() {
	$('#control_1').removeClass('active');
	$('#control_2').addClass('active');
});

$('#toggle_2').on('click', function() {
	$('#control_1').addClass('active');
	$('#control_2').removeClass('active');
});

$('#toggle_3').on('click', function() {
	$('#control_2').removeClass('active');
	$('#control_3').addClass('active');
	$('.main-block__control').removeClass('disabled');
});

$('#steps_fourth').change(function() {
	$('.main-block__others-block').addClass('active');
	$(this).parent().parent().parent().find('.btn--step').addClass('active');
	$(this).parent().parent().parent().find('.btn--step').removeClass('disabled');
	$(this).parent().parent().parent().find('.btn--step span').addClass('delete');
	$(this).parent().parent().parent().find('.btn--step b').addClass('active');
	$(this).parent().parent().parent().find('.main-block__speciality-block').removeClass('disabled');
	$(this).parent().parent().parent().find('.main-block__steps-button-wrapper').addClass('fixed');

	$(window).on('scroll load', function() {
	  var ScrollTopFixedHeight = 0;
	  if ($(window).width() < 768) {
	    ScrollTopFixedHeight = 200;
	  }
	  if ($(this).scrollTop() > ScrollTopFixedHeight && !($('body').hasClass("scroll-top-active")) ) {
	   $('body').addClass("scroll-top-active");
	  } else if($(this).scrollTop() <= ScrollTopFixedHeight && $('body').hasClass("scroll-top-active")) {
	   $('body').removeClass("scroll-top-active");
	  }
	});
});

$('.main-block__recommended-container').on('scroll', function() {
	if ($(this).scrollLeft() > 50) {
		$(this).parent().find('#pagination_1').removeClass('active');
		$(this).parent().find('#pagination_2').addClass('active');
	} else {
		$(this).parent().find('#pagination_1').addClass('active');
		$(this).parent().find('#pagination_2').removeClass('active');
	}
	if ($(this).scrollLeft() > 100) {
		$(this).parent().find('#pagination_2').removeClass('active');
		$(this).parent().find('#pagination_3').addClass('active');
	} else {
		$(this).parent().find('#pagination_3').removeClass('active');
	}
	if ($(this).scrollLeft() > 150) {
		$(this).parent().find('#pagination_3').removeClass('active');
		$(this).parent().find('#pagination_4').addClass('active');
	} else {
		$(this).parent().find('#pagination_4').removeClass('active');
	}
});

$('.main-block__list-container').on('scroll', function() {
	if ($(this).scrollLeft() > 50) {
		$(this).parent().find('.main-block__pagination-option--first').removeClass('active');
		$(this).parent().find('.main-block__pagination-option--second').addClass('active');
	} else {
		$(this).parent().find('.main-block__pagination-option--first').addClass('active');
		$(this).parent().find('.main-block__pagination-option--second').removeClass('active');
	}	
	if ($(this).scrollLeft() > 100) {
		$(this).parent().find('.main-block__pagination-option--second').removeClass('active');
		$(this).parent().find('.main-block__pagination-option--third').addClass('active');
	} else {
		$(this).parent().find('.main-block__pagination-option--third').removeClass('active');
	}
	if ($(this).scrollLeft() > 150) {
		$(this).parent().find('.main-block__pagination-option--third').removeClass('active');
		$(this).parent().find('.main-block__pagination-option--fourth').addClass('active');
	} else {
		$(this).parent().find('.main-block__pagination-option--fourth').removeClass('active');
	}
});

$('.tooltip').tooltipster({
  animation: 'fade',
  delay: 200,
  theme: 'tooltipster-shadow',
  trigger: 'hover'
});