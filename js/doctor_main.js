// MODAL
var showBtn1 = document.getElementById('scheduleOpen')
const modal1 = document.querySelector('.schedule')
const modalClose = document.querySelector('.js-modal-close')
const modal1Container = document.querySelector('.js-modal-container')
// Hiện modal
function showSchedule() {
    modal1.classList.add('open')
}
// Ẩn modal
function closeSchedule() {
    modal1.classList.remove('open')
}
showBtn1.addEventListener('click', showSchedule)

modalClose.addEventListener('click', closeSchedule)

// click bên ngoài thì đóng
modal1.addEventListener('click', closeSchedule)
modal1Container.addEventListener('click', function (event) {
    event.stopPropagation()
})


// DAYS
document.addEventListener('DOMContentLoaded', function () {
    var dayCheckboxes = document.querySelectorAll('.day input[type="checkbox"]');
    var shiftRadio = document.querySelectorAll('.shift input[type="radio"]');
    var dayUncheckButton = document.getElementById('day-uncheck');
    var confirmButton = document.getElementById('day-confirm');
    var changeButton = document.getElementById('day-change');


    // Function to hide all shift checkboxes
    function hideAllShiftRadio() {
        shiftRadio.forEach(function (radio) {
            radio.checked = false;
            radio.parentElement.style.display = 'none';
        });
    }

    // Event listener for day checkboxes
    dayCheckboxes.forEach(function (dayCheckbox) {
        dayCheckbox.addEventListener('change', function () {
            var shiftLabels = this.parentElement.parentElement.querySelectorAll('.shift');
            shiftLabels.forEach(function (label) {
                label.style.display = this.checked ? 'inline-block' : 'none';
            }, this);
            if (!this.checked) {
                // Check if there are other checked day checkboxes
                var otherCheckedDays = document.querySelectorAll('.day input[type="checkbox"]:checked');
                if (otherCheckedDays.length > 0) {
                    return; // Do not hide shift checkboxes if other days are still checked
                }
                hideAllShiftRadio();
            }
        });
    });

    function uncheckAllShifts(day) {
        var ShiftRadios = document.querySelectorAll('.' + day + ' .shift input[type="radio"]');
        ShiftRadios.forEach(function (radio) {
            radio.checked = false;
            radio.parentElement.style.display = 'none';
        });
    }

    function hideUnselected() {
        dayCheckboxes.forEach(function (checkbox) {
            var shiftName = checkbox.getAttribute('name') + '_shift';
            var shiftRadios = document.querySelectorAll('input[name="' + shiftName + '"]');
            var dayDiv = checkbox.closest('.day');

            if (!checkbox.checked) {
                // Nếu checkbox ngày không được chọn, ẩn ngày và các shift của ngày đó
                dayDiv.style.display = 'none';
                shiftRadios.forEach(function (radio) {
                    radio.parentElement.style.display = 'none';
                });
            } else {
                // Nếu checkbox ngày được chọn, hiển thị ngày và các shift của ngày đó
                dayDiv.style.display = 'block';
                shiftRadios.forEach(function (radio) {
                    if (!radio.checked) {
                        radio.parentElement.style.display = 'none';
                    }
                });
            }
        });
    }

    function showAllDays() {
        dayCheckboxes.forEach(function (checkbox) {
            var dayDiv = checkbox.closest('.day');
            dayDiv.style.display = 'block'; // Hiển thị ngày 
            if (checkbox.checked) {
                // Nếu ngày đã được chọn, hiển thị tất cả các shift của ngày đó
                var shiftName = checkbox.getAttribute('name') + '_shift';
                var shiftRadios = document.querySelectorAll('input[name="' + shiftName + '"]');
                shiftRadios.forEach(function (radio) {
                    radio.parentElement.style.display = 'inline-block'; // Hiển thị shift
                });
            }
        });
    }



    // Event listener for day checkboxes
    dayCheckboxes.forEach(function (dayCheckbox) {
        dayCheckbox.addEventListener('change', function () {
            var dayDiv = this.closest('.day'); // Tìm div cha chứa checkbox ngày
            var dayClass = dayDiv.classList[0]; // Lấy tên lớp của div ngày
            var shiftLabels = dayDiv.querySelectorAll('.shift'); // Lấy tất cả các shift của ngày

            shiftLabels.forEach(function (label) {
                label.style.display = this.checked ? 'inline-block' : 'none';
            }, this);

            if (!this.checked) {
                uncheckAllShifts(dayClass); // Uncheck tất cả các shift của ngày nếu checkbox bị unchecked
            }
        });
    });

    dayUncheckButton.addEventListener('click', function () {
        dayCheckboxes.forEach(function (checkbox) {
            checkbox.checked = false; // Uncheck each day checkbox
        });
        // Hide all shift radios
        hideAllShiftRadio();
        showAllDays();
    });


    // Event listener for the confirm button
    confirmButton.addEventListener('click', function () {
        // Check if at least one day checkbox is checked
        var atLeastOneDayChecked = false;
        var atLeastOneShiftChecked = true; // Flag to check if at least one shift is checked for each checked day

        dayCheckboxes.forEach(function (dayCheckbox) {
            if (dayCheckbox.checked) {
                atLeastOneDayChecked = true;

                // Check if at least one shift is checked for the current day
                var shiftChecked = false;
                var shiftRadios = document.querySelectorAll('input[name="' + dayCheckbox.name + '_shift"]');
                shiftRadios.forEach(function (shiftRadio) {
                    if (shiftRadio.checked) {
                        shiftChecked = true;
                    }
                });

                // If no shift is checked for the current day, set the flag to false
                if (!shiftChecked) {
                    atLeastOneShiftChecked = false;
                }
            }
        });

        // Show custom alert if necessary
        if (!atLeastOneDayChecked) {
            showAlert('Please select at least one day.');
        } else if (!atLeastOneShiftChecked) {
            showAlert('Please select a shift for each selected day.');
        } else {
            hideUnselected();
            // Show success message
            showAlert('Selection confirmed successfully!');
        }
    });



    // Event listener for the change button
    changeButton.addEventListener('click', function () {
        showAllDays();
        // Show message
        showAlert('Selection is now enabled. You can change the selection.');

    });


    // Function to show custom alert
    function showAlert(message, duration) {
        var customAlert = document.getElementById('custom-alert');
        var customAlertMessage = document.getElementById('custom-alert-message');
        customAlertMessage.textContent = message;
        customAlert.style.display = 'block';

        // Tự động ẩn alert sau khoảng thời gian duration (miligiây)
        setTimeout(function () {
            customAlert.style.display = 'none';
        }, 2500);
    }

});









