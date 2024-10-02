// Add this at the beginning to grab the restart button
const restartButton = document.getElementById('restart-button');

// Function to reset the game
function resetGame() {
    // Reset the correct count
    correctCount = 0;
    message.textContent = "";
    timerDisplay.textContent = "0"; // Reset the timer display
    elapsedTime = 0; // Reset elapsed time
    clearInterval(timerId); // Clear the timer
    timerId = null; // Reset timerId
    foodItems.forEach(item => {
        item.remove(); // Remove all food items from bins
        document.querySelector('.food-items').appendChild(item); // Re-add them to the original container
    });
    restartButton.style.display = "none"; // Hide the restart button
}





// Select all draggable food items and bins 
const foodItems = document.querySelectorAll('.food');
const healthyBin = document.getElementById('healthy-bin');
const junkBin = document.getElementById('junk-bin');
const message = document.getElementById('message');
const timerDisplay = document.getElementById('time'); // Ensure this element exists in your HTML
let timerId;
let startTime;
let elapsedTime = 0;

// Counter for correctly sorted items
let correctCount = 0;

// Function to start the timer
function startTimer() {
    startTime = Date.now();
    timerId = setInterval(() => {
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timerDisplay.textContent = elapsedTime;
    }, 1000);
}

// Add event listeners to food items for both mouse and touch events
foodItems.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('touchstart', dragStart);
});

// Allow bins to receive dragged items
healthyBin.addEventListener('dragover', dragOver);
junkBin.addEventListener('dragover', dragOver);
healthyBin.addEventListener('drop', drop);
junkBin.addEventListener('drop', drop);

// Function to handle dragging start
function dragStart(e) {
    const foodElement = e.target;

    // Start the timer when the first item is dragged
    if (!timerId) {
        startTimer(); 
    }

    // For mouse events
    if (e.type === 'dragstart') {
        e.dataTransfer.setData('text', foodElement.id);
    }

    // For touch events
    if (e.type === 'touchstart') {
        e.preventDefault();
        foodElement.style.position = 'absolute';
        foodElement.style.zIndex = 1000; 
        moveAt(e.touches[0].pageX, e.touches[0].pageY, foodElement);

        const moveListener = (event) => {
            moveAt(event.touches[0].pageX, event.touches[0].pageY, foodElement);
        };

        const endListener = (event) => {
            drop(event);
            foodElement.removeEventListener('touchmove', moveListener);
            foodElement.removeEventListener('touchend', endListener);
        };

        foodElement.addEventListener('touchmove', moveListener);
        foodElement.addEventListener('touchend', endListener);
    }
}

// Move the food element based on touch or mouse coordinates
function moveAt(pageX, pageY, foodElement) {
    foodElement.style.left = `${pageX - foodElement.offsetWidth / 2}px`;
    foodElement.style.top = `${pageY - foodElement.offsetHeight / 2}px`;
}

// Allow dropping items
function dragOver(e) {
    e.preventDefault();
}

// Function to handle dropping the item
function drop(e) {
    e.preventDefault();
    const foodId = e.dataTransfer.getData('text') || e.target.id; // Handle touch drop
    const foodElement = document.getElementById(foodId);

    if (e.target.id === 'healthy-bin' && ['apple', 'carrot', 'kale', 'egg', 'celery', 'cheese'].includes(foodId)) {
        e.target.appendChild(foodElement);
        correctCount++;
        message.textContent = "Great! That food is healthy for your teeth!";
        message.style.color = "#2ecc71"; // Green for correct
    } else if (e.target.id === 'junk-bin' && ['candy', 'chips', 'donut', 'muffin', 'cake', 'popcorn', 'pizza', 'soda'].includes(foodId)) {
        e.target.appendChild(foodElement);
        correctCount++;
        message.textContent = "Correct! That food is bad for your teeth!";
        message.style.color = "#e74c3c"; // Red for correct
    } else {
        message.textContent = "Oops! Try again!";
        message.style.color = "#e74c3c"; // Red for incorrect
    }

    // Check if all food items have been sorted correctly
    if (correctCount === foodItems.length) {
        displayCongratulations();
    }
}





// Select sound elements
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');
const finishSound = document.getElementById('finish-sound');

// Function to handle dropping the item
function drop(e) {
    e.preventDefault();
    const foodId = e.dataTransfer.getData('text') || e.target.id; // Handle touch drop
    const foodElement = document.getElementById(foodId);

    if (e.target.id === 'healthy-bin' && ['apple', 'carrot', 'kale', 'egg', 'celery', 'cheese'].includes(foodId)) {
        e.target.appendChild(foodElement);
        correctCount++;
        message.textContent = "Great! That food is healthy for your teeth!";
        message.style.color = "#2ecc71"; // Green for correct
        
        // Play correct sound
        correctSound.currentTime = 0; // Reset sound to play from start
        correctSound.play();
    } else if (e.target.id === 'junk-bin' && ['candy', 'chips', 'donut', 'muffin', 'cake', 'popcorn','soda', 'pizza'].includes(foodId)) {
        e.target.appendChild(foodElement);
        correctCount++;
        message.textContent = "Correct! That food is bad for your teeth!";
        message.style.color = "#e74c3c"; // Red for correct
        
        // Play correct sound
        correctSound.currentTime = 0; // Reset sound to play from start
        correctSound.play();
    } else {
        message.textContent = "Oops! Try again!";
        message.style.color = "#e74c3c"; // Red for incorrect
        
        // Play incorrect sound
        incorrectSound.currentTime = 0; // Reset sound to play from start
        incorrectSound.play();
    }

    // Check if all food items have been sorted correctly
    if (correctCount === foodItems.length) {
        displayCongratulations();
    }
}

// Function to display congratulatory message
function displayCongratulations() {
    message.textContent = "🎉 Congratulations! You've sorted all the foods correctly! 🎉";
    message.style.color = "#3498db"; // Blue for the final message
    clearInterval(timerId); // Stop the timer
    timerId = null; // Reset timerId

    // Play finish sound
    finishSound.currentTime = 0; // Reset sound to play from start
    finishSound.play();
    
    // Trigger confetti
    triggerConfetti();

    // Show the restart button
    restartButton.style.display = "block";
}



// Add an event listener to the restart button
restartButton.addEventListener('click', resetGame);

    

// Function to trigger confetti (placeholder for your confetti code)
function triggerConfetti() {
    // Example confetti implementation, replace with your own logic if needed
    var duration = 5 * 1000; // 5 seconds
    var end = Date.now() + duration;
    var colors = ['#bb0000', '#ffffff', '#00bb00', '#0000bb', '#ffff00'];

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0 },
            colors: colors,
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0 },
            colors: colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}
