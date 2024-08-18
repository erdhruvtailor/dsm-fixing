document.getElementById('height').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

document.getElementById('weight').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

document.getElementById('contactNumber').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

document.getElementById('fatherContactNumber').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});
