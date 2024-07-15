function toggleRoute(routeId) {
    var routes = document.querySelectorAll('.route-details');
    routes.forEach(function(route) {
        route.classList.remove('active');
    });

    var selectedRoute = document.getElementById(routeId);
    if (selectedRoute) {
        selectedRoute.classList.add('active');
    }

    var routeHeaders = document.querySelectorAll('.route');
    routeHeaders.forEach(function(header) {
        header.classList.remove('active');
    });

    var selectedRouteHeader = document.querySelector("[onclick='toggleRoute(\"" + routeId + "\")']");
    if (selectedRouteHeader) {
        selectedRouteHeader.classList.add('active');
    }
}


//Footer JS

document.getElementById("emailForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    var email = document.getElementById("emailForm").elements["email"].value;
    if (!isValidEmail(email)) {
        document.getElementById("statusMessage").textContent = "Please enter a valid email address.";
        return;
    }

    // Simulate successful subscription (replace with actual backend logic)
    simulateBackendSubscription(email);
});

function isValidEmail(email) {
    // Basic email validation using a regular expression
    var regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

function simulateBackendSubscription(email) {
    // Simulate backend processing (replace with actual AJAX call)
    setTimeout(function() {
        document.getElementById("statusMessage").style.display = "block";
        document.getElementById("emailForm").reset(); // Reset form after success
    }, 1000); // Simulate 1 second delay
}