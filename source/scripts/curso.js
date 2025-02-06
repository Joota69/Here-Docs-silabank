// scripts.js
document.querySelectorAll('.node').forEach(node => {
    node.addEventListener('click', function() {
        alert('You clicked on cycle: ' + this.innerText);
        // Here you can add functionality to display details about the courses in this cycle
    });
});
