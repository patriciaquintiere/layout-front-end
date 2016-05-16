function init()
{
  // console.log('oi');
  $("#cpf").inputmask("999.999.999-99");
  $("#nasc").inputmask("99/99/9999");
  $("#ddd").inputmask("99");
  $("#tel").inputmask({mask: ['9999-9999', '99999-9999']});

  $('.form-client__button-next').attr('disabled','true');


  // $('#previous').click(function(){
  //   current_fs = $('#personal_information');
  //   next_fs = $('#account_information');
  //   next_fs.show();
  //   current_fs.hide();
  // });
  var form = $("#form");
  form.validate({
    submit: false,
    rules:
    {
      nome:{required: true},
      nasc:{required: true},
      cpf:{required: true, verificaCPF: true},
      email:{required: true, minlength: 2, email: true},
      ddd:{required: true, minlength: 2, maxlength: 2},
      tel:{required: true, minlength: 8},
      filiacao:{required: true, minlength: 2}
    }
  });

  $('#form input').focusout(function(){
    if (form.valid() == true){

      $('.form-client__button-next').removeAttr('disabled').click(function(){
        current_fs = $('.step2');
        next_fs = $('.step3');
        next_fs.addClass('selected');
        current_fs.removeClass('selected');
      });
    }
  });

}

jQuery.validator.addMethod("verificaCPF", function(value, element) {
  value = value.replace('.','');
  value = value.replace('.','');
  cpf = value.replace('-','');
  while(cpf.length < 11) cpf = "0"+ cpf;
  var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
  var a = [];
  var b = new Number;
  var c = 11;
  for (i=0; i<11; i++){
    a[i] = cpf.charAt(i);
    if (i < 9) b += (a[i] * --c);
  }
  if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
  b = 0;
  c = 11;
  for (y=0; y<10; y++) b += (a[y] * c--);
  if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }
  if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) return false;
  return true;
}, "Informe um CPF válido.");
