let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");

menuicn.addEventListener("click", () => {
	nav.classList.toggle("navclose");
})

function toggleReport(type) {
    var hostelReport = document.querySelector('.report-container-hostel');
    var departmentReport = document.querySelector('.report-container-department');

    if (type === 'hostel') {
        hostelReport.classList.remove('removeDisplay');
        departmentReport.classList.add('removeDisplay');
    } else if (type === 'department') {
        hostelReport.classList.add('removeDisplay');
        departmentReport.classList.remove('removeDisplay');
    }
}