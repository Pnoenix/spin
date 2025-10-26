const container = document.getElementById('container');

// Add input event listener to container (event delegation)
container.addEventListener('input', function(e) {
    if (e.target.tagName !== 'INPUT') {
        return;
    }

    const allInputs = container.querySelectorAll('input');
    let emptyInputCount = 0;
    let emptyInputs = [];

    for (input of allInputs) {
        if (input.value.trim().length === 0) {
            emptyInputCount += 1;
            emptyInputs.push(input);
        }
    }

    console.log(emptyInputCount);
    
    if (emptyInputCount === 0) {
        const wrapper = document.createElement('div');
        wrapper.className = 'field-wrapper';
        
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.placeholder = 'Type something...';
        
        wrapper.appendChild(newInput);
        container.appendChild(wrapper);
    }

    if (emptyInputCount === 2) {
        for (input of emptyInputs) {
            if (input !== document.activeElement) {
                const wrapper = input.parentElement;

                wrapper.classList.add('slideOut');
                setTimeout(() => {
                    wrapper.remove();
                }, 200);
            }
        }
    }
});


container.addEventListener('keydown', function(e) {
    if (e.target.tagName !== 'INPUT') {
        return;
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        
        const allInputs = Array.from(container.querySelectorAll('input'));
        const currentIndex = allInputs.indexOf(e.target);
        
        let targetInput;
        
        if (e.key === 'ArrowUp' && currentIndex > 0) {
            targetInput = allInputs[currentIndex - 1];
        } else if (e.key === 'ArrowDown' && currentIndex < allInputs.length - 1) {
            targetInput = allInputs[currentIndex + 1];
        }
        
        if (targetInput) {
            targetInput.focus();
        }
    }
});