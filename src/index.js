import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './css/style.css';
import './sass/style.scss';
import './fonts/Cairo-Regular.ttf';
import '@fortawesome/fontawesome-free/js/all.js';
import $ from 'jquery';
window.jQuery = window.$ = $;

$(document).ready(function () {
    // --- منطق تفعيل الرابط النشط (Active Link) ---
    var pathname = window.location.pathname;
    
    $('.navbar-nav a.nav-link').each(function() {
        var href = $(this).attr('href');
        
        // إزالة الكلاس من الجميع أولاً لضمان عدم التكرار
        $(this).removeClass('active');
        $(this).parent().removeClass('active');

        // التحقق من التطابق: إذا كان المسار ينتهي بالرابط أو إذا كنا في الصفحة الرئيسية
        if (pathname.endsWith(href) || (pathname === '/' && href.includes('index.html'))) {
            $(this).addClass('active');
            $(this).parent().addClass('active');
        }
    });

    console.log('Pathname:', pathname);
    console.log('Webpack يعمل بنجاح ✅');

    // --- كود معرض الصور (Gallery) ---
    let current_image;
    let counter = 0;
    let modalId = $('#image-gallery');

    function updateGallery(selector) {
        let $sel = selector;
        current_image = parseInt($sel.attr('data-image-id'));

        $('#image-gallery-title').text($sel.data('title'));
        $('#image-gallery-image')
            .attr('src', $sel.data('image'))
            .removeClass('d-none');

        disableButtons(counter, current_image);
    }

    function disableButtons(counter_max, counter_current) {
        $('#show-previous-image, #show-next-image').show();
        if (counter_max === counter_current) {
            $('#show-next-image').hide();
        } else if (counter_current === 1) {
            $('#show-previous-image').hide();
        }
    }

    $('[data-image-id]').each(function () {
        counter++;
        $(this).attr('data-image-id', counter);
    });

    $('.thumbnail').on('click', function () {
        updateGallery($(this));
    });

    $('#show-next-image, #show-previous-image').click(function () {
        if ($(this).attr('id') === 'show-previous-image') {
            current_image--;
        } else {
            current_image++;
        }
        let selector = $('[data-image-id="' + current_image + '"]');
        updateGallery(selector);
    });

    $(document).keydown(function (e) {
        if (modalId.hasClass('show')) {
            switch (e.which) {
                case 37: 
                    if ($('#show-previous-image').is(":visible")) $('#show-previous-image').click();
                    break;
                case 39: 
                    if ($('#show-next-image').is(":visible")) $('#show-next-image').click();
                    break;
                default: return;
            }
            e.preventDefault();
        }
    });
});

// منطق رفع الصور
document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("imageInput");
  const fileNameInput = document.getElementById("fileName");

  if (!fileInput || !fileNameInput) return;

  fileInput.addEventListener("change", () => {
    fileNameInput.value = fileInput.files.length
      ? fileInput.files[0].name
      : "لم يتم اختيار صورة";
  });
});